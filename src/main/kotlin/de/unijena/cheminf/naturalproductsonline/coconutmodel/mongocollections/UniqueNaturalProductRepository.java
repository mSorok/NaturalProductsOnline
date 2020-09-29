package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="compound")
public interface UniqueNaturalProductRepository  extends MongoRepository<UniqueNaturalProduct, String>, UniqueNaturalProductRepositoryCustom{

    public List<UniqueNaturalProduct> findBySmiles(String smiles);

    public List<UniqueNaturalProduct> findByInchi(String inchi);

    public List<UniqueNaturalProduct> findByInchikey(String inchikey);

    public List<UniqueNaturalProduct> findAllByOrderByAnnotationLevelDesc();

    @Query("{ coconut_id : ?0}")
    public List<UniqueNaturalProduct> findByCoconut_id(String coconut_id);

    @Query("{ clean_smiles : ?0}")
    public List<UniqueNaturalProduct> findByClean_smiles(String clean_smiles);

    @Query("{ unique_smiles : ?0}")
    public List<UniqueNaturalProduct> findByUnique_smiles(String unique_smiles);

    @Query("{molecular_formula : ?0}")
    public List<UniqueNaturalProduct> findByMolecular_formula(String molecular_formula);

    public List<UniqueNaturalProduct> findByName(String name);


    @Query("{molecular_weight : ?0}")
    public List<UniqueNaturalProduct> findByMolecular_weight(String weight);


    @Query("{ $text: { $search: ?0 } }")
    public List<UniqueNaturalProduct> fuzzyNameSearch(String name);


    @Query("{ npl_noh_score: { $exists:false } }")
    List<UniqueNaturalProduct> findAllByNPLScoreComputed();

    @Query("{ apol: { $exists:false } }")
    List<UniqueNaturalProduct> findAllByApolComputed();

    @Query(value="{ pubchemBits : { $bitsAllSet : ?0  }}", fields = "{ _id:0,coconut_id: 1, unique_smiles:1, clean_smiles:1, molecular_formula:1, molecular_weight:1, npl_score:1 , name:1, smiles:1, total_atom_number:1}" )
    List<UniqueNaturalProduct> findAllPubchemBitsSet(byte[] querybits) ;
    //  'coconut_id': 1, 'unique_smiles':1, 'clean_smiles':1, 'molecular_formula':1, 'molecular_weight':1, 'npl_score':1 , 'name':1, 'smiles':1


    @Query("{ $or: [ {chemicalClass: ?0}, {chemicalSubClass: ?0}, {chemicalSuperClass: ?0}, {directParentClassification: ?0}  ] }")
    List<UniqueNaturalProduct> findByChemclass(String query);
}
