package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public class SourceNaturalProductRepositoryImpl implements SourceNaturalProductRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public SourceNaturalProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<Object> findUniqueInchiKeys() {
        return mongoTemplate.query(SourceNaturalProduct.class).distinct("simpleInchiKey").all()  ;
    }


}
