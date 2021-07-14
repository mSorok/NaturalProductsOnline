import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const React = require("react");


export default class  SourcesList  extends React.Component {
    render() {






        return (
            <Form.Control  as="select" multiple>

                <option value="0">none</option>
                <option value="afrocancer">AfroCancer</option>
                <option value="afrodb">AfroDB</option>
                <option value="afromalariadb">AfroMalariaDB</option>
                <option value="analyticon_all_np">Analyticon NP set</option>
                <option value="ayurveda">Ayurveda</option>
                <option value="biofacquim">BIOFACQUIM</option>
                <option value="bitterdb">BitterDB</option>
                <option value="carotenoids">Carotenoids database</option>
                <option value="chebi_np">ChEBI NP set</option>
                <option value="chembl_np">ChEMBL NP set</option>
                <option value="chemspidernp">ChemSpider NP set</option>
                <option value="cmaup">CMAUP</option>
                <option value="cmnpd">CMNPD</option>
                <option value="conmednp">ConMedNP</option>
                <option value="cyanometdb">CyanoMetDB</option>
                <option value="drugbanknp">DrugBank NP set</option>
                <option value="etmdb">ETM (Ethiopian Traditional Medicine)</option>
                <option value="exposome-explorer">Exposome Explorer NP set</option>
                <option value="fooddb">FooDB</option>
                <option value="gnps">GNPS</option>
                <option value="himdb">HIM</option>
                <option value="hitdb">HIT</option>
                <option value="ibs2019mar_nc">IBS NP set</option>
                <option value="indofinechemical">Indofine Chemical NP set</option>
                <option value="inflamnat">InFlamNat</option>
                <option value="inpacdb">INPAC DB</option>
                <option value="knapsack">KNApSAcK</option>
                <option value="lichendatabase">Lichen Database</option>
                <option value="mitishamba">Mitishamba</option>
                <option value="mnp">MNP (Marine Natural Products)</option>
                <option value="nanpdb">NANPDB</option>
                <option value="ncidb">NCI NP set</option>
                <option value="np_atlas_2019_12">NP Atlas</option>
                <option value="npact">NPACT</option>
                <option value="npass">NPASS</option>
                <option value="npcare">NPCARE</option>
                <option value="npedia">NPEdia</option>
                <option value="nubbe">NuBBE</option>
                <option value="p-anapl">p-ANAPL</option>
                <option value="phenolexplorer">Phenol Explorer</option>
                <option value="pubchem_tested_np">PubChem NP set</option>
                <option value="sancdb">SancDB</option>
                <option value="specsnp">SPECS NP set</option>
                <option value="spektraris">Spektraris</option>
                <option value="streptomedb">StreptomeDB</option>
                <option value="supernatural2">Supernatural II</option>
                <option value="swmd">SWMD (SeaWeed Molecules Database)</option>
                <option value="tcmdb_taiwan">TCM@Taiwan</option>
                <option value="tcmid">TCMid</option>
                <option value="tipdb">TIPdb</option>
                <option value="tppt">TPPT</option>
                <option value="uefs">UEFS</option>
                <option value="unpd">UNPD</option>
                <option value="vietherb">VietHerb</option>
                <option value="zincnp">ZINC NP set</option>
            </Form.Control>

        );
    }
}