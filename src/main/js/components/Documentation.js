import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import ReactMarkdown from "react-markdown";



const React = require("react");

import DocumentationMD from '../../resources/documentation/coconut_general_documentation.md';


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
                    It currently contains 426 895 unique "flat" NPs, and, when available, their known stereochemical forms, literature, organisms that produce them, natural geographical presence and diverse pre-computed molecular properties.
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





                <ReactMarkdown  source={DocumentationMD} />


            </Container>
        );
    }
}