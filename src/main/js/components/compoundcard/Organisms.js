import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");


export default class  Organisms  extends React.Component {
    render(){



        return (

            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Produced by Organisms</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        {}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}