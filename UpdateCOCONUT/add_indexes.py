#!/usr/bin/python -tt

from pymongo import MongoClient

from pymongo.errors import CursorNotFound
import re
import sys
import json


import os





def main():
    mongoPort = sys.argv[1]
    mongoDatabase = sys.argv[2]

    client = MongoClient("localhost:"+mongoPort)
    db = client[mongoDatabase]

    collection = db.list_collection_names()
    for collect in collection:
        print(collect)

    resp = db.fragment.create_index({"signature":1})
    print ("index response:", resp)

    resp = db.fragment.create_index({"signature":1, "withsugar":-1})
    print ("index response:", resp)


    client.close()
    print("done")






if __name__ == '__main__':
    main()


