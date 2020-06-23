import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");


export default class  Organisms  extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        const nbOrg = naturalProduct.textTaxa.length;
        let organismTable = [];

        if(nbOrg==0){
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Produced by organisms</Card.Title>
                        <br />
                        <p>No organism that synthetises this compound could be found</p>
                    </Card.Body>
                </Card>
            );
        }else{
            for(let i=0; i<naturalProduct.textTaxa.length; i++) {


                organismTable.push(
                    <tr key={i+"_org"}>
                        <td>rien</td>
                    </tr>
                );

            }
        }

        return (

            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Produced by organisms</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        {organismTable}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}