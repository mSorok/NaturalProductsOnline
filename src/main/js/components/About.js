import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const React = require("react");

export default class About extends React.Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <a href="https://cheminf.uni-jena.de/">
                        <Image src="https://cheminf.uni-jena.de/wp-content/uploads/2017/12/cropped-Title_dec_2017.png" fluid/>
                    </a>
                </Row>
                <br/>
                <Row>
                    <p>Natural Products Online is an open source project for Natural Products (NPs) storage, search and analysis. The present version hosts COCONUT, the
                        COlleCtion of Open Natural ProdUcTs, one of the biggest and best annotated resources for NPs available free of charge and without any restriction.
                    </p>
                    <p>The COCONUT logo shows the 6-Amyl-α-pyrone, a coconut-scented insaturated lactone produced by the Trichodema species (fungi).</p>

                    <p> Please submit bug reports, feature requests and general issues through the issues tracker at <a href="https://github.com/mSorok/NaturalProductsOnline/issues" target="_blank">GitHub</a>. </p>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <p>For further information visit the <a href="https://cheminf.uni-jena.de/" target="_blank"><i>Cheminformatics and Computational Metabolomics</i> homepage</a>.</p>
                </Row>
            </Container>
        );
    }
}