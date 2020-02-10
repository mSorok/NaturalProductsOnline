import Image from "react-bootstrap/Image";
import {LinkContainer} from "react-router-bootstrap";
import Utils from "../Utils";

const React = require("react");


export default class NaturalProductTableItem extends React.Component {
    render() {
        const linkToCompoundPage = "/compound/inchikey/" + this.props.naturalProduct.inchikey;
        const structure = Utils.drawMoleculeBySmiles(this.props.naturalProduct.smiles);

        return (
            <LinkContainer to={linkToCompoundPage}>
                <tr>
                    <td><Image src={structure.toDataURL()} alt="🥥" fluid/></td>
                    <td>{this.props.naturalProduct.name ? this.props.naturalProduct.name : "no name available"}</td>
                    <td>{this.props.naturalProduct.npl_score}</td>
                    <td>{this.props.naturalProduct.molecular_formula || this.props.naturalProduct.molecularFormula}</td>
                    <td>{this.props.naturalProduct.molecular_weight || this.props.naturalProduct.molecularWeight}</td>
                    <td>{this.props.naturalProduct.inchi}</td>
                    <td>{this.props.naturalProduct.inchikey}</td>
                </tr>
            </LinkContainer>
        );
    }
}