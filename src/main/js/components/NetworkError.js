import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";

const React = require("react");


export default class NetworkError extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.error("Error: " + this.props.error);

        return (
            <Container>
                <Row className="justify-content-center">
                    <FontAwesomeIcon icon="bug" className="standAloneIcon" size="3x"/>
                </Row>
                <Row className="justify-content-center">
                    <p>Network error occurred, query timed out (please retry later or submit a bigger substructure)</p>
                </Row>
            </Container>
        );
    }
}