import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import HeaderSearchBar from "./HeaderSearchBar";
import HeaderNavBar from "./HeaderNavBar";
import CheminfIcon from "../../../resources/images/cheminf_logo.png";
import Image from "react-bootstrap/Image";

const React = require("react");


export default class Header extends React.Component {
    render() {
        return (
            <Container fluid id="header" className="fixed-top border-bottom">
                <Container>
                    <Row>
                        <Col sm={2} className="align-self-end">
                            <Image id="headerIcon" alt="COCONUT Database Logo" className="img-fluid" src={CheminfIcon}/>
                        </Col>
                        <Col sm={10} className="align-self-end">
                            <HeaderSearchBar/>
                            <HeaderNavBar/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}