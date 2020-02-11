package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="compound")
public interface UniqueNaturalProductRepository  extends MongoRepository<UniqueNaturalProduct, String> {

    public List<UniqueNaturalProduct> findBySmiles(String smiles);

    public List<UniqueNaturalProduct> findByInchi(String inchi);

    public List<UniqueNaturalProduct> findByInchikey(String inchikey);

    @Query("{ clean_smiles : ?0}")
    public List<UniqueNaturalProduct> findByClean_smiles(String clean_smiles);

    @Query("{molecular_formula : ?0}")
    public List<UniqueNaturalProduct> findByMolecular_formula(String molecular_formula);

    //todo add find by molecular weight



    @Query("{ npl_noh_score: { $exists:false } }")
    List<UniqueNaturalProduct> findAllByNPLScoreComputed();

    @Query("{ apol: { $exists:false } }")
    List<UniqueNaturalProduct> findAllByApolComputed();
}
