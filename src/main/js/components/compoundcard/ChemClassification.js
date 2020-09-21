import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, Redirect} from "react-router-dom";

import Button from "react-bootstrap/Button";



const React = require("react");



export default class ChemClassification extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchSubmitted: false,
            queryString: null,
        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    }

    handleSearchSubmit(e, value){


        this.setState(
            {
                queryString:value,
                searchSubmitted:true
            }
        );

    }




    render() {
        const naturalProduct = this.props.naturalProduct;

        let api_url = "/search/chemclass?query=";




        let classTable = [];

        if (naturalProduct.chemicalSuperClass == "" && naturalProduct.chemicalClass == "" && naturalProduct.chemicalSubClass=="" && naturalProduct.directParentClassification =="") {

            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Chemical classification</Card.Title>
                        <Card.Subtitle size="sm"><FontAwesomeIcon icon="info" fixedWidth/>Computed with <a target="_blank" rel="noopener noreferrer"  href="http://classyfire.wishartlab.com/">ClassyFire</a></Card.Subtitle>
                        <br />
                        <p>No chemical classification seems to exist for this compound</p>
                    </Card.Body>
                </Card>
            );
        } else {

            //TODO links to the API to retrieve all with this classification

            if (naturalProduct.chemicalSuperClass != "" &&  naturalProduct.chemicalSuperClass != "NaN" ) {
                classTable.push(
                    <tr key={"sc_cclass"}>
                        <td>Super class</td>

                        <td><Button style={{fontSize: 12}} size="xs" variant="link" onClick={(e) => this.handleSearchSubmit(e, naturalProduct.chemicalSuperClass)} >{naturalProduct.chemicalSuperClass}&nbsp;<FontAwesomeIcon icon="search-plus" fixedWidth/></Button></td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={"sc_cclass"}>
                        <td>Super class</td>
                        <td>No known superclass</td>
                    </tr>
                );
            }

            if (naturalProduct.chemicalClass != "" && naturalProduct.chemicalClass != "NaN" ) {
                classTable.push(
                    <tr key={"cc_cclass"}>
                        <td>Class</td>
                        <td><Button style={{fontSize: 12}} size="xs" variant="link" onClick={(e) => this.handleSearchSubmit(e, naturalProduct.chemicalClass)} >{naturalProduct.chemicalClass}&nbsp;<FontAwesomeIcon icon="search-plus" fixedWidth/></Button></td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={"cc_cclass"}>
                        <td>Class</td>
                        <td>No known class</td>
                    </tr>
                );
            }

            if (naturalProduct.chemicalSubClass != "" && naturalProduct.chemicalSubClass != "NaN") {
                classTable.push(
                    <tr key={"sbc_cclass"}>
                        <td>Subclass</td>
                        <td><Button style={{fontSize: 12}} size="xs" variant="link" onClick={(e) => this.handleSearchSubmit(e, naturalProduct.chemicalSubClass)} >{naturalProduct.chemicalSubClass}&nbsp;<FontAwesomeIcon icon="search-plus" fixedWidth/></Button></td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={"sbc_cclass"}>
                        <td>Subclass</td>
                        <td>No known subclass</td>
                    </tr>
                );
            }

            if (naturalProduct.directParentClassification != "" && naturalProduct.directParentClassification != "NaN") {
                classTable.push(
                    <tr key={"dp_cclass"}>
                        <td>Direct parent</td>
                        <td><Button style={{fontSize: 12}} size="xs" variant="link" onClick={(e) => this.handleSearchSubmit(e, naturalProduct.directParentClassification)} >{naturalProduct.directParentClassification}&nbsp;<FontAwesomeIcon icon="search-plus" fixedWidth/></Button></td>
                    </tr>
                );
            } else {
                classTable.push(
                    <tr key={"dp_cclass"}>
                        <td>Direct parent</td>
                        <td>No known direct parent</td>
                    </tr>
                );
            }



            return (
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Chemical classification</Card.Title>
                        <Card.Subtitle size="xs"><FontAwesomeIcon icon="info" fixedWidth/>Computed with <a target="_blank" rel="noopener noreferrer"  href="http://classyfire.wishartlab.com/">ClassyFire</a></Card.Subtitle>
                        <br />
                        <Table size="sm">
                            <tbody>
                            {classTable}

                            </tbody>
                        </Table>
                    </Card.Body>
                    {this.state.searchSubmitted && <Redirect to={"/search/chemclass/" + encodeURIComponent(this.state.queryString)}/> }
                </Card>


            );
        }


    }
}