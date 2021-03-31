import Container from 'react-bootstrap/Container'
import Utils from "../Utils";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

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

                <Row>
                    <Col>
                <h2>Download COCONUT data</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <i>COCONUT version from March 2020</i>
                    </Col>
                </Row>


                <ColoredLine color="white" />

                <Form.Group>


                <Row>
                    <Col sm={5}>
                        <p>Download Natural Products Structures in SDF format</p>
                    </Col>
                    <Col sm={2}>

                        <Button id="downloadSdfFile" type="primary" href="/download/sdf">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;Download
                        </Button>
                    </Col>
                    <Col sm={2}>&nbsp;</Col>
                </Row>

                <ColoredLine color="white" />



                <Row>
                    <Col sm={5}>
                        <p>Download the complete COCONUT dataset as a MongoDB dump</p>
                    </Col>
                    <Col sm={2}>
                        <Button id="downloadMongoDump" type="primary" href="/download/mongo">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;Download
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button id="downloadMongoDump" type="primary" href="/download/mongoreadme">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;README
                        </Button>
                    </Col>
                </Row>

                <ColoredLine color="white" />

                <Row>
                    <Col sm={5}>
                        <p>Download Natural Products Structures in SMILES format</p>
                    </Col>
                    <Col sm={2}>

                        <Button id="downloadSmilesFile" type="primary" href="/download/smiles">
                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                            &nbsp;Download
                        </Button>
                    </Col>
                    <Col sm={2}>&nbsp;</Col>
                </Row>
                </Form.Group>

            <br/>


            </Container>
        );
    }
}