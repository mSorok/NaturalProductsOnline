import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const React = require("react");


export default class MolecularProperties extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Molecular Properties</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        <tr>
                            <td>Total atom number</td>
                            <td>{naturalProduct.total_atom_number}</td>
                        </tr>
                        <tr>
                            <td>Heavy atom number</td>
                            <td>{naturalProduct.heavy_atom_number}</td>
                        </tr>
                        <tr>
                            <td>Bond count</td>
                            <td>{naturalProduct.bond_count}</td>
                        </tr>
                        <tr>
                            <td>Number of carbons</td>
                            <td>{naturalProduct.number_of_carbons}</td>
                        </tr>
                        <tr>
                            <td>Minimal number of rings</td>
                            <td>{naturalProduct.min_number_of_rings}</td>
                        </tr>
                        <tr>
                            <td>Maximal number of rings</td>
                            <td>{naturalProduct.max_number_of_rings}</td>
                        </tr>

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}