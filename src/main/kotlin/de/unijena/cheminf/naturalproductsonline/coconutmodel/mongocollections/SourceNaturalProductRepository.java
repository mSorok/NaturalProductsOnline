package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="source")
public interface SourceNaturalProductRepository extends MongoRepository<SourceNaturalProduct, String>, SourceNaturalProductRepositoryCustom {


    List<SourceNaturalProduct> findBySimpleInchiKey(@Param("inchikey") String inchikey);




}
