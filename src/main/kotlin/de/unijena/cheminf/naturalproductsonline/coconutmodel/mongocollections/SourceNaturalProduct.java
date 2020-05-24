package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;


@Document
public class SourceNaturalProduct {

    @Id
    public String id;

    //@Indexed(name = "source_index")
    public String source;

    public String originalSmiles;

    public String simpleSmiles;

    public String absoluteSmiles;

    public String originalInchi;

    public String originalInchiKey;

    //@Indexed(name = "simpleinchi_index")
    public String simpleInchi;

    //@Indexed(name = "simpleinchikey_index")
    public String simpleInchiKey;

    public Integer heavyAtomNumber;

    public Integer totalAtomNumber;

    public String idInSource;

    public String comment;

    public String acquisition_date;

    public UniqueNaturalProduct uniqueNaturalProduct;

    public ArrayList<String> citation;

    public ArrayList<Integer> taxid;

    public ArrayList<String> organismText;

    public String continent;

    public ArrayList<String> geographicLocation;

    public String name;

    public ArrayList<String> synonyms;


    //Constructor
    public SourceNaturalProduct() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getOriginalSmiles() {
        return originalSmiles;
    }

    public void setOriginalSmiles(String originalSmiles) {
        this.originalSmiles = originalSmiles;
    }

    public String getSimpleSmiles() {
        return simpleSmiles;
    }

    public void setSimpleSmiles(String simpleSmiles) {
        this.simpleSmiles = simpleSmiles;
    }

    public String getOriginalInchi() {
        return originalInchi;
    }

    public void setOriginalInchi(String originalInchi) {
        this.originalInchi = originalInchi;
    }

    public String getOriginalInchiKey() {
        return originalInchiKey;
    }

    public void setOriginalInchiKey(String originalInchiKey) {
        this.originalInchiKey = originalInchiKey;
    }

    public String getSimpleInchi() {
        return simpleInchi;
    }

    public void setSimpleInchi(String simpleInchi) {
        this.simpleInchi = simpleInchi;
    }

    public String getSimpleInchiKey() {
        return simpleInchiKey;
    }

    public void setSimpleInchiKey(String simpleInchiKey) {
        this.simpleInchiKey = simpleInchiKey;
    }

    public Integer getHeavyAtomNumber() {
        return heavyAtomNumber;
    }

    public void setHeavyAtomNumber(Integer heavyAtomNumber) {
        this.heavyAtomNumber = heavyAtomNumber;
    }

    public Integer getTotalAtomNumber() {
        return totalAtomNumber;
    }

    public void setTotalAtomNumber(Integer totalAtomNumber) {
        this.totalAtomNumber = totalAtomNumber;
    }

    public String getIdInSource() {
        return idInSource;
    }

    public void setIdInSource(String idInSource) {
        this.idInSource = idInSource;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    public String getAcquisition_date() {
        return acquisition_date;
    }

    public void setAcquisition_date(String acquisition_date) {
        this.acquisition_date = acquisition_date;
    }

    public UniqueNaturalProduct getUniqueNaturalProduct() {
        return uniqueNaturalProduct;
    }

    public void setUniqueNaturalProduct(UniqueNaturalProduct uniqueNaturalProduct) {
        this.uniqueNaturalProduct = uniqueNaturalProduct;
    }

    public ArrayList<String> getCitation() {
        return citation;
    }

    public void setCitation(ArrayList<String> citation) {
        this.citation = citation;
    }

    public ArrayList<Integer> getTaxid() {
        return taxid;
    }

    public void setTaxid(ArrayList<Integer> taxid) {
        this.taxid = taxid;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public ArrayList<String> getOrganismText() {
        return organismText;
    }

    public void setOrganismText(ArrayList<String> organismText) {
        this.organismText = organismText;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<String> getSynonyms() {
        return synonyms;
    }

    public void setSynonyms(ArrayList<String> synonyms) {
        this.synonyms = synonyms;
    }

    public ArrayList<String> getGeographicLocation() {
        return geographicLocation;
    }

    public void setGeographicLocation(ArrayList<String> geographicLocation) {
        this.geographicLocation = geographicLocation;
    }

    public String getAbsoluteSmiles() {
        return absoluteSmiles;
    }

    public void setAbsoluteSmiles(String absoluteSmiles) {
        this.absoluteSmiles = absoluteSmiles;
    }
}