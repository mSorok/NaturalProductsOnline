import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fas);

const React = require("react");

export default class NotFound extends React.Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <h1>404 - Something went wrong on our side...</h1>
                </Row>
                <Row className="justify-content-center">
                    <h2>Page Not Found!</h2>
                </Row>
                <br/>
                <LinkContainer to="/">
                    <Row className="justify-content-center">
                        <a>
                            <FontAwesomeIcon icon="arrow-right" className="standAloneIcon" fixedWidth size="2x"/>
                            <FontAwesomeIcon icon="home" className="standAloneIcon" fixedWidth size="2x"/>
                            Go back to the index
                        </a>
                    </Row>
                </LinkContainer>
            </Container>
        );
    }
}