#!/usr/bin/python -tt

from pymongo import MongoClient

from pymongo.errors import CursorNotFound
import re
import sys


import os
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


from time import sleep

import citation_normalisation as cn




def main():
    mongoPort = sys.argv[1]
    mongoDatabase = sys.argv[2]

    client = MongoClient("localhost:"+mongoPort)
    db = client[mongoDatabase]

    aggregate =[ { '$project':{  '_id':0, 'coconut_id':1 }}]

    np_ids = db.uniqueNaturalProduct.aggregate(aggregate)

    print("retrieved all coconut ids")
    client = MongoClient("localhost:"+mongoPort)
    db = client[mongoDatabase]


    print("verifying citations for each molecule")
    try:
        for r in np_ids:

            coconut_id = r['coconut_id']
            print(coconut_id)

            np = db.uniqueNaturalProduct.find({"coconut_id": coconut_id})
            np = np[0]

            if 'citationDOI' in np.keys() and "literature" not in np.keys() :
                print(np["citationDOI"])
                for literature_entry in np["citationDOI"]:
                    if literature_entry != "" and literature_entry != "NA":

                        print(literature_entry)
                        json_clean_ref = cn.get_final_dict_from_ref_str(literature_entry) #returns a dict

                        print(json_clean_ref)
                        if len(json_clean_ref.keys())>0:
                            if literature_entry in json_clean_ref.keys():
                                print(json_clean_ref[literature_entry])
                                db.uniqueNaturalProduct.update_one({'coconut_id': coconut_id}, {"$push": {"literature": json_clean_ref[literature_entry]}})


    except (CursorNotFound, Exception) as e :
        print(e)
        pass

    client.close()
    print("done")




if __name__ == '__main__':
    main()


