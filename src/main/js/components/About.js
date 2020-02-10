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
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <p>For further information visit the <a href="https://cheminf.uni-jena.de/" ><i>Cheminformatics and Computational Metabolomics</i> homepage</a>.</p>
                </Row>
            </Container>
        );
    }
}