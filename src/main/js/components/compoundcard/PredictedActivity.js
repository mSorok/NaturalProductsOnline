import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "react-bootstrap/Tooltip";
import Utils from "../../Utils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const React = require("react");



export default class PredictedActivity extends React.Component {

    renderTooltipPa = (props) => (
        <Tooltip id="tooltip-pa" {...props}>
            Probability to be active
        </Tooltip>
    );

    renderTooltipPi = (props) => (
        <Tooltip id="tooltip-pa" {...props}>
            Probability to be inactive
        </Tooltip>
    );



    render() {
        const naturalProduct = this.props.naturalProduct;

        let full_table = [];
        let header = [];
        let table_body = [];

        console.log(naturalProduct.pass_bioactivity_searcheable);


        if(naturalProduct.pass_bioactivity_searcheable == null || naturalProduct.pass_bioactivity_searcheable.length==0){
            console.log("entered the if");
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Predicted Bioactivities</Card.Title>
                        <Card.Subtitle size="xs"><FontAwesomeIcon icon="info" fixedWidth/>Predicted with <a target="_blank" rel="noopener noreferrer"  href="http://www.way2drug.com/passonline">PASS</a></Card.Subtitle>
                        <br />


                        <p>No PASS predictions were computed for this natural product.</p>

                    </Card.Body>
                </Card>
            );
        }else{

            //fill the table header
            let theader = [];

            theader.push(
                <th id={"head_a"}>
                    Predicted activity
                </th>
            );

            theader.push(
                <th id={"head_pa"}>
                    Pa <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltipPa}
                    >
                        <FontAwesomeIcon icon="question-circle" fixedWidth/>
                    </OverlayTrigger>

                </th>
            );

            theader.push(
                <th id={"head_pi"}>
                    Pi <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltipPi}
                    >
                        <FontAwesomeIcon icon="question-circle" fixedWidth/>
                    </OverlayTrigger>
                </th>
            );




            header.push(
                <thead>
                <tr>
                {theader}
                </tr>
                </thead>

            );


            //fill the table body
            for(let i=0; i<naturalProduct.pass_bioactivity_predictions.length; i++   ){

                table_body.push(
                    <tr>
                        <td>{naturalProduct.pass_bioactivity_predictions[i][0]}</td>
                        <td>{naturalProduct.pass_bioactivity_predictions[i][1]}</td>
                        <td>{naturalProduct.pass_bioactivity_predictions[i][2]}</td>
                    </tr>

                );
            }


            full_table.push(
                <Table striped bordered hover id={"pass_preds"}>
                        {header}
                    <tbody>
                    {table_body}
                    </tbody>
                </Table>
            );
        }

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Predicted Bioactivities</Card.Title>
                    <Card.Subtitle size="xs"><FontAwesomeIcon icon="info" fixedWidth/>Predicted with <a target="_blank" rel="noopener noreferrer"  href="http://www.way2drug.com/passonline">PASS</a></Card.Subtitle>
                    <br />



                    {full_table}
                </Card.Body>
            </Card>
        );
    }
}