package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import de.unijena.cheminf.naturalproductsonline.model.AdvancedSearchModel;

import java.util.Hashtable;
import java.util.List;

public interface UniqueNaturalProductRepositoryCustom {

    //List<UniqueNaturalProduct> fuzzyNameSearch(String name);

    List<UniqueNaturalProduct> advancedSearchWithCriteria (AdvancedSearchModel criterias);
}
