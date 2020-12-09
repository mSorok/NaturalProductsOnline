package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import de.unijena.cheminf.naturalproductsonline.model.AdvancedSearchModel;
import de.unijena.cheminf.naturalproductsonline.utils.CustomAggregationOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.data.mongodb.repository.query.StringBasedMongoQuery;

import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.query.Criteria.where;


public class UniqueNaturalProductRepositoryImpl implements UniqueNaturalProductRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public UniqueNaturalProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }



    @Override
    public List<UniqueNaturalProduct> similaritySearch(ArrayList<Integer> reqbits, ArrayList<Integer> qfp,  Integer qmin, Integer qmax, Integer qn, Double threshold, Integer maxResults ){

        String fMatch1 = "{'$match': {'pfCounts.count': {'$gte': "+qmin+", '$lte': "+qmax+"}, 'pfCounts.bits': {'$in': "+reqbits+"}}}";


        String fProjection = "{'$project': { 'tanimoto': {'$let': {  'vars': {'common': {'$size': {'$setIntersection': ['$pfCounts.bits', "+qfp+"]}}}, 'in': {'$divide': ['$$common', {'$subtract': [{'$add': ["+qn+", '$pfCounts.count']}, '$$common']}]}  }},   'coconut_id': 1, 'unique_smiles':1, 'clean_smiles':1, 'molecular_formula':1, 'molecular_weight':1, 'npl_score':1 , 'name':1, 'smiles':1}}";


        String fMatch2 = "{'$match': {'tanimoto': {'$gte': "+threshold+"}}}";

        String fSort = "{ $sort: { 'tanimoto': -1} }";

        String limit = "{$limit: "+maxResults+"}";


        //String fQuery = "{'$match': {'pfCounts.count': {'$gte': "+qmin+", '$lte': "+qmax+"}, 'pfCounts.bits': {'$in': "+reqbits+"}}},{'$project': {'tanimoto': {'$let': {'vars': {'common': {'$size': {'$setIntersection': ['$pfCounts.bits', "+qfp+"]}}},'in': {'$divide': ['$$common', {'$subtract': [{'$add': ["+qn+", '$pfCounts.count']}, '$$common']}]} }},'coconut_id': 1, }},{'$match': {'tanimoto': {'$gte': "+threshold+"}}}" ;


        TypedAggregation agg = newAggregation(
                UniqueNaturalProduct.class,

                new CustomAggregationOperation(fMatch1),
                new CustomAggregationOperation(fProjection),
                new CustomAggregationOperation(fMatch2),
                new CustomAggregationOperation(fSort),
                new CustomAggregationOperation(limit)

        );

        System.out.println(agg);

        AggregationResults results = mongoTemplate.aggregate(agg, "uniqueNaturalProduct", UniqueNaturalProduct.class);


        List<UniqueNaturalProduct> returnedNP = results.getMappedResults();

        return returnedNP;
    }



    @Override
    public List<UniqueNaturalProduct> advancedSearchWithCriteria(AdvancedSearchModel criterias, Integer maxResults){

        List<UniqueNaturalProduct> result ;

        Query advancedQuery = new Query();



        Criteria bigCriteria = new Criteria();

        ArrayList<Criteria> andCriterias = new ArrayList<>();
        ArrayList<Criteria> orCriterias = new ArrayList<>();




        for(int i=0; i< criterias.getListOfSearchItems().length; i++) {




            String itemType = criterias.getListOfSearchItems()[i].getAsString("itemType");
            String itemLogic = criterias.getListOfSearchItems()[i].getAsString("itemLogic");



            if (itemType.equals("molecular_formula")) {




                advancedQuery.with(Sort.by(Sort.Direction.DESC, "heavy_atom_number"));



                //leave value as string
                String totalItemValue = criterias.getListOfSearchItems()[i].getAsString("itemValue");

                Criteria c = where(itemType).is(totalItemValue);

                if (itemLogic.equals("AND")) {
                    andCriterias.add(c);
                    //bigCriteria.andOperator(c);
                } else {
                    orCriterias.add(c);
                    //bigCriteria.orOperator(c);
                }


            } else if (itemType.equals("number_of_rings")) {


                advancedQuery.with(Sort.by(Sort.Direction.DESC, "max_number_of_rings"));


                Double itemValueMin = 0.0;
                if (!criterias.getListOfSearchItems()[i].getAsString("itemValueMin").equals("")) {
                    itemValueMin = Double.parseDouble(criterias.getListOfSearchItems()[i].getAsString("itemValueMin"));
                }

                Double itemValueMax = 0.0;
                if (!criterias.getListOfSearchItems()[i].getAsString("itemValueMax").equals("")) {
                    itemValueMax = Double.parseDouble(criterias.getListOfSearchItems()[i].getAsString("itemValueMax"));
                }


                Criteria c1 = where("min_number_of_rings").gte(itemValueMin);
                Criteria c2 = where("max_number_of_rings").lte(itemValueMax);
                ArrayList<Criteria> cl = new ArrayList<Criteria>();
                cl.add(c1);
                cl.add(c2);
                Criteria c = new Criteria().andOperator(cl.toArray(new Criteria[cl.size()]));

                if (itemLogic.equals("AND")) {
                    andCriterias.add(c);
                    //bigCriteria.andOperator(c);
                } else {
                    orCriterias.add(c);
                    //bigCriteria.orOperator(c);
                }


            } else if (itemType.equals("contains_sugars")) {

                advancedQuery.with(Sort.by(Sort.Direction.DESC, "heavy_atom_number"));

                Criteria c = new Criteria();
                Criteria cbis = null;

                if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("any_sugar")) {
                    c = where("contains_sugar").gte(1);

                } else if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("ring_sugar")) {
                    c = where("contains_ring_sugars").is(true);

                } else if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("only_ring_sugar")) {
                    Criteria c1 = where("contains_ring_sugars").is(true);
                    Criteria c2 = where("contains_linear_sugars").is(false);

                    ArrayList<Criteria> cl = new ArrayList<Criteria>();
                    cl.add(c1);
                    cl.add(c2);
                    c = new Criteria().andOperator(cl.toArray(new Criteria[cl.size()]));

                } else if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("linear_sugar")) {
                    c = where("contains_linear_sugars").is(true);

                } else if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("only_linear_sugar")) {
                    Criteria c1 = where("contains_ring_sugars").is(false);
                    Criteria c2 = where("contains_linear_sugars").is(true);

                    ArrayList<Criteria> cl = new ArrayList<Criteria>();
                    cl.add(c1);
                    cl.add(c2);
                    c = new Criteria().andOperator(cl.toArray(new Criteria[cl.size()]));

                } else if (criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("no_sugar")) {
                    c = where("contains_sugar").is(0);
                }

                if (itemLogic.equals("AND")) {
                    andCriterias.add(c);
                    if (cbis != null) {
                        andCriterias.add(cbis);
                    }
                    //bigCriteria.andOperator(c);
                } else {
                    orCriterias.add(c);
                    if (cbis != null) {
                        orCriterias.add(cbis);
                    }
                    //bigCriteria.orOperator(c);
                }

            }else if(itemType.equals("databases")){

                advancedQuery.with(Sort.by(Sort.Direction.DESC, "heavy_atom_number"));

                String dbLogic = criterias.getListOfSearchItems()[i].getAsString("dbLogic");


                //leave value as string
                String s = criterias.getListOfSearchItems()[i].getAsString("itemValue");

                s = s.replace("[", "");
                s = s.replace("]", "");
                String [] listDatabases = s.split(", ");


                ArrayList<Criteria> dbCriterias = new ArrayList<>();

                for(String db : listDatabases){
                    Criteria c = new Criteria().where("found_in_databases").all(db);
                    dbCriterias.add(c);

                }


                Criteria c = null;
                if(dbLogic.equals("OR")) {
                     c = new Criteria().orOperator(dbCriterias.toArray(new Criteria[dbCriterias.size()]));
                }else{
                    c = new Criteria().andOperator(dbCriterias.toArray(new Criteria[dbCriterias.size()]));
                }

                if (itemLogic.equals("AND")) {
                    andCriterias.add(c);
                } else {
                    orCriterias.add(c);
                }





            }else{
                Double itemValueMin = 0.0;
                if(!criterias.getListOfSearchItems()[i].getAsString("itemValueMin").equals("")){
                    itemValueMin = Double.parseDouble( criterias.getListOfSearchItems()[i].getAsString("itemValueMin") );
                }

                Double itemValueMax = 0.0;
                if(!criterias.getListOfSearchItems()[i].getAsString("itemValueMax").equals("")){
                    itemValueMax = Double.parseDouble( criterias.getListOfSearchItems()[i].getAsString("itemValueMax") );
                }

                Criteria c;

                if(itemValueMin==0 || itemValueMin == null || itemValueMin.isNaN()){
                    c = where(itemType).lte(itemValueMax);

                }else if(itemValueMax==0 || itemValueMax == null || itemValueMax.isNaN()){
                    c = where(itemType).gte(itemValueMin);
                }else {

                    c = where(itemType).lte(itemValueMax).gte(itemValueMin);

                    advancedQuery.with(Sort.by(Sort.Direction.DESC, itemType));
                }

                if(itemLogic.equals("AND")){
                    andCriterias.add(c);
                    //bigCriteria.andOperator(c);
                }else{
                    orCriterias.add(c);
                    //bigCriteria.orOperator(c);
                }

            }
        }


        if (!andCriterias.isEmpty()) {
            bigCriteria.andOperator(andCriterias.toArray(new Criteria[andCriterias.size()]));
        }

        if (!orCriterias.isEmpty()) {
            bigCriteria.orOperator(orCriterias.toArray(new Criteria[orCriterias.size()]));
        }
        advancedQuery.addCriteria(bigCriteria);



        advancedQuery = advancedQuery.limit(maxResults);

        System.out.println(advancedQuery);
        result = mongoTemplate.find(advancedQuery , UniqueNaturalProduct.class);

        return result;
    }

}
