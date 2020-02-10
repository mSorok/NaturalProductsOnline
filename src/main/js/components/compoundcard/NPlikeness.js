import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const React = require("react");


export default class Representations extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Natural Product Likeness</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        <tr>
                            <td>NPL NOH score</td>
                            <td>{naturalProduct.npl_noh_score}</td>
                        </tr>
                        <tr>
                            <td>NPL score</td>
                            <td>{naturalProduct.npl_score}</td>
                        </tr>
                        <tr>
                            <td>NPL sugar score</td>
                            <td>{naturalProduct.npl_sugar_score}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
