# NaturalProductsOnline

NaturalProductsOnline is the web application for the COCONUT database of openly available natural products structures.

Prior to any further action, a target folder needs to be generated, with the following command:

```
mvn package
```

To fire up a local version of it, you need to have Docker installed.


In the directory containing the 'docker-compose.yml' file run the following commands:


```
docker-compose build
docker-compose up -d

docker exec -it coconut-mongo-db bash

mongo --port 27022
use COCONUT_2021_03
db.dropDatabase()
exit

cd mongodata/COCONUT_2021_03/COCONUT_2021_03/
mongorestore --port 27022 --db=COCONUT_2021_03 --noIndexRestore .

mongo --port 27022
use COCONUT_2021_03

 db.sourceNaturalProduct.createIndex( {source:1})

 db.sourceNaturalProduct.createIndex( {simpleInchi:"hashed"})

 db.sourceNaturalProduct.createIndex( {simpleInchiKey:1})
 db.sourceNaturalProduct.createIndex( {originalInchiKey:1})
 db.sourceNaturalProduct.createIndex( {originalSmiles:"hashed"})
 db.sourceNaturalProduct.createIndex( {absoluteSmiles:"hashed"})
 db.sourceNaturalProduct.createIndex( {idInSource:1})


db.uniqueNaturalProduct.createIndex( {inchi:"hashed"})
db.uniqueNaturalProduct.createIndex( {inchikey:1})
db.uniqueNaturalProduct.createIndex( {clean_smiles: "hashed"})
db.uniqueNaturalProduct.createIndex( {molecular_formula:1})


db.runCommand(
  {
    createIndexes: 'uniqueNaturalProduct',
    indexes: [
        {
            key: {
                synonyms:"text", name:"text", chemicalClass:"text", chemicalSubClass:"text", chemicalSuperClass:"text", directParentClassification:"text", pass_bioactivity_searcheable:"text"
            },
            name: "superTextIndex",
	    weights: { name:10, synonyms:5  }
        }

    ]
  }
)




db.uniqueNaturalProduct.createIndex( {annotationLevel:1})

db.uniqueNaturalProduct.createIndex( {npl_score:1})
db.uniqueNaturalProduct.createIndex( {molecular_weight:1})
db.uniqueNaturalProduct.createIndex( {fsp3:1})
db.uniqueNaturalProduct.createIndex( {lipinskiRuleOf5Failures:1})
db.uniqueNaturalProduct.createIndex( {heavy_atom_number:1})

db.uniqueNaturalProduct.createIndex( {found_in_databases:1})


db.uniqueNaturalProduct.createIndex( {coconut_id:1})
db.uniqueNaturalProduct.createIndex( {fragmentsWithSugar:"hashed"})
db.uniqueNaturalProduct.createIndex( {fragments:"hashed"})

db.uniqueNaturalProduct.createIndex( { pubchemBits : "hashed" } )

db.uniqueNaturalProduct.createIndex( {unique_smiles: "hashed"})
db.uniqueNaturalProduct.createIndex( {deep_smiles: "hashed"})
db.uniqueNaturalProduct.createIndex( { "pfCounts.bits" :1} )
db.uniqueNaturalProduct.createIndex( { "pfCounts.count" : 1 })

db.uniqueNaturalProduct.createIndex( {chemicalSuperClass: "hashed"})
db.uniqueNaturalProduct.createIndex( {chemicalClass: "hashed"})
db.uniqueNaturalProduct.createIndex( {chemicalSubClass: "hashed"})
db.uniqueNaturalProduct.createIndex( {directParentClassification: "hashed"})




db.uniqueNaturalProduct.createIndex( {contains_sugar:1})
db.uniqueNaturalProduct.createIndex( {contains_ring_sugars:1})
db.uniqueNaturalProduct.createIndex( {contains_linear_sugars:1})



db.fragment.createIndex({signature:1})
db.fragment.createIndex({signature:1, withsugar:-1})



db.uniqueNaturalProduct.update({"coconut_id":"CNP0228556"}, { $set:{"name":"Caffein"}})
db.uniqueNaturalProduct.update({"coconut_id":"CNP0298040"}, { $set:{"name":"Octacosane"}})
db.uniqueNaturalProduct.update({"coconut_id":"CNP0173017"}, { $set:{"name":"Myriocin"}})



exit
exit
```



# Rebuild the interface 

In case you want to rebuild the "natural-products-online" container only (because changes have been made to the front- or back-end) run the following:
```
docker-compose up -d --no-deps --build natural-products-online
```


