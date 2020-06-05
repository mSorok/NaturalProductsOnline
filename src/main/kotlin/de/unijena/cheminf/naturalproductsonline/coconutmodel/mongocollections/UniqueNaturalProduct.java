package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.javatuples.Pair;
import org.openscience.cdk.fingerprint.IBitFingerprint;
import org.openscience.cdk.fingerprint.ICountFingerprint;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PublicKey;
import java.util.*;

@Document
public class UniqueNaturalProduct {


    @Id
    public String id;

    //@Indexed(name = "coconut_id")
    public String coconut_id;

    public Integer contains_sugar;

    public Integer heavy_atom_number;

    //@Indexed(name = "inchi_index")
    public String inchi;

    //@Indexed(name="inchikey_index")
    public String inchikey;

    //@Indexed(name="smiles_index")
    public String smiles;

    //@Indexed(name="clean_smiles_index")
    public String clean_smiles;

    public String sugar_free_smiles;

    public String deep_smiles = "";


    public Hashtable<String, HashSet<String>> absolute_smiles;

    public String cas;

    public boolean contains_ring_sugars;

    public boolean contains_linear_sugars;



    //@Indexed(name="molecular_formular_index")
    public String molecular_formula;

    public Double molecular_weight;


    public HashSet<String> citationDOI;

    public HashSet<Integer> taxid;

    public HashSet<String> textTaxa;

    public HashSet<String> geoLocation;

    //@Indexed(name = "name_index")
    public String name;

    public Integer nameTrustLevel=0;

    public Integer annotationLevel=0;


    public HashSet<String> synonyms;


    public Double npl_noh_score;

    public Double npl_score;

    public Double npl_sugar_score;

    public Integer number_of_carbons;

    public Integer number_of_nitrogens;

    public Integer number_of_oxygens;

    public Integer number_of_rings;

    public Integer max_number_of_rings;

    public Integer min_number_of_rings;


    public Integer number_repeated_fragments;

    public Integer sugar_free_heavy_atom_number;

    public Integer sugar_free_total_atom_number;

    public Integer total_atom_number;

    public Integer bond_count;

    public HashSet<String> found_in_databases;


    // Molecular fragmentation

    public Hashtable<String, Integer> fragments; //those are Signature Fingerprints (similar to circular fingerprints, with Faulon's representation)

    public Hashtable<String, Integer> fragmentsWithSugar;

    public String murko_framework;

    public Hashtable<String, Integer> ertlFunctionalFragments;
    public Hashtable<String, Integer> ertlFunctionalFragmentsPseudoSmiles;



    public ArrayList<Integer> pubchemFingerprint;

    public ArrayList<Integer> circularFingerprint;

    public ArrayList<Integer> substructureFingerprint;

    public ArrayList<Integer> extendedFingerprint;

    public byte[] pubchemBits;
    public String pubchemBitsString;






    // Symmetry measures
    //TODO later


    // Molecular descriptors

    //AlogP
    public Double alogp;
    public Double alogp2;
    public Double amralogp;

    //Sum of the atomic polarizabilities (including implicit hydrogens).
    public Double apol;


    //Eigenvalue based descriptor noted for its utility in chemical diversity.
    public ArrayList<Double> bcutDescriptor;

    //Sum of the absolute value of the difference between atomic polarizabilities of all bonded atoms in the molecule (including implicit hydrogens) with polarizabilities taken from http://www.sunysccc.edu/academic/mst/ptable/p-table2.htm This descriptor assumes 2-centered bonds.
    public Double bpol;

    //A topological descriptor combining distance and adjacency information.
    public Integer eccentricConnectivityIndexDescriptor;

    //FMF descriptor characterizing complexity of a molecule. The descriptor is described in (Yang, Y. et. al.. J. Med. Chem.. 2010. ASAP) and is an approach to characterizing molecular complexity based on the Murcko framework present in the molecule.
    public Double fmfDescriptor;

    //This descriptor is characterizing non-flatness of a molecule.
    public Double fsp3;

    //Class that returns the complexity of a system. The complexity is defined as (Nilakantan, R. et. al.. Journal of chemical information and modeling. 2006. 46)
    public Double fragmentComplexityDescriptor;


    public Double gravitationalIndexHeavyAtoms;

    //This descriptor calculates the number of hydrogen bond acceptors using a slightly simplified version of the PHACIR atom types.
    public Integer hBondAcceptorCount;

    //This descriptor calculates the number of hydrogen bond donors using a slightly simplified version of the PHACIR atom types.
    public Integer hBondDonorCount;

    //reports the fraction of sp3 carbons to sp2 carbons. Note that it only considers carbon atoms and rather than use a simple ratio it reports the value of Nsp3/ (Nsp3 + Nsp2). The original form of the descriptor (i.e., simple ratio) has been used to characterize molecular complexity, especially in the are of natural products , which usually have a high value of the sp3 to sp2 ratio.
    public Double hybridizationRatioDescriptor;

    //Kier and Hall kappa molecular shape indices compare the molecular graph with minimal and maximal molecular graphs; a description is given at: http://www.chemcomp.com/Journal_of_CCG/Features/descr.htm#KH : "they are intended to capture different aspects of molecular shape.
    public Double kappaShapeIndex1;
    public Double kappaShapeIndex2;
    public Double kappaShapeIndex3;

    //Prediction of logP based on the number of carbon and hetero atoms. The implemented equation was proposed in (Mannhold, R. et. al.. J.Pharm.Sci.. 2009. 98).
    public Double manholdlogp;

    //According to the Petitjean definition, the eccentricity of a vertex corresponds to the distance from that vertex to the most remote vertex in the graph. The distance is obtained from the distance matrix as the count of edges between the two vertices.
    public Double petitjeanNumber;

    //Evaluates the Petitjean shape indices, These original Petitjean number was described by Petitjean (( Petitjean, M. . Journal of Chemical Information and Computer Science. 1992. 32)) and considered the molecular graph. This class also implements the geometric analog of the topological shape index described by Bath et al (( Bath, P.A. et. al.. Journal of Chemical Information and Computer Science. 1995. 35)).
    public Double petitjeanShapeTopo;
    public Double petitjeanShapeGeom;

    //number of failures in the lipinski rule of 5
    public Integer lipinskiRuleOf5Failures;

    //number of small rings (3 to 9) through a descriptor
    //public Integer numberSmallRingsDescriptor;

    public Integer numberSpiroAtoms;

    //Volume descriptor using the method implemented in the VABCVolume class.
    public Double vabcDescriptor;

    //Vertex adjacency information (magnitude): 1 + log2 m where m is the number of heavy-heavy bonds. If m is zero, then zero is returned. (definition from MOE tutorial on line)
    public Double vertexAdjMagnitude;

    public Double weinerPathNumber;
    public Double weinerPolarityNumber;

    //Prediction of logP based on the atom-type method called XLogP. Requires all hydrogens to be explicit.
    public Double xlogp;


    //Zagreb index: the sum of the squares of atom degree over all heavy atoms i
    public Double zagrebIndex;

    //Calculation of topological polar surface area based on fragment contributions (TPSA) (Ertl, P. et. al.. J. Med. Chem.. 2000. 43).
    public Double topoPSA;

    //Polar surface area expressed as a ratio to molecular size. Calculates tpsaEfficiency, which is to TPSADescriptor / molecular weight, in units of square Angstroms per Dalton. Other related descriptors may also be useful to add, e.g. ratio of polar to hydrophobic surface area.
    public Double tpsaEfficiency;



    public UniqueNaturalProduct(){
        this.fragments = new Hashtable<>();
        this.fragmentsWithSugar = new Hashtable<>();
        this.ertlFunctionalFragments = new Hashtable<>();
    }


    public void addFragment(String f, Integer nbInMolecule){
        fragments.put(f, nbInMolecule);
    }


    public void addFragmentWithSugar(String f, Integer nbInMolecule){
        fragmentsWithSugar.put(f, nbInMolecule);
    }






    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getContains_sugar() {
        return contains_sugar;
    }

    public void setContains_sugar(Integer contains_sugar) {
        this.contains_sugar = contains_sugar;
    }

    public Integer getHeavy_atom_number() {
        return heavy_atom_number;
    }

    public void setHeavy_atom_number(Integer heavy_atom_number) {
        this.heavy_atom_number = heavy_atom_number;
    }

    public String getInchi() {
        return inchi;
    }

    public void setInchi(String inchi) {
        this.inchi = inchi;
    }

    public String getInchikey() {
        return inchikey;
    }

    public void setInchikey(String inchikey) {
        this.inchikey = inchikey;
    }

    public String getSmiles() {
        return smiles;
    }

    public void setSmiles(String smiles) {
        this.smiles = smiles;
    }

    public String getMolecular_formula() {
        return molecular_formula;
    }

    public void setMolecular_formula(String molecular_formula) {
        this.molecular_formula = molecular_formula;
    }

    public Double getMolecular_weight() {
        return molecular_weight;
    }

    public void setMolecular_weight(Double molecular_weight) {
        this.molecular_weight = molecular_weight;
    }

    public Double getNpl_noh_score() {
        return npl_noh_score;
    }

    public void setNpl_noh_score(Double npl_noh_score) {
        this.npl_noh_score = npl_noh_score;
    }

    public Double getNpl_score() {
        return npl_score;
    }

    public void setNpl_score(Double npl_score) {
        this.npl_score = npl_score;
    }

    public Double getNpl_sugar_score() {
        return npl_sugar_score;
    }

    public void setNpl_sugar_score(Double npl_sugar_score) {
        this.npl_sugar_score = npl_sugar_score;
    }

    public Integer getNumber_of_carbons() {
        return number_of_carbons;
    }

    public void setNumber_of_carbons(Integer number_of_carbons) {
        this.number_of_carbons = number_of_carbons;
    }

    public Integer getNumber_of_nitrogens() {
        return number_of_nitrogens;
    }

    public void setNumber_of_nitrogens(Integer number_of_nitrogens) {
        this.number_of_nitrogens = number_of_nitrogens;
    }

    public Integer getNumber_of_oxygens() {
        return number_of_oxygens;
    }

    public void setNumber_of_oxygens(Integer number_of_oxygens) {
        this.number_of_oxygens = number_of_oxygens;
    }


    public Integer getMax_number_of_rings() {
        return max_number_of_rings;
    }

    public void setMax_number_of_rings(Integer max_number_of_rings) {
        this.max_number_of_rings = max_number_of_rings;
    }

    public Integer getMin_number_of_rings() {
        return min_number_of_rings;
    }

    public void setMin_number_of_rings(Integer min_number_of_rings) {
        this.min_number_of_rings = min_number_of_rings;
    }

    public Integer getNumber_repeated_fragments() {
        return number_repeated_fragments;
    }

    public void setNumber_repeated_fragments(Integer number_repeated_fragments) {
        this.number_repeated_fragments = number_repeated_fragments;
    }

    public Integer getSugar_free_heavy_atom_number() {
        return sugar_free_heavy_atom_number;
    }

    public void setSugar_free_heavy_atom_number(Integer sugar_free_heavy_atom_number) {
        this.sugar_free_heavy_atom_number = sugar_free_heavy_atom_number;
    }

    public Integer getSugar_free_total_atom_number() {
        return sugar_free_total_atom_number;
    }

    public void setSugar_free_total_atom_number(Integer sugar_free_total_atom_number) {
        this.sugar_free_total_atom_number = sugar_free_total_atom_number;
    }

    public Integer getTotal_atom_number() {
        return total_atom_number;
    }

    public void setTotal_atom_number(Integer total_atom_number) {
        this.total_atom_number = total_atom_number;
    }



    public void setBond_count(Integer bond_count) {
        this.bond_count = bond_count;
    }


    public Integer getBond_count() {
        return bond_count;
    }

    public Hashtable<String, Integer> getFragments() {
        return fragments;
    }

    public void setFragments(Hashtable<String, Integer> fragments) {
        this.fragments = fragments;
    }

    public Hashtable<String, Integer> getFragmentsWithSugar() {
        return fragmentsWithSugar;
    }

    public void setFragmentsWithSugar(Hashtable<String, Integer> fragmentsWithSugar) {
        this.fragmentsWithSugar = fragmentsWithSugar;
    }

    public Double getAlogp() {
        return alogp;
    }

    public void setAlogp(Double alogp) {
        this.alogp = alogp;
    }

    public Double getAlogp2() {
        return alogp2;
    }

    public void setAlogp2(Double alogp2) {
        this.alogp2 = alogp2;
    }

    public Double getAmralogp() {
        return amralogp;
    }

    public void setAmralogp(Double amralogp) {
        this.amralogp = amralogp;
    }

    public Double getApol() {
        return apol;
    }

    public void setApol(Double apol) {
        this.apol = apol;
    }

    public ArrayList<Double> getBcutDescriptor() {
        return bcutDescriptor;
    }

    public void setBcutDescriptor(ArrayList<Double> bcutDescriptor) {
        this.bcutDescriptor = bcutDescriptor;
    }

    public Double getBpol() {
        return bpol;
    }

    public void setBpol(Double bpol) {
        this.bpol = bpol;
    }

    public Integer getEccentricConnectivityIndexDescriptor() {
        return eccentricConnectivityIndexDescriptor;
    }

    public void setEccentricConnectivityIndexDescriptor(Integer eccentricConnectivityIndexDescriptor) {
        this.eccentricConnectivityIndexDescriptor = eccentricConnectivityIndexDescriptor;
    }

    public Double getFmfDescriptor() {
        return fmfDescriptor;
    }

    public void setFmfDescriptor(Double fmfDescriptor) {
        this.fmfDescriptor = fmfDescriptor;
    }

    public Double getFsp3() {
        return fsp3;
    }

    public void setFsp3(Double fsp3) {
        this.fsp3 = fsp3;
    }

    public Double getFragmentComplexityDescriptor() {
        return fragmentComplexityDescriptor;
    }

    public void setFragmentComplexityDescriptor(Double fragmentComplexityDescriptor) {
        this.fragmentComplexityDescriptor = fragmentComplexityDescriptor;
    }

    public Double getGravitationalIndexHeavyAtoms() {
        return gravitationalIndexHeavyAtoms;
    }

    public void setGravitationalIndexHeavyAtoms(Double gravitationalIndexHeavyAtoms) {
        this.gravitationalIndexHeavyAtoms = gravitationalIndexHeavyAtoms;
    }

    public Integer gethBondAcceptorCount() {
        return hBondAcceptorCount;
    }

    public void sethBondAcceptorCount(Integer hBondAcceptorCount) {
        this.hBondAcceptorCount = hBondAcceptorCount;
    }

    public Integer gethBondDonorCount() {
        return hBondDonorCount;
    }

    public void sethBondDonorCount(Integer hBondDonorCount) {
        this.hBondDonorCount = hBondDonorCount;
    }

    public Double getHybridizationRatioDescriptor() {
        return hybridizationRatioDescriptor;
    }

    public void setHybridizationRatioDescriptor(Double hybridizationRatioDescriptor) {
        this.hybridizationRatioDescriptor = hybridizationRatioDescriptor;
    }

    public Double getKappaShapeIndex1() {
        return kappaShapeIndex1;
    }

    public void setKappaShapeIndex1(Double kappaShapeIndex1) {
        this.kappaShapeIndex1 = kappaShapeIndex1;
    }

    public Double getKappaShapeIndex2() {
        return kappaShapeIndex2;
    }

    public void setKappaShapeIndex2(Double kappaShapeIndex2) {
        this.kappaShapeIndex2 = kappaShapeIndex2;
    }

    public Double getKappaShapeIndex3() {
        return kappaShapeIndex3;
    }

    public void setKappaShapeIndex3(Double kappaShapeIndex3) {
        this.kappaShapeIndex3 = kappaShapeIndex3;
    }

    public Double getManholdlogp() {
        return manholdlogp;
    }

    public void setManholdlogp(Double manholdlogp) {
        this.manholdlogp = manholdlogp;
    }

    public Double getPetitjeanNumber() {
        return petitjeanNumber;
    }

    public void setPetitjeanNumber(Double petitjeanNumber) {
        this.petitjeanNumber = petitjeanNumber;
    }

    public Double getPetitjeanShapeTopo() {
        return petitjeanShapeTopo;
    }

    public void setPetitjeanShapeTopo(Double petitjeanShapeTopo) {
        this.petitjeanShapeTopo = petitjeanShapeTopo;
    }

    public Double getPetitjeanShapeGeom() {
        return petitjeanShapeGeom;
    }

    public void setPetitjeanShapeGeom(Double petitjeanShapeGeom) {
        this.petitjeanShapeGeom = petitjeanShapeGeom;
    }

    public Integer getLipinskiRuleOf5Failures() {
        return lipinskiRuleOf5Failures;
    }

    public void setLipinskiRuleOf5Failures(Integer lipinskiRuleOf5Failures) {
        this.lipinskiRuleOf5Failures = lipinskiRuleOf5Failures;
    }

    /*public Integer getNumberSmallRingsDescriptor() {
        return numberSmallRingsDescriptor;
    }

    public void setNumberSmallRingsDescriptor(Integer numberSmallRingsDescriptor) {
        this.numberSmallRingsDescriptor = numberSmallRingsDescriptor;
    }*/

    public Integer getNumberSpiroAtoms() {
        return numberSpiroAtoms;
    }

    public void setNumberSpiroAtoms(Integer numberSpiroAtoms) {
        this.numberSpiroAtoms = numberSpiroAtoms;
    }

    public Double getVabcDescriptor() {
        return vabcDescriptor;
    }

    public void setVabcDescriptor(Double vabcDescriptor) {
        this.vabcDescriptor = vabcDescriptor;
    }

    public Double getVertexAdjMagnitude() {
        return vertexAdjMagnitude;
    }

    public void setVertexAdjMagnitude(Double vertexAdjMagnitude) {
        this.vertexAdjMagnitude = vertexAdjMagnitude;
    }

    public Double getWeinerPathNumber() {
        return weinerPathNumber;
    }

    public void setWeinerPathNumber(Double weinerPathNumber) {
        this.weinerPathNumber = weinerPathNumber;
    }

    public Double getWeinerPolarityNumber() {
        return weinerPolarityNumber;
    }

    public void setWeinerPolarityNumber(Double weinerPolarityNumber) {
        this.weinerPolarityNumber = weinerPolarityNumber;
    }

    public Double getXlogp() {
        return xlogp;
    }

    public void setXlogp(Double xlogp) {
        this.xlogp = xlogp;
    }

    public Double getZagrebIndex() {
        return zagrebIndex;
    }

    public void setZagrebIndex(Double zagrebIndex) {
        this.zagrebIndex = zagrebIndex;
    }

    public Double getTopoPSA() {
        return topoPSA;
    }

    public void setTopoPSA(Double topoPSA) {
        this.topoPSA = topoPSA;
    }

    public Double getTpsaEfficiency() {
        return tpsaEfficiency;
    }

    public void setTpsaEfficiency(Double tpsaEfficiency) {
        this.tpsaEfficiency = tpsaEfficiency;
    }

    public String getClean_smiles() {
        return clean_smiles;
    }

    public void setClean_smiles(String clean_smiles) {
        this.clean_smiles = clean_smiles;
    }


    public HashSet<String> getCitationDOI() {
        return citationDOI;
    }

    public void setCitationDOI(HashSet<String> citationDOI) {
        this.citationDOI = citationDOI;
    }

    public HashSet<Integer> getTaxid() {
        return taxid;
    }

    public void setTaxid(HashSet<Integer> taxid) {
        this.taxid = taxid;
    }

    public HashSet<String> getGeoLocation() {
        return geoLocation;
    }

    public void setGeoLocation(HashSet<String> geoLocation) {
        this.geoLocation = geoLocation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public HashSet<String> getTextTaxa() {
        return textTaxa;
    }

    public void setTextTaxa(HashSet<String> textTaxa) {
        this.textTaxa = textTaxa;
    }

    public HashSet<String> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(HashSet<String> synonyms) {
        this.synonyms = synonyms;
    }

    public String getCoconut_id() {
        return coconut_id;
    }

    public void setCoconut_id(String coconut_id) {
        this.coconut_id = coconut_id;
    }

    public String getSugar_free_smiles() {
        return sugar_free_smiles;
    }

    public void setSugar_free_smiles(String sugar_free_smiles) {
        this.sugar_free_smiles = sugar_free_smiles;
    }

    public boolean getContains_ring_sugars() {
        return contains_ring_sugars;
    }

    public void setContains_ring_sugars(boolean contains_ring_sugars) {
        this.contains_ring_sugars = contains_ring_sugars;
    }

    public boolean getContains_linear_sugars() {
        return contains_linear_sugars;
    }

    public void setContains_linear_sugars(boolean contains_linear_sugars) {
        this.contains_linear_sugars = contains_linear_sugars;
    }

    public String getMurko_framework() {
        return murko_framework;
    }

    public void setMurko_framework(String murko_framework) {
        this.murko_framework = murko_framework;
    }


    public HashSet<String> getFound_in_databases() {
        return found_in_databases;
    }

    public void setFound_in_databases(HashSet<String> found_in_databases) {
        this.found_in_databases = found_in_databases;
    }

    public Hashtable<String, Integer> getErtlFunctionalFragments() {
        return ertlFunctionalFragments;
    }

    public void setErtlFunctionalFragments(Hashtable<String, Integer> ertlFunctionalFragments) {
        this.ertlFunctionalFragments = ertlFunctionalFragments;
    }

    public Hashtable<String, Integer> getErtlFunctionalFragmentsPseudoSmiles() {
        return ertlFunctionalFragmentsPseudoSmiles;
    }

    public void setErtlFunctionalFragmentsPseudoSmiles(Hashtable<String, Integer> ertlFunctionalFragmentsPseudoSmiles) {
        this.ertlFunctionalFragmentsPseudoSmiles = ertlFunctionalFragmentsPseudoSmiles;
    }

    public Hashtable<String, HashSet<String>> getAbsolute_smiles() {
        return absolute_smiles;
    }

    public void setAbsolute_smiles(Hashtable<String, HashSet<String>> absolute_smiles) {
        this.absolute_smiles = absolute_smiles;
    }

    public ArrayList<Integer> getPubchemFingerprint() {
        return pubchemFingerprint;
    }

    public void setPubchemFingerprint(ArrayList<Integer> pubchemFingerprint) {
        this.pubchemFingerprint = pubchemFingerprint;
    }



    public ArrayList<Integer> getSubstructureFingerprint() {
        return substructureFingerprint;
    }

    public void setSubstructureFingerprint(ArrayList<Integer> substructureFingerprint) {
        this.substructureFingerprint = substructureFingerprint;
    }

    public String getDeep_smiles() {
        return deep_smiles;
    }

    public void setDeep_smiles(String deep_smiles) {
        this.deep_smiles = deep_smiles;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public ArrayList<Integer> getExtendedFingerprint() {
        return extendedFingerprint;
    }

    public void setExtendedFingerprint(ArrayList<Integer> extendedFingerprint) {
        this.extendedFingerprint = extendedFingerprint;
    }



    public byte[] getPubchemBits() {
        return pubchemBits;
    }

    public void setPubchemBits(byte[] pubchemBits) {
        this.pubchemBits = pubchemBits;
    }



    public String getPubchemBitsString() {
        return pubchemBitsString;
    }

    public void setPubchemBitsString(String pubchemBitsString) {
        this.pubchemBitsString = pubchemBitsString;
    }


    public ArrayList<Integer> getCircularFingerprint() {
        return circularFingerprint;
    }

    public void setCircularFingerprint(ArrayList<Integer> circularFingerprint) {
        this.circularFingerprint = circularFingerprint;
    }

    public boolean isContains_ring_sugars() {
        return contains_ring_sugars;
    }

    public boolean isContains_linear_sugars() {
        return contains_linear_sugars;
    }

    public Integer getNameTrustLevel() {
        return nameTrustLevel;
    }

    public void setNameTrustLevel(Integer nameTrustLevel) {
        this.nameTrustLevel = nameTrustLevel;
    }

    public Integer getNumber_of_rings() {
        return number_of_rings;
    }

    public void setNumber_of_rings(Integer number_of_rings) {
        this.number_of_rings = number_of_rings;
    }

    public Integer getAnnotationLevel() {
        return annotationLevel;
    }

    public void setAnnotationLevel(Integer annotationLevel) {
        this.annotationLevel = annotationLevel;
    }
}
