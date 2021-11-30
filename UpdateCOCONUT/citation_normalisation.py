import sys
import os
import re
from typing import List, Tuple, Dict
import requests
from json.decoder import JSONDecodeError
from eutils._internal.exceptions import EutilsNCBIError
from metapub import PubMedFetcher
from metapub.exceptions import MetaPubError
from scholarly import scholarly
from scholarly._navigator import MaxTriesExceededException
from crossref.restful import Works
import reference_parser as rp


def DOI_validity_check(article_dict: Dict, DOI: str) -> bool:
	'''This function takes a DOI string and a a dictionary. It checks if the key "doi" of the 
	dictionary has a value that is not None and that it and the given DOI are the same.'''
	if 'doi' in article_dict.keys():
		if article_dict['doi'] == DOI:
			return True


def normalize_scholarly_dict(article_dict: Dict) -> Dict:
	'''This function takes a dictionary as returned by scholarly (output['bib']) and returns
	the same dictionary with adapted keys so that they fit the metapub output'''
	# Per tuple, a key that matches the first element is replaced with the second element
	old_new_key_tuples = [('author', 'authors'), ('pub_year', 'year')]
	for key_tuple in old_new_key_tuples:
		if key_tuple[0] in article_dict.keys():
			article_dict[key_tuple[1]] = article_dict.pop(key_tuple[0])
	# Normalize author list
	article_dict['authors'] = get_normalized_author_list(article_dict['authors'], 'scholarly')
	return article_dict


def scholarly_request(search_string: str) -> Dict:
	'''This function takes a search keyword string and request information about the corresponding article
	via scholarly'''
	# Get all available information
	search_query = scholarly.search_pubs(search_string)
	article_info = next(search_query)
	scholarly.fill(article_info)
	article_dict = article_info['bib']
	article_dict = normalize_scholarly_dict(article_dict)
	article_dict = add_retrieval_information(article_dict, 'Scholarly', 'unstructured_ID', search_string)
	return article_dict


def contains_minimal_information(article_dict) -> bool:
	# Right now, this is only called when a request is done using Scholarly.
	# For COCONUT citation normalisation, this function is useless and has not been used.
	'''This function takes a dictionary, checks if a minimum of information is included
	Necessary keys: "title", "authors", "year", "pages"
	Additionally one of the following keys: ("journal", "book_title")
	It checks if the corresponding values exist and returns a bool that indicates 
	the result.'''
	# TODO: Define minimal standard what information needs to be in there
	if not article_dict:
		return
	necessary_keys = ['title', 'authors', 'year']
	#one_of_key_tuples = [('journal', 'book_title')]
	one_of_key_tuples = []
	# Check that all necessary keys exist and have a value
	for key in necessary_keys:
		if key not in article_dict.keys():
			break
		elif not article_dict[key]:
			break
	# Check that one key from each one_of_key_tuple exists and has a value
	else:
		for key_tuple in one_of_key_tuples:
			key_1, key_2 = key_tuple
			if key_1 not in article_dict.keys():
				if key_2 not in article_dict.keys():
					break
				elif not article_dict[key_2]:
					break
			elif not article_dict[key_1]:
				break
		else:
			# If no "break" has been executed until here, the article_dict is complete
			return True



def crossrefAPI_query(keyword: str) -> Dict:
	'''This function takes a keyword str and sends an according GET request to the CrossRef API.
	A normalized version of the first (most 'relevant') result is returned.'''
	article_dict = False
	works = Works()
	# If there is a timeout, try again (5 times)
	for _ in range(5):
		try:
			result = works.query(keyword).sort("relevance")
			for entry in result:
				# Take first result
				article_dict = entry
				break
		except:
			pass
	else:
		return
	if article_dict:
		#article_dict = normalize_crossref_dict(article_dict)
		#if contains_minimal_information(article_dict):
		article_dict = add_retrieval_information(article_dict, 'Crossref', 'unstructured_ID', keyword)
		return article_dict


def crossrefAPI_improved_query(parsed_ref_dict: Dict) -> Dict:
	'''
	This function takes a parsed reference dict as returned by the parsers from reference_parser.
	It uses the information given in the dict to create a cleaned up string for a  Crossref keyword 
	query and goes through the first 200 entries to check if the returned result overlaps with the 
	parsed information and returns the result.
	'''
	article_dict = False
	works = Works()
	for _ in range(5):
		try:
			# Create clean query string
			# If everything is given
			if 'volume' not in parsed_ref_dict.keys():
				return None
			if 'authors' in parsed_ref_dict.keys():
				if 'issue' in parsed_ref_dict.keys():
					formatted_bib_str = '{}, {}, {}, ({}), ({}), {}'.format(parsed_ref_dict['authors'],
																		parsed_ref_dict['journal'],
																		parsed_ref_dict['volume'],
																		parsed_ref_dict['issue'],
																		parsed_ref_dict['year'],
																		parsed_ref_dict['pages'])
				# Everything but the issue is given
				else:
					formatted_bib_str = '{}, {}, {}, ({}), {}'.format(parsed_ref_dict['authors'],
																		parsed_ref_dict['journal'],
																		parsed_ref_dict['volume'],
																		parsed_ref_dict['year'],
																		parsed_ref_dict['pages'])
			# Everything but author given
			elif 'issue' in parsed_ref_dict.keys():
				formatted_bib_str = '{}, {}, ({}), ({}), {}'.format(parsed_ref_dict['journal'],
																	parsed_ref_dict['volume'],
																	parsed_ref_dict['issue'],
																	parsed_ref_dict['year'],
																	parsed_ref_dict['pages'])
			
			result = works.query(formatted_bib_str).sort("relevance")
			
			# Browse first 200 entries to check if one of the results fit
			a = 0
			try:
				for entry in result:
					a += 1
					if a == 200:
						break
					entry = add_retrieval_information(entry, 'Crossref', 'Crossref_extended_query', str(parsed_ref_dict))

					normalized_dict = normalize_crossref_dict(entry)
					#print(normalized_dict)
					if normalized_dict:
						if is_same_publication(parsed_ref_dict, normalized_dict):
							article_dict = entry
							break	
			except JSONDecodeError:
				pass
			break
		except :
			pass
	if article_dict:
		return article_dict


def journal_name_match(str_1: str, str_2: str)-> bool:
	'''
	This function takes two strings and determines whether all letters from the
	shorter string appear in the longer string in the same order. If the condition
	is fulfilled, it returns True.
	'''
	# Normalise input strings while only considering alphabetic characters
	str_1 = ''.join(re.findall('[A-Za-z]+', str_1)).lower()
	str_2 = ''.join(re.findall('[A-Za-z]+', str_2)).lower()
	longer_str = max([str_1, str_2], key=len)
	shorter_str = min([str_1, str_2], key=len)

	index = 0
	reconstr_shorter_str = ''
	# Check if chars from shorter str can be matched with longer str in right order
	for short_char in shorter_str:
		for long_char_index in range(index, len(longer_str)):
			if short_char == longer_str[long_char_index]:
				index = long_char_index + 1
				reconstr_shorter_str += short_char
				break
	if reconstr_shorter_str == shorter_str:
		return True


def is_same_publication(parsed_ref_data: Dict, retrieved_ref_data: Dict) -> bool:
	'''
	This function compares two dictionaries with parsed and retrieved reference data and
	return True if all of the following are the same:
	- year
	- family name of first author
	- volume
	- first page
	- issue (if given)
	Additionally a str matching function is called to determine whether the journal names
	match (for details see journal_name_match()).
	'''
	# Check if journal names match 
	if 'journal' in retrieved_ref_data.keys():
		if 'journal' in parsed_ref_data.keys():
			if not journal_name_match(parsed_ref_data['journal'], retrieved_ref_data['journal']):
				return False
		else: return False
	else:
		return False

	# Check necessary keys
	necessary_keys = ['year', 
					  'first_page', 
					  'first_author_surname', 
					  'volume']
	for key in necessary_keys:
		if key in retrieved_ref_data.keys():
			if key in parsed_ref_data.keys():
				if str(parsed_ref_data[key]) == str(retrieved_ref_data[key]):
					pass
				else:
					return False
			else:
				return False
		else:
			return False
	# Check optional keys
	optional_keys = ['issue']
	for key in optional_keys:
		if parsed_ref_data[key]:
			if key in retrieved_ref_data.keys():
				if str(parsed_ref_data[key]) == str(retrieved_ref_data[key]):
					pass
				else:
					return False
	return True


def get_info_by_DOI(DOI: str) -> Dict:
	'''This function takes a DOI str, requests information about the corresponding
	article via metapub or crossref and checks if all necessary information has been retrieved.'''
	article_dict = {}
	fetch = PubMedFetcher()
	try:
		article = fetch.article_by_doi(DOI)
		# Save information in Dict
		for info in dir(article):
			if info[0] != '_':
				article_dict[info] = eval('article.' + info)
		# Add data retrieval info to the dict
		article_dict = add_retrieval_information(article_dict, 'MetaPub', 'DOI', DOI)
	except MetaPubError:
		# If it does not work via Metapub, do it via Crossref Api
		# If there is a timeout, try again (5 times)
		for _ in range(5):
			try:
				works = Works()
				article_dict = works.doi(DOI)
				break
			except:
				pass
		#article_dict = normalize_crossref_dict(article_dict)
		# Add data retrieval info to the dict
		#if contains_minimal_information(article_dict):
		article_dict = add_retrieval_information(article_dict, 'Crossref', 'DOI', DOI)
	return article_dict


def get_info_by_PMID(PMID: str) -> Dict:
	'''This function takes a PMID str, requests information about the corresponding
	article via metapub and checks if all necessary information has been retrieved.'''
	article_dict = {}
	fetch = PubMedFetcher()
	try:
		article = fetch.article_by_pmid(PMID)
		# Save information in Dict
		for info in dir(article):
			if info[0] != '_':
				article_dict[info] = eval('article.' + info)				
	except MetaPubError:
		pass
	#if contains_minimal_information(article_dict):
		# Add data retrieval info to the dict and return it
	article_dict = add_retrieval_information(article_dict, 'MetaPub', 'PMID', PMID)
	return article_dict


def add_retrieval_information(reference_dict: Dict, retrieved_from: str, query_str_type: str, query_str: str) -> Dict:
	'''This function takes a reference_dict (Dict) and information about where the reference data was retrieved from,
	what type of query str and what exact query str have been used to retrieve the information. It adds this data to
	the dictionary and returns the modified dictionary.'''
	if reference_dict:
		reference_dict['reference_retrieved_from'] = retrieved_from
		reference_dict['query_str_type'] = query_str_type
		reference_dict['query_str'] = query_str
		return reference_dict


def contains_DOI(ID: str) -> str:
	'''This function takes a string, checks if it contains a DOI and returns
	a string that only contains the DOI if that is the case.'''
	doi_pattern = '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\S)+)'
	match = re.search(doi_pattern, ID)
	if match:
		return match.group()


def normalize_name_spelling(name: str) -> str:
	'''This function takes a string and returns the same string with normalized
	upper- and lowercase spelling ('MUSTERMANN, MAX-MORITZ' -> 'Mustermann, Max-Moritz').'''
	normalized_name = ''
	for letter_index in range(len(name)):
		# Uppercase for first name
		if letter_index == 0:
			normalized_name += name[letter_index].upper()
		# Uppercase after space or hyphen
		elif name[letter_index-1] in [' ', '-']:
			normalized_name += name[letter_index].upper()
		#elif re.search('[\w\-\s]', author[letter_index]): # Filter everything that is not a letter and add as lowercase character

		else:
			normalized_name += name[letter_index].lower()
	return normalized_name


def get_normalized_author_list(authors, input_type: str) -> List[str]:
	'''This function takes a author str as returned by Scholarly,
	an author list as returned by the Crossref API
	or an author list as returned by Metapub and
	return list of normalized author strings.
	The input_type has to be specified as 'scholarly', 'metapub' or 'crossref'.
	-> ['Doe, J.', 'Mustermann, M.']'''
	# SCHOLARLY OUTPUT
	# 'Rajan, Kohulan and Brinkhaus, Henning Otto and SOROKINA, MARIA and Zielesny, Achim and Steinbeck, Christoph'
	author_list = []
	if input_type == 'scholarly':
		if ' And ' in authors:
			orig_author_list = authors.split(' And ')
		elif ' and ' in authors:
			orig_author_list = authors.split(' and ')
		# Normalize upper- and lowercase spelling
		for author in orig_author_list:
			normalized_author = ''

			for split_subname_index in range(len(author.split(', '))):
				# Copy complete surname with normalized spelling
				if split_subname_index == 0:
					normalized_author += normalize_name_spelling(author.split(', ')[split_subname_index])
				# Only copy abbreviated first names
				else:
					normalized_author += ', '
					for letter_index in range(len(author.split(', ')[split_subname_index])):
						if authors[letter_index-1] in [' ', '-']:
							normalized_author += author[letter_index].upper()  
							if split_subname_index != len(author.split(', ')):
								normalized_author += '., '
			author_list.append(normalized_author)

	# METAPUB OUTPUT ['Lustig, P', 'Mueller, HO', ...]
	elif input_type == 'metapub':
		for name in authors:
			normalized_author = ''
			for sub_name in name.split(' '):
				# abbreviated first name(s)
				if sub_name.isupper() and len(sub_name) == 1:
					for char in sub_name:
						normalized_author += char + '. '
				# surname
				else:
					normalized_author += sub_name + ', '
			author_list.append(normalize_name_spelling(normalized_author[:-2]))

	# CROSSREF OUTPUT: [{'given': 'Kohulan', 'family': 'Rajan', 'sequence': 'first', 'affiliation': []}, {'given': 'Henning Otto', 'family': 'Brinkhaus', 'sequence': 'additional', 'affiliation': []}]
	elif input_type == 'crossref':
		for author_dict in authors:
			normalized_author = ''
			try:
				# Personal name format
				normalized_author += normalize_name_spelling(author_dict['family']) +', '
				if 'given' in author_dict.keys():
					first_names = author_dict['given'].split()
					for first_name_index in range(len(first_names)):
						normalized_author += first_names[first_name_index][0].upper() + '.'
						if first_name_index != len(first_names) - 1:
							normalized_author += ' '
				else:
					normalized_author = normalized_author[:-2]
			except KeyError:
				# Organisation name format
				try:
					normalized_author = author_dict['name']
				except KeyError:
					return 
			author_list.append(normalized_author)

	return author_list


def normalize_title(title: str, only_if_homogeneous: bool = True) -> str:
	'''This function takes a string and returns the same string where the first character of every
	word that is not on an exception-list is an upper-case character.
	If only_if_homogeneous, the string is only changed if it is completely composed of upper- or lowercase characters.'''
	# TODO: Find a better solution for this.
	lowercase_list = ['of', 'a', 'from', 'the', 'an', 'not', 'is', 'that', 'as', 'and', 'are']
	if title.isupper() or title.islower() or not only_if_homogeneous:
		split_str = title.split(' ')
		title = ''
		for word in split_str:
			if word.lower() not in lowercase_list: 
				if len(word) > 0:
					title += word[0].upper()
					for char in word[1:]:
						title += char.lower()
			else:
				title += word
			title += ' '
		title = title[:-1]
	return title



def normalize_metapub_dict(metapub_dict: Dict):
	'''
	This function takes a dictionary as it is returned by a MetaPub retrieval
	and returns a dictionary with the information relevant for a reference notation
	str in a normalised format.
	'''
	normalized_dict = {}
	copy_keys = ['title', 'year', 'volume', 'issue', 'first_page', 'pages', 'journal', 'reference_retrieved_from', 'query_str_type', 'query_str']
	for key in copy_keys:
		if key in metapub_dict.keys(): 
			normalized_dict[key] = metapub_dict[key]
	if 'authors' in metapub_dict.keys() and len(metapub_dict['authors']) > 0: 
		normalized_dict['authors'] = get_normalized_author_list(metapub_dict['authors'], 'metapub')
		normalized_dict['first_author_surname'] = normalized_dict['authors'][0].split(',')[0]
	if 'doi' in metapub_dict.keys(): 
		normalized_dict['DOI'] = metapub_dict['doi']
	if 'pmid' in metapub_dict.keys():
		normalized_dict['PMID'] = metapub_dict['pmid']
	else:
		normalized_dict['PMID'] = None
	return normalized_dict


def normalize_crossref_dict(crossref_dict: Dict) -> Dict:
	'''This function takes a dict with publication metadata as returned by the 
	Crossref API and returns a dict which contains the essential information in 
	the same format as returned by Metapub.'''
	if crossref_dict:
		normalized_dict = {}
		normkeys = ['title', 'abstract', 'DOI', 'issue', 'volume']
		for normkey in normkeys:
			if normkey in crossref_dict.keys():
				content = crossref_dict[normkey]
				if type(content) == list:
					if len(content) > 0:
						normalized_dict[normkey] = content[0]
				else:
					normalized_dict[normkey] = content
			else:
				normalized_dict[normkey] = None
		# year
		if 'issued' in crossref_dict.keys():
			if 'date-parts' in crossref_dict['issued']:
				normalized_dict['year'] = crossref_dict['issued']['date-parts'][0][0]
				
		# journal/book
		if 'type' in crossref_dict.keys():
			if crossref_dict['type'] == 'journal-article':
				normalized_dict['journal'] = crossref_dict['container-title'][0]
		# author list
		if 'author' in crossref_dict.keys(): 
			normalized_dict['authors'] = get_normalized_author_list(crossref_dict['author'], 'crossref')
			if not normalized_dict['authors']:
				return
			normalized_dict['first_author_surname'] = normalized_dict['authors'][0].split(',')[0]
			
		# page
		if 'page' in crossref_dict.keys():
			if crossref_dict['type'] == 'journal-article':
				normalized_dict['pages'] = crossref_dict['page']
				normalized_dict['first_page'] = normalized_dict['pages'].split('-')[0]
		else:
			normalized_dict['pages'] = normalized_dict['first_page'] = False
		
		origin_keys = ['reference_retrieved_from', 'query_str_type', 'query_str']
		for origin_key in origin_keys:
			normalized_dict[origin_key] = crossref_dict[origin_key]
		normalized_dict['PMID'] = None
		return normalized_dict




def create_normalized_reference_str(article_dict: Dict) -> str:
	'''This function takes a dictionary with information about a publication (as returned by
	get_info_by_DOI() or scholarly_request()) and returns a normalized reference string.'''
	reference_str = ''
	# Add authors
	if 'authors' in article_dict.keys():
		if len(article_dict['authors']) >= 3:
			reference_str = article_dict['first_author_surname'] + ' et al., '
		elif len(article_dict['authors']) == 0:
			reference_str = ''
		else:
			reference_str = article_dict['first_author_surname'] + ', '
	# If the journal name is known: Create something with the pattern
	# #Smith, J. et al, J. Odd Results, 1968, 10, 1020
	if 'journal' in article_dict.keys():
		reference_str += normalize_title(article_dict['journal'], only_if_homogeneous=False) + ', '
		reference_str += str(article_dict['year']) + ', '
		if 'volume' in article_dict.keys() and article_dict['volume']:
			reference_str += str(article_dict['volume']) + ', '
		if 'issue' in article_dict.keys() and article_dict['issue']:
			if 'volume' in article_dict.keys() and article_dict['volume']:
				reference_str = reference_str[:-2] + ' (' + str(article_dict['issue']) + '), '
			else:
				reference_str = reference_str + '(' + str(article_dict['issue']) + '), '
		if 'first_page' in article_dict.keys() and article_dict['first_page']:
			reference_str += article_dict['first_page']#.replace('--', '-') + ', '
	else:
		reference_str = None
	#reference_str = reference_str[:-2]

	return reference_str


def reference_quality_assurance(reference_dict: Dict) -> bool:
	'''This function checks the retrieved reference dict to make sure that the retrieved
	information matches the original input string. It returns a corresponding bool.'''
	# If the query was based on a PMID or a DOI, there is no reason to not to trust the retrieved information.
	if reference_dict['query_str_type'] in ['DOI', 'PMID']:
		return True
	# If the query was based on some keyword str, the result might be flawed.
	else:
		# Make sure that the year and the last name of the first author appear in the original query str
		# TODO: Think about a better solution for this.
		query_str = reference_dict['query_str']
		if str(reference_dict['year']) in query_str:
			first_author_surname = reference_dict['authors'][0].split()[0]
			if first_author_surname.lower() in query_str.lower():
				return True



def get_structured_reference(unstructured_publication_ID: str, only_DOI_PMID: bool = False, scholarly: bool = False) -> Dict:
	'''This function takes a string that contains a reference to a publication.
	If only_DOI_PMID = True, it will only return queries based on DOI or Pubmed IDs (relatively secure).
	Otherwise, the most "relevant" result from a Crossref keyword query is also used.
	If scholarly = True, Scholarly will be used as an emergency solution (warning: CAPTCHAS)
	It uses
	- Metapub (PubMed API)
	- Crossref API
	- Scholarly (Google Scholar) [emergency solution <- CAPTCHAS]
	to request more information and returns a Dict that contains
	all gathered information about the publication in a structured format.'''
	
	# If there is a DOI in the input str, try to use Metapub and 
	article_dict = False
	DOI = contains_DOI(unstructured_publication_ID)
	if DOI:
		try:
			article_dict = get_info_by_DOI(DOI)
		except EutilsNCBIError:
			article_dict = False
	# If no DOI is available or the queries have not returned anything reasonable, 
	#check if the given ID only consists of numbers. If that is the case, interpret 
	# it as a PMID for a Metapub query and see if that works.
	if not article_dict:
		if len(unstructured_publication_ID) > 5:
			if unstructured_publication_ID.isdigit():
				try:
					article_dict = get_info_by_PMID(unstructured_publication_ID)
				except EutilsNCBIError:
					article_dict = False
	# If it has not worked until now, use crossref API and take most 'relevant' result
	# TODO: Some sort of validation that we get the right result here
	if not only_DOI_PMID:
		if not article_dict:
			article_dict = crossrefAPI_query(unstructured_publication_ID)

		
	# If we still have not gotten a sufficient result, try Google Scholar and take most 'relevant' result
	# WARNING: If you launch too many requests, Google will block you and/or use CAPTCHAs
	if scholarly:	
		if article_dict:
			if not contains_minimal_information(article_dict):
				try:
					article_dict = scholarly_request(unstructured_publication_ID)
				except StopIteration:
					article_dict = False
				except MaxTriesExceededException:
					article_dict = False
	return article_dict


def retrieve_info_MetaPub_Crossref(unstructured_publication_ID: str, only_DOI_PMID: bool = False) -> Dict:
	'''This function takes a string that contains a reference to a publication.
	If only_DOI_PMID = True, it will only return queries based on DOI or Pubmed IDs (relatively secure).
	Otherwise, the most "relevant" result from a Cros
	It uses
	- Metapub (PubMed API)
	- Crossref API (with the first 200 entries)
	to request more information and returns a Dict that contains
	all gathered information about the publication in a structured format.'''
	
	# If there is a DOI in the input str, try to use Metapub and 
	article_dict = False
	DOI = contains_DOI(unstructured_publication_ID)
	if DOI:
		try:
			article_dict = get_info_by_DOI(DOI)
		except EutilsNCBIError:
			article_dict = False
	# If no DOI is available or the queries have not returned anything reasonable, 
	#check if the given ID only consists of numbers. If that is the case, interpret 
	# it as a PMID for a Metapub query and see if that works.
	if not article_dict:
		if len(unstructured_publication_ID) > 3:
			if unstructured_publication_ID.isdigit():
				try:
					article_dict = get_info_by_PMID(unstructured_publication_ID)
				except EutilsNCBIError:
					article_dict = False
	# If it has not worked until now, use crossref API and take most 'relevant' result
	if not only_DOI_PMID:
		if not article_dict:
			parser = rp.reference_parser()
			parsed_ref_dict = parser(unstructured_publication_ID)
			parsed_ref_dict = add_retrieval_information(parsed_ref_dict, 'Crossref', 'unstructured_ID', unstructured_publication_ID)
			article_dict = crossrefAPI_improved_query(parsed_ref_dict)
	return article_dict


def get_final_dict_from_ref_str(ref_str: str):
	'''
	This function takes a ref_str and goes through the whole process of 
	information retrieval (DOI, PMID retrievals are considered secure,
	the keyword retrievals are double checked by comparing parsed information
	with the retrieved information) and if the information is confirmed, it
	returns a dictionary that maps the original string to a dictionary that
	contains a normalised reference str, the DOI and the PMID.
	'''
	references = {}
	ref_dict = retrieve_info_MetaPub_Crossref(ref_str)
	if ref_dict:
		if ref_dict["reference_retrieved_from"] == "Crossref":
			norm_dict = normalize_crossref_dict(ref_dict)
			if norm_dict['query_str'][0] == '{':
				norm_dict['query_str'] = eval(norm_dict['query_str'])['query_str']
		elif ref_dict['reference_retrieved_from'] == 'MetaPub':
			norm_dict = normalize_metapub_dict(ref_dict) 
		
		if create_normalized_reference_str(norm_dict):
			references[norm_dict['query_str']] = {'reference': create_normalized_reference_str(norm_dict),
												  'DOI': norm_dict['DOI'],
												  'PMID': norm_dict['PMID']}
			return references
	return references




if __name__ == '__main__':
	if len(sys.argv) == 2:
		retrieve_info_MetaPub_Crossref(sys.argv[1])
	else:
		print('Usage: ' + sys.argv[0] + 'unstructured_publication_ID')


