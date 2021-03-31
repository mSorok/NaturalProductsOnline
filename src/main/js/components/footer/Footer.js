import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NPIcon from "../../../resources/images/NP3_S.png";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";

const React = require("react");


export default class Footer extends React.Component {
    render() {
        return (
            <Container fluid id="footer" className="sticky-bottom border-top">
                <Container className="align-content-center text-muted">

                    <Row>

                        <Col sm={1} className="align-content-center">
                            <a href="https://naturalproducts.net" target="_blank"><Image id="headerIcon" alt="Natural Products portal" className="img-fluid" src={NPIcon}/></a>
                        </Col>

                        <Col sm={10} className="align-justify-self-end">

                            <p style={{textAlign: "justify"}}>COCONUT and Natural Products Online is an open-source open-data portal for natural products cheminformatics. Please submit bug reports, feature requests and general issues through <a target="_blank" rel="noopener noreferrer"  href="https://github.com/mSorok/NaturalProductsOnline/issues">the issues tracker at GitHub</a> or directly by mail to maria.sorokina[@]uni-jena.de.
                                COCONUT and Natural Products Online are developed and maintained by the <a target="_blank" rel="noopener noreferrer"  href="https://cheminf.uni-jena.de">Steinbeck group</a> at the University Friedrich-Schiller in Jena, Germany.
                                The code for this web application is released under the MIT license. Copyright &copy; CC-BY-SA 2021</p>

                        </Col>
                    </Row>
                </Container>

            </Container>
        )
    }
}