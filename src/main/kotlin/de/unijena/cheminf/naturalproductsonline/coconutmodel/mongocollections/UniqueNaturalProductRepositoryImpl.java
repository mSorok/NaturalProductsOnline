package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public class UniqueNaturalProductRepositoryImpl implements UniqueNaturalProductRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public UniqueNaturalProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
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
