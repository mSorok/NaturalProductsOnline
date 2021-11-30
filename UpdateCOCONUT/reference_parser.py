import re
from typing import Dict




class reference_parser:
	'''This class contains parsers for reference notations that occur(ed) frequently in COCONUT.'''
	def __init__(self) -> None:
		self.parsed_references =  ()
		pass
		

	def __call__(self, reference_str) -> Dict:
		'''
		When an instance of reference parser is called as a function with a reference str,
		it will apply all available parser functions and return a dictionary containing the
		parsed information if one of the available patterns fits.
		'''
		parser_functions = [
							self.parse_general_pattern,
							self.parse_underscore_pattern,
							self.parse_jchemsoc_pattern,
							self.parse_harborne_flavonoid_pattern,
							self.parse_harborne_phytochemdict_pattern
							]
		for parser_function in parser_functions:
			parsed_reference_dict = parser_function(reference_str)
			if parsed_reference_dict:
				return parsed_reference_dict
		

	def __enter__(self):
		return self


	def __exit__(self, type, value, tb) -> None:
		pass


	def parse_general_pattern(self, reference: str):
		'''
		This function accepts a string and checks for a specific type of reference notation.
		Examples:
		'El-Sayed,Phytochem.,30,(1991),2442'
		'Peng J.-P.,Phytochem.,41,(1996),283-285'
		'Ingham,Phytochem.,15,819769,1489'
		'Mathews.,J. Biol. Chem.,241(21),(1966),5008'
		If the pattern is detected, the reference string is parsed and a dictionary with
		the parsed information is returned.
		'''
		# Define regex pattern
		authors = '(?P<authors>([A-Z\-]\.\s?)*(?P<first_author_surname>[a-zA-Z\-\s]+),?([A-Z]\.\-?\s?)?\,?\s?([A-Z]\.\s?)?)\.?(\s?\,|et al\.?,?)\s?'
		#authors = '(?P<authors>([A-Z\-]\.\s?)*(?P<first_author_surname>[a-zA-Z\-]+)\s?,?([A-Z]\.\-?\s?)?\,?\s?([A-Z]\.\s?)?)\.?(\s?\,|et al\.?,?)\s?'

		journal = '(?P<journal>[a-zA-Z\-\'\s\.]+)(\s?\([A-Za-z]+\)\s?)?(,\s?Suppl.)?,?\.?\s?'
		volume_issue = '((?P<volume>(No\.?\s?)?\d+[A-Ea-e]?)(\s?\((?P<issue>\d+)\))?\.?,?\s?)?' # does not have to appear
		year = '\((?P<year>(20|1[89])\d\d)\),?\s?'
		typo_year = '(8?(?P<year1>(20|1[789])\d\d)\),?\s?|8(?P<year2>(20|1[89])\d\d)9,?\s?|\((?P<year3>(20|1[89])\d\d)9,?\s?)'
		pages = '(?P<pages>(?P<first_page>\d+)(\-\d+)?)'
		
		general_pattern = '^\s?' + authors + journal + volume_issue + year + pages + '\.?$'
		# Typo that occurs regularily (see ref_str_year_typo_$N)
		general_pattern_with_year_typo = '^' + authors + journal + volume_issue + typo_year + pages + '\.?$'
		
		# Match pattern, create group_dict, normalise and return it
		match = re.search(general_pattern, reference)
		if match:
			group_dict = match.groupdict()
			# Get rid of " et al" in surname 
			if group_dict['first_author_surname'][-6:] == ' et al':
				group_dict['first_author_surname'] = group_dict['first_author_surname'][:-6]
			return group_dict
		match = re.search(general_pattern_with_year_typo, reference)
		if match:
			group_dict = match.groupdict()
			# Get rid of " et al" in surname 
			if group_dict['first_author_surname'][-6:] == ' et al':
				group_dict['first_author_surname'] = group_dict['first_author_surname'][:-6]
			# Delete unnecessary year keys and save information under key "year"
			year_keys = ['year1', 'year2', 'year3']
			for year_key in year_keys:
				if year_key in group_dict.keys():
					if group_dict[year_key]:
						group_dict['year'] = group_dict.pop(year_key)
					else:
						group_dict.pop(year_key)
			return group_dict


	def parse_underscore_pattern(self, reference: str) -> Dict:
		'''
		This function accepts a string and checks for a specific type of reference notation.
		Examples:
		'J_Agric_Food_Chem_2016_64_(21):4255-4263'
		'J_Nat_Prod_2015_78_(4):730-735'
		"Phytochemistry_2003;64:285-291"
		If the pattern is detected, the reference string is parsed and a dictionary with
		the parsed information is returned.
		'''
		# Define regex pattern
		journal = '(?P<journal>[A-Za-z\_]+)'
		year = '(?P<year>(20|1[89])\d\d)'
		gap = '[_:;]'
		volume_issue = '(?P<volume>\d+)([_:;]?\((?P<issue>\d+)\))?'
		pages = '(?P<pages>(?P<first_page>\d+)(\-\d+)?)'

		underscore_pattern = '^\"?\s?\"?' + journal + gap + year + gap + volume_issue + gap + pages + '\"?\s?\"?$'
		
		# Match pattern, create group_dict, normalise and return it
		match = re.search(underscore_pattern, reference)
		if match:
			group_dict = match.groupdict()
			# Normalise journal spelling (don't include underscore)
			for space_char in ['_', ':', ';']:
				group_dict['journal'] = group_dict['journal'].replace(space_char, ' ')
			return group_dict
		

	def parse_jchemsoc_pattern(self, reference: str) -> Dict:
		'''
		This function accepts a string and checks for a specific type of reference notation.
		Examples:
		'Gunasekera,J.Chem.Soc.,Perkin 1,(1975),2447'
		'Locksley,J.Chem.Soc.,C,(1971),1332'
		If the pattern is detected, the reference string is parsed and a dictionary with
		the parsed information is returned.
		'''
		# Define regular expression
		authors = '(?P<authors>([A-Z\-]\.\s?)*(?P<first_author_surname>[a-zA-Z\-\s]+),?([A-Z]\.\-?\s?)?\,?\s?([A-Z]\.\s?)?)\.?(\s?\,|et al\.?,?)\s?'
		journal = '(?P<journal>J\.\s?Chem\.\s?Soc\.,\s?(C|Perkin\s?1)),'
		year = '\((?P<year>(20|1[89])\d\d)\),?\s?'
		pages = '(?P<pages>(?P<first_page>\d+)(\-\d+)?)'

		jchemsoc_pattern = '^\s?' + authors + journal + year + pages + '$'
		match = re.search(jchemsoc_pattern, reference)
		if match:
			group_dict = match.groupdict()
			# Add space after comma in journal specification
			group_dict['journal'] = group_dict['journal'].replace(',', ', ')
			group_dict['journal'] = group_dict['journal'].replace('  ', ' ')
			return group_dict


	def parse_harborne_flavonoid_pattern(self, reference: str) -> Dict:
		'''
		This function accepts a string and checks for a specific type of reference notation.
		Examples:
		'Harborne, The Handbook of Natural Flavonoids, 2, (1999), 115,Chalcones,dihydrochalcones and aurones'
		'Harborne, The Handbook of Natural Flavonoids, 1, (1999), 181.Flavonols'
		'Harborne, The Handbook of Natural Flavonoids, 1, (1999), 3.Flavone O-glycosides, John Wiley & Son'
		As this pattern refer to entries from one specific book, the pattern is not just recognized and parsed
		but the output Dict is also enriched with additional information.
		the parsed information is returned.
		'''
		# Define regular expression
		authors_booktitle_volume = '^(?P<authors>Harborne),\s?(?P<title>The Handbook of Natural Flavonoids),\s?(?P<volume>[12]),\s?'
		year = '\((?P<year>1999)\),'
		chapter = '\s?(?P<chapter_no>\d+)\s?[,\.](?P<chapter_title>[a-zA-Z\s\,\-]+)'
		rest = '(,\s?John Wiley\s?&\s?Son)?\.?$'
		harborne_pattern = '^\s?' + authors_booktitle_volume + year + chapter + rest + '$'

		match = re.search(harborne_pattern, reference)
		if match:
			group_dict = match.groupdict()
			# Add additional information about the book
			group_dict['authors'] = 'Harborne, J.B., Baxter, H.'
			group_dict['publisher'] = 'Wiley'
			group_dict['doi'] = '10.1016/S0039-9140(00)00629-9'
			group_dict['isbn'] = '0-471-95893-' + group_dict['volume']
			group_dict['original_str'] = reference
			return group_dict


	def parse_harborne_phytochemdict_pattern(self, reference: str) -> Dict:
		'''
		This function accepts a string and checks for a specific type of reference notation.
		Examples:
		'Harborne,Phytochemical Dictionary Second Edition,Taylor and Francis,(1999),Chapter54'
		As this pattern refers to entries from one specific book, the pattern is not just recognized and parsed
		but the output Dict is also enriched with additional information.
		the parsed information is returned.
		'''
		# Define regular expression
		author_title = 'Harborne,\s?Phytochemical Dictionary Second Edition,\s?Taylor and Francis,\s?'
		year = '\((?P<year>1999)\),\s?'
		chapter = 'Chapter\s?(?P<chapter_no>\d+)\.?'

		harborne_phytochemdict_pattern = '^\s?' + author_title + year + chapter + '$'

		match = re.search(harborne_phytochemdict_pattern, reference)
		if match:
			group_dict = match.groupdict()
			# Add additional information about the book
			group_dict['authors'] = 'Harborne, J.B., Baxter, H., Moss, G.P.'
			group_dict['publisher'] = 'Taylor & Francis'
			group_dict['title'] = 'Phytochemical Dictionary. A Handbook of Bioactive Compounds from Plants (Second Edition)'
			group_dict['doi'] = 'https://doi.org/10.4324/9780203483756'
			group_dict['isbn'] = '9780748406203'
			group_dict['original_str'] = reference
			return group_dict


            