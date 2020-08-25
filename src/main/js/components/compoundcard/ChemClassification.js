import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");


export default class ChemClassification extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;


        let classTable = [];

        if (naturalProduct.chemicalSuperClass == "" && naturalProduct.chemicalClass == "" && naturalProduct.chemicalSubClass=="" && naturalProduct.directParentClassification =="") {

            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Chemical classification</Card.Title>
                        <Card.Subtitle><FontAwesomeIcon icon="info" fixedWidth/>Computed with <a target="_blank" rel="noopener noreferrer"  href="http://classyfire.wishartlab.com/">ClassyFire</a></Card.Subtitle>
                        <br />
                        <p>No chemical classification seems to exist for this compound</p>
                    </Card.Body>
                </Card>
            );
        } else {



            if (naturalProduct.chemicalSuperClass != "") {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Super class</td>
                        <td>{naturalProduct.chemicalSuperClass}</td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Super class</td>
                        <td>No known superclass</td>
                    </tr>
                );
            }


            //TODO links to the API to retrieve all with this classification
            if (naturalProduct.chemicalClass != "") {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Class</td>
                        <td>{naturalProduct.chemicalClass}</td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Class</td>
                        <td>No known class</td>
                    </tr>
                );
            }

            if (naturalProduct.chemicalSubClass != "") {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Subclass</td>
                        <td>{naturalProduct.chemicalSubClass}</td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Subclass</td>
                        <td>No known subclass</td>
                    </tr>
                );
            }

            if (naturalProduct.directParentClassification != "") {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Direct parent</td>
                        <td>{naturalProduct.directParentClassification}</td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={i + "_cclass"}>
                        <td>Direct parent</td>
                        <td>No known direct parent</td>
                    </tr>
                );
            }



            return (
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Chemical classification</Card.Title>
                        <Card.Subtitle><FontAwesomeIcon icon="info" fixedWidth/>Computed with <a target="_blank" rel="noopener noreferrer"  href="http://classyfire.wishartlab.com/">ClassyFire</a></Card.Subtitle>
                        <br />
                        <Table size="sm">
                            <tbody>
                            {classTable}

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            );
        }


    }
}