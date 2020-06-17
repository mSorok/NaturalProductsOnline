import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const React = require("react");

export default class  Synonyms  extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        const nbSynonyms = naturalProduct.synonyms.length;

        let synonymsList = [];

        if(nbSynonyms==0){
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Synonyms</Card.Title>
                        <br />
                        <p>No synonyms or alternative names were found for this compound</p>
                    </Card.Body>
                </Card>
            );
        }else {
            for(let i=0; i<naturalProduct.synonyms.length; i++) {

                synonymsList.push(
                    <tr key={i+"_synonyms"}>
                        <td>{naturalProduct.synonyms[i]}</td>
                    </tr>
                );

            }
        }



        return (

            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Synonyms</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        {synonymsList}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}



