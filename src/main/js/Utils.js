const OpenChemLib = require("openchemlib/full");

export default class Utils {
    static drawMoleculeBySmiles(smiles) {
        const options = {
            noImplicitAtomLabelColors: true,
            noStereoProblem: true,
            suppressChiralText: true
        };

        let canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 200;

        try {
            const npMolecule = OpenChemLib.Molecule.fromSmiles(smiles);
            OpenChemLib.StructureView.drawMolecule(canvas, npMolecule, options);
            // SVG way; returns a svg-tag
            // OpenChemLib.SVGRenderer.renderMolecule(npMolecule.getIDCode(), 400, 400);
        } catch(e) {
            console.log(e.name + " in OpenChemLib: " + e.message);
        }

        return canvas;
    }

    static getMolfileStringBySmiles(smiles) {
        try {
            const npMolecule = OpenChemLib.Molecule.fromSmiles(smiles);
            console.log(npMolecule.toMolfileV3());
            return npMolecule.toMolfileV3();
        } catch(e) {
            console.log(e.name + " in OpenChemLib: " + e.message);
        }
    }


    static getSDFileStringByNPList(npList){


        let sdfString = "";

        for(let i=0; i<npList.length; i++){
            try {
                const npMolecule = OpenChemLib.Molecule.fromSmiles(npList[i].clean_smiles);
                sdfString+= npMolecule.toMolfileV3();
                sdfString+= "> <coconut_id> \n";
                sdfString+= npList[i].coconut_id +"\n\n";
                sdfString+= "> <SMILES> \n";
                sdfString+= npList[i].clean_smiles +"\n\n";
                sdfString+= "$$$$\n";
            } catch(e) {
                console.log(e.name + " in OpenChemLib: " + e.message);
            }

        }
        return(sdfString);

    }

    static capitalize(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    static objectsAreEqual(o1, o2) {
        const o1props = Object.getOwnPropertyNames(o1);
        const o2props = Object.getOwnPropertyNames(o2);

        if (o1props.length !== o2props.length) {
            return false;
        }

        for (let i = 0; i < o1props.length; i++) {
            let prop = o1props[i];

            if (o1props[prop] !== o2props[prop]) {
                return false;
            }
        }

        return true;
    }

}
