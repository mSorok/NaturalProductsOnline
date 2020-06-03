import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Utils from "../../Utils";

const React = require("react");


export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.handleMolfileDownload = this.handleMolfileDownload.bind(this);
    }

    handleMolfileDownload(e, smiles, identifier) {
        e.preventDefault();

        const download = document.createElement("a");

        download.setAttribute("href", "data:chemical/x-mdl-molfile;charset=utf-8," + encodeURIComponent(Utils.getMolfileStringBySmiles(smiles)));
        download.setAttribute("download", "Molfile_V3_" + identifier + ".mol");
        download.style.display = "none";

        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    }

    render() {
        const naturalProduct = this.props.naturalProduct;
        const structure = Utils.drawMoleculeBySmiles(naturalProduct.smiles);

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">{naturalProduct.coconut_id}</Card.Title>
                    <br />
                    <Row>
                        <Col sm={4}>
                            <Image src={structure.toDataURL()} alt={<FontAwesomeIcon icon="file-image" className="standAloneIcon" size="3x"/>} fluid/>
                        </Col>
                        <Col sm={8}>
                            <Table size="sm">
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{naturalProduct.name ? naturalProduct.name : "no name available"}</td>
                                </tr>
                                <tr>
                                    <td>Contains sugar</td>
                                    <td>{naturalProduct.contains_sugar ? "yes" : "no"}</td>
                                </tr>
                                <tr>
                                    <td>Mol. formula</td>
                                    <td>{naturalProduct.molecular_formula || naturalProduct.molecularFormula}</td>
                                </tr>
                                <tr>
                                    <td>Mol. weight</td>
                                    <td>{naturalProduct.molecular_weight || naturalProduct.molecularWeight}</td>
                                </tr>
                                </tbody>
                            </Table>
                            <Button id="downloadMolfile" variant="outline-primary" size="sm" onClick={(e) => this.handleMolfileDownload(e, naturalProduct.smiles, naturalProduct.coconut_id)}>
                                <FontAwesomeIcon icon="file-download" fixedWidth/>
                                &nbsp;Molfile
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}