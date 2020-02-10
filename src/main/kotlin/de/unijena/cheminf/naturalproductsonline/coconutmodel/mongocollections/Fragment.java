package de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document
public class Fragment {

    @Id
    public String id;

    public Integer withsugar;

    //@Indexed(name = "signature_index")
    public String signature;

    public Integer height;

    public Double scorenp;

    public ArrayList<UniqueNaturalProduct> presentInMolecules;


    public Fragment(){
        this.presentInMolecules = new ArrayList<>();
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getWith_sugar() {
        return withsugar;
    }

    public void setWith_sugar(Integer with_sugar) {
        this.withsugar = with_sugar;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Double getScorenp() {
        return scorenp;
    }

    public void setScorenp(Double scorenp) {
        this.scorenp = scorenp;
    }

    public ArrayList<UniqueNaturalProduct> getPresentInMolecules() {
        return presentInMolecules;
    }

    public void setPresentInMolecules(ArrayList<UniqueNaturalProduct> presentInMolecules) {
        this.presentInMolecules = presentInMolecules;
    }

    public void addUniqueNaturalProduct(UniqueNaturalProduct unp){
        this.presentInMolecules.add(unp);
    }


}
