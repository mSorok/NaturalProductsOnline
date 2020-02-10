package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface FragmentRepository extends MongoRepository<Fragment, String> {

    Fragment findBySignatureAndWithsugar(String signature, Integer withsugar);
}
