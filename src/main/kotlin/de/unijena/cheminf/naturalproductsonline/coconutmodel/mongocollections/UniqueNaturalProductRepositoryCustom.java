package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import de.unijena.cheminf.naturalproductsonline.model.AdvancedSearchModel;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

public interface UniqueNaturalProductRepositoryCustom {

    //List<UniqueNaturalProduct> fuzzyNameSearch(String name);

    List<UniqueNaturalProduct> advancedSearchWithCriteria (AdvancedSearchModel criterias, Integer maxResults);

    List<UniqueNaturalProduct> similaritySearch(ArrayList<Integer> reqbits, ArrayList<Integer> qfp, Integer qmin, Integer qmax, Integer qn, Double threshold, Integer maxResults );
}
