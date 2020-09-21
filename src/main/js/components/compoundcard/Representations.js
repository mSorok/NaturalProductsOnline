import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const React = require("react");


export default class Representations extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Representations</Card.Title>
                    <br />
                    <Table responsive bordered hover size="sm" >
                        <tbody>
                        <tr key={"represent_id"}>
                            <td>COCONUT id</td>
                            <td>{naturalProduct.coconut_id}</td>
                        </tr>
                        <tr key={"represent_name"}>
                            <td>Name</td>
                            <td>{naturalProduct.name}</td>
                        </tr>
                        <tr key={"represent_iupac"}>
                            <td>IUPAC name</td>
                            <td>{naturalProduct.iupac_name}</td>
                        </tr>
                        <tr  key={"represent_inchi"}>
                            <td>InChI</td>
                            <td>{naturalProduct.inchi}</td>
                        </tr>
                        <tr key={"represent_inchik"}>
                            <td>InChIKey</td>
                            <td>{naturalProduct.inchikey}</td>
                        </tr>
                        <tr  key={"represent_csmiles"}>
                            <td>Canonical SMILES (CDK)</td>
                            <td>{naturalProduct.unique_smiles || naturalProduct.clean_smiles }</td>
                        </tr>
                        <tr key={"represent_dsmiles"}>
                            <td>Deep SMILES</td>
                            <td>{naturalProduct.deep_smiles || "could not be computed"}</td>
                        </tr>
                        <tr key={"represent_mf"}>
                            <td>Murcko Framework</td>
                            <td>{naturalProduct.murko_framework || "not applicable"}</td>
                        </tr>


                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}