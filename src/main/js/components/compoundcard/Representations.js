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
                    <Table size="sm">
                        <tbody>
                        <tr>
                            <td>COCONUT id</td>
                            <td>{naturalProduct.coconut_id}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{naturalProduct.name}</td>
                        </tr>
                        <tr>
                            <td>InChI</td>
                            <td>{naturalProduct.inchi}</td>
                        </tr>
                        <tr>
                            <td>InChIKey</td>
                            <td>{naturalProduct.inchikey}</td>
                        </tr>
                        <tr>
                            <td>Canonical SMILES (CDK)</td>
                            <td>{naturalProduct.clean_smiles}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}