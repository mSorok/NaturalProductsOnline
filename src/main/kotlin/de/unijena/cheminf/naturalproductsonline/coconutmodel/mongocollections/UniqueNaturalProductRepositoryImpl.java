package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import de.unijena.cheminf.naturalproductsonline.model.AdvancedSearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

public class UniqueNaturalProductRepositoryImpl implements UniqueNaturalProductRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public UniqueNaturalProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<UniqueNaturalProduct> advancedSearchWithCriteria(AdvancedSearchModel criterias){

        List<UniqueNaturalProduct> result ;

        Query advancedQuery = new Query();

        Criteria bigCriteria = new Criteria();



        //TODO stuff with triplets from criteria (hashtable like: {"itemType":"molecular_formula","itemValue":"C8H10N4O2","itemLogic":"AND"}

        for(int i=0; i< criterias.getListOfSearchItems().length; i++){

            String itemType = criterias.getListOfSearchItems()[i].getAsString("itemType");
            String itemLogic = criterias.getListOfSearchItems()[i].getAsString("itemLogic");
            String totalItemValue = criterias.getListOfSearchItems()[i].getAsString("itemValue");

            if (itemType.equals("molecular_formula")) {
                //leave value as string

                Criteria c = Criteria.where(itemType).is(totalItemValue);

                if(itemLogic.equals("AND")){
                    bigCriteria.andOperator(c);
                }else{
                    bigCriteria.orOperator(c);
                }


            }//else: do splits and to Float
        }

        advancedQuery.addCriteria(bigCriteria);


        result = mongoTemplate.find(advancedQuery, UniqueNaturalProduct.class);

        return result;
    }


/*
    @Override
    public List<UniqueNaturalProduct> fuzzyNameSearch(String name) {

//TODO aggegation + $text

        List<UniqueNaturalProduct> result =  null;

        return result;
    }
    */
}
