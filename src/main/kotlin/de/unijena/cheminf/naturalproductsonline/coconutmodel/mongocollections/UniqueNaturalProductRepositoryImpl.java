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

        ArrayList<Criteria> andCriterias = new ArrayList<>();
        ArrayList<Criteria> orCriterias = new ArrayList<>();



        for(int i=0; i< criterias.getListOfSearchItems().length; i++) {



            String itemType = criterias.getListOfSearchItems()[i].getAsString("itemType");
            String itemLogic = criterias.getListOfSearchItems()[i].getAsString("itemLogic");


            if (itemType.equals("molecular_formula")) {
                //leave value as string
                String totalItemValue = criterias.getListOfSearchItems()[i].getAsString("itemValue");

                Criteria c = Criteria.where(itemType).is(totalItemValue);

                if (itemLogic.equals("AND")) {
                    andCriterias.add(c);
                    //bigCriteria.andOperator(c);
                } else {
                    orCriterias.add(c);
                    //bigCriteria.orOperator(c);
                }


            }else if(itemType.equals("number_of_rings")){


                Double itemValueMin = 0.0;
                if(!criterias.getListOfSearchItems()[i].getAsString("itemValueMin").equals("")){
                    itemValueMin = Double.parseDouble( criterias.getListOfSearchItems()[i].getAsString("itemValueMin") );
                }

                Double itemValueMax = 0.0;
                if(!criterias.getListOfSearchItems()[i].getAsString("itemValueMax").equals("")){
                    itemValueMax = Double.parseDouble( criterias.getListOfSearchItems()[i].getAsString("itemValueMax") );
                }



                Criteria c1 = Criteria.where("min_number_of_rings").gte(itemValueMin);
                Criteria c2 = Criteria.where("max_number_of_rings").lte(itemValueMax);
                ArrayList<Criteria> cl = new ArrayList<Criteria>();
                cl.add(c1); cl.add(c2);
                Criteria c = new Criteria().andOperator( cl.toArray(new Criteria[cl.size()]) );

                if(itemLogic.equals("AND")){
                    andCriterias.add(c);
                    //bigCriteria.andOperator(c);
                }else{
                    orCriterias.add(c);
                    //bigCriteria.orOperator(c);
                }


            }else if(itemType.equals("contains_sugars")){
                Criteria c = new Criteria();
                Criteria cbis = null;

                if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("any_sugar")){
                    c = Criteria.where("contains_sugar").gt(1);

                }else if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("ring_sugar")){
                    c = Criteria.where("contains_ring_sugars").is(true);

                }else if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("only_ring_sugar")){
                    Criteria c1 = Criteria.where("contains_ring_sugars").is(true);
                    Criteria c2 = Criteria.where("contains_linear_sugars").is(false);

                    ArrayList<Criteria> cl = new ArrayList<Criteria>();
                    cl.add(c1); cl.add(c2);
                    c = new Criteria().andOperator( cl.toArray(new Criteria[cl.size()]) );

                }else if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("linear_sugar")){
                    c = Criteria.where("contains_linear_sugars").is(true);

                }else if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("only_linear_sugar")){
                    Criteria c1 = Criteria.where("contains_ring_sugars").is(false);
                    Criteria c2 = Criteria.where("contains_linear_sugars").is(true);

                    ArrayList<Criteria> cl = new ArrayList<Criteria>();
                    cl.add(c1); cl.add(c2);
                    c = new Criteria().andOperator( cl.toArray(new Criteria[cl.size()]) );

                }else if(criterias.getListOfSearchItems()[i].getAsString("itemValue").equals("no_sugar")){
                    c = Criteria.where("contains_sugar").is(0);
                }

                if(itemLogic.equals("AND")){
                    andCriterias.add(c);
                    if(cbis != null){
                        andCriterias.add(cbis);
                    }
                    //bigCriteria.andOperator(c);
                }else{
                    orCriterias.add(c);
                    if(cbis != null){
                        orCriterias.add(cbis);
                    }
                    //bigCriteria.orOperator(c);
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
                    c = Criteria.where(itemType).lte(itemValueMax);

                }else if(itemValueMax==0 || itemValueMax == null || itemValueMax.isNaN()){
                    c = Criteria.where(itemType).gte(itemValueMin);
                }else {

                    c = Criteria.where(itemType).lte(itemValueMax).gte(itemValueMin);
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



        result = mongoTemplate.find(advancedQuery, UniqueNaturalProduct.class);

        return result;
    }

}
