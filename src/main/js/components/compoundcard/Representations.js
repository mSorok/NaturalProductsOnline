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
                            <td>InChI</td>
                            <td>{naturalProduct.inchi}</td>
                        </tr>
                        <tr>
                            <td>InChIKey</td>
                            <td>{naturalProduct.inchikey}</td>
                        </tr>
                        <tr>
                            <td>SMILES</td>
                            <td>{naturalProduct.smiles}</td>
                        </tr>
                        <tr>
                            <td>Canonical SMILES</td>
                            <td>{naturalProduct.clean_smiles}</td>
                        </tr>
                        <tr>
                            <td>Mol. formula</td>
                            <td>{naturalProduct.molecular_formula || naturalProduct.molecularFormula}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}