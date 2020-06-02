import Container from 'react-bootstrap/Container'
import Utils from "../Utils";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const React = require("react");

const ColoredLine = ({ color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);


export default class Download extends React.Component {




    render() {
        return (
            <Container>

                <Row class = "my-3 w-75">
                    <Col>
                <h2>Download COCONUT data</h2>
                    </Col>
                </Row>


                <Row lg={1} md={2}>
                    <Col>
                        <p>Download Natural Products Structures in SDF format</p>
                    </Col>
                    <Col>

                        <Button id="downloadSdfFile" type="primary" href="/download/sdf">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;Download
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>



                <Row lg={1} md={2}>
                    <Col>
                        <p>Download the complete COCONUT dataset as a MongoDB dump</p>
                    </Col>
                    <Col>
                        <Button id="downloadMongoDump" type="primary" href="/download/mongo">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;Download
                        </Button>
                    </Col>
                    <Col>
                        <Button id="downloadMongoDump" type="primary" href="/download/mongoreadme">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;README
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}