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


export default class KnownStereochemicalVariants extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        const nbStereoV =  Object.keys(naturalProduct.absolute_smiles).length;

        let stereoList = [];

        if(nbStereoV==0) {
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Known Stereochemical Variants</Card.Title>
                        <br />
                        <p>No stereochemical variations of this compound were found</p>
                    </Card.Body>
                </Card>
            );


        }else{
            let count = 0;
            Object.keys(naturalProduct.absolute_smiles).forEach((abs_smiles, dbs) => {
                //console.log(abs_smiles);

                if (abs_smiles != "nostereo"){

                    const structure = Utils.drawMoleculeBySmiles(abs_smiles);

                    stereoList.push(
                        <tr key={"stereo_" + count}>
                            <td>
                                <Image src={structure.toDataURL()}
                                       alt={<FontAwesomeIcon icon="file-image" className="standAloneIcon" size="2x"/>}
                                       fluid/>
                            </td>
                            <td>
                                {abs_smiles}
                            </td>
                        </tr>
                    );
                    count++;
                }
            });

        }

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Known Stereochemical Variants</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        {stereoList}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}