import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Utils from "../../Utils";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


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

        let cas_registry_num = "";
        if(naturalProduct.cas != null && naturalProduct.cas != ""){
            cas_registry_num = <tr><td>CAS registry number</td><td>{naturalProduct.cas}</td></tr>;
        }

        let starsAnnotation = "";

        if(naturalProduct.annotationLevel==0){
            starsAnnotation="not annotated yet";
        }else {

            for (let i = 0; i < naturalProduct.annotationLevel; i++) {
                starsAnnotation += <FontAwesomeIcon icon="fa-star" fixedWidth/>;
            }
        }

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
                                    <td>Annotation level</td>
                                    <td>{naturalProduct.annotationLevel}</td>
                                </tr>
                                <tr>
                                    <td>Mol. formula</td>
                                    <td>{naturalProduct.molecular_formula || naturalProduct.molecularFormula}</td>
                                </tr>
                                {cas_registry_num}
                                <tr>
                                    <td>Mol. weight</td>
                                    <td>{ Math.round((naturalProduct.molecular_weight + Number.EPSILON) * 10000) / 10000 || Math.round((naturalProduct.molecular_weight + Number.EPSILON) * 10000) / 10000}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Annotation level
                                        <OverlayTrigger key={"annot_level"} placement="bottom" overlay={
                                            <Tooltip id={"annot_level_tooltip"}>
                                                <p>Annotation level of this natural product</p>p>
                                                <p>1 star: no verified name, no organism that produces the entry, no literature reference, no trusted resource;</p>
                                                <p>2 stars: one of the above; 3 stars: two of the above; 4 stars: three of the above; 5 stars: full annotation </p>
                                            </Tooltip>
                                        }>
                                            <FontAwesomeIcon icon="question-circle" fixedWidth/>
                                        </OverlayTrigger>
                                    </td>
                                    <td>{starsAnnotation}</td>
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