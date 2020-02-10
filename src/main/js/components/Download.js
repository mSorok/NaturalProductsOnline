import Container from 'react-bootstrap/Container'
import Utils from "../Utils";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");


export default class Download extends React.Component {
    render() {
        return (
            <Container>
                <p>You can download the current database revision as SDF file by clicking the button below.</p>
                <Button id="downloadSdfFile" type="primary" href="/download/sdf">
                    <FontAwesomeIcon icon="file-download" fixedWidth/>
                    &nbsp;Download SDF
                </Button>
            </Container>
        );
    }
}