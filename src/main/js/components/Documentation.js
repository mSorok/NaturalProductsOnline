import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import ReactMarkdown from "react-markdown";



const React = require("react");

import DocumentationMD from '../../resources/documentation/coconut_general_documentation.md';
import Alert from "react-bootstrap/Alert";


export default class Documentation extends React.Component {


    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <a href="https://cheminf.uni-jena.de/" target="_blank">
                        <Image src="https://cheminf.uni-jena.de/wp-content/uploads/2017/12/cropped-Title_dec_2017.png" fluid/>
                    </a>
                </Row>
                <br/>
                <Row>
                    <p style={{textAlign: "justify"}}>COCONUT (COlleCtion of Open Natural ProdUcTs) Online is an open source project for Natural Products (NPs) storage, search and analysis. It gathers data from over 50 open NP resources and is available free of charge and without any restriction.
                    Each entry corresponds to a "flat" NP structure, and is associated, when available, to their known stereochemical forms, literature, organisms that produce them, natural geographical presence and diverse pre-computed molecular properties.
                    </p>
                    <p style={{textAlign: "justify"}}>The COCONUT logo combines an open coconut with a molecule of 6-Amyl-α-pyrone, a coconut-scented insaturated lactone produced by the Trichodema species (fungi).</p>

                    <p style={{textAlign: "justify"}}> Please submit bug reports, feature requests and general issues through the issues tracker at <a href="https://github.com/mSorok/NaturalProductsOnline/issues" target="_blank">GitHub</a>. </p>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <p>For further information visit the <a href="https://cheminf.uni-jena.de/" target="_blank"><i>Cheminformatics and Computational Metabolomics</i> homepage</a>.</p>
                </Row>

                <Row className="justify-content-center">
                    <p>COCONUT online is part of the <a href="https://naturalproducts.net" target="_blank">Natural Products Portal</a>.</p>
                </Row>

                <Row className="justify-content-center">
                    <p><strong>Updates: March 2021</strong></p>
                    <ul>
                        <li>406 747 unique flat NP in the database</li>
                        <li>More natural products were added from <a href={"https://europepmc.org/article/med/25978395"}  target="_blank" rel="noopener noreferrer">Ayurveda database</a>, <a href={"http://alkamid.ugent.be/alkamidhome.php"}  target="_blank" rel="noopener noreferrer">Alkamid</a>, <a href={"https://www.cmnpd.org/"} target="_blank" rel="noopener noreferrer">CMNPD</a> and <a href={"https://doi.org/10.5281/zenodo.4562688"} target="_blank" rel="noopener noreferrer">CyanoMetDB</a></li>
                        <li>Data from <a href={"https://biofacquim.herokuapp.com/"} target="_blank" rel="noopener noreferrer">BIOFACQUIM</a> and <a href={"https://www.npatlas.org/joomla/"} target="_blank" rel="noopener noreferrer">NP Atlas</a> was updated with it's latest release</li>
                        <li><a target="_blank" rel="noopener noreferrer"  href="http://www.way2drug.com/passonline">PASS</a> bioactivity predictions for natural products have been added</li>
                    </ul>
                </Row>





                <ReactMarkdown  source={DocumentationMD} />


            </Container>
        );
    }
}