import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Utils from "../Utils";

const React = require("react");


//This is the small cards that appear on the home page - need to find what catches the search

export default class NaturalProductCardItem extends React.Component {
    render() {
        const linkToCompoundPage = "/compound/coconut_id/" + this.props.naturalProduct.coconut_id;
        const structure = Utils.drawMoleculeBySmiles(this.props.naturalProduct.smiles);
        //console.log(this.props.naturalProduct.smiles);
        // console.log(this.props.naturalProduct.coconut_id)

        return (
            <Card className="cardBrowserItem">
                <Card.Img variant="top" src={structure.toDataURL()} alt="🥥"/>
                <Card.Body>
                    <Card.Title>
                        <Card.Link href={linkToCompoundPage} className="cardItemHeadline">{this.props.naturalProduct.coconut_id}</Card.Link>
                    </Card.Title>
                    <Card.Subtitle>{this.props.naturalProduct.name ? this.props.naturalProduct.name : "no name available"}</Card.Subtitle>
                    <Table>
                        <tbody>
                        <tr>
                            <td>Mol. formula</td>
                            <td>{this.props.naturalProduct.molecular_formula || this.props.naturalProduct.molecularFormula}</td>
                        </tr>
                        <tr>
                            <td>Mol. weight</td>
                            <td>{ Math.round((this.props.naturalProduct.molecular_weight + Number.EPSILON)  * 100) / 100 }</td>
                        </tr>
                        <tr>
                            <td>NP-likeness</td>
                            <td>{ Math.round((this.props.naturalProduct.npl_score + Number.EPSILON)  * 100) / 100 }</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}