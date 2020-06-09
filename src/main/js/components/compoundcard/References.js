import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");

export default class  References  extends React.Component {
    render() {
        const naturalProduct = this.props.naturalProduct;

        const nbRefs = naturalProduct.citationDOI.length;
        let refTable = [];

        if(nbRefs==0){
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">References</Card.Title>
                        <br />
                        <p>No literature was found for this compound</p>
                    </Card.Body>
                </Card>
            );
        }else{
            for(let i=0; i<naturalProduct.citationDOI.length; i++) {
                let ref_link = "";

                if (RegExp(/^\d+$/).test(naturalProduct.citationDOI[i])) {
                    //only numbers = PubMed id

                    let ra = "https://pubmed.ncbi.nlm.nih.gov/14521986/?from_single_result="+ naturalProduct.citationDOI[i] ;
                    ref_link = <a href= {ra}>PubMed </a> ;

                } else if (RegExp(/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/g).test(naturalProduct.citationDOI[i])) {
                    //doi but without the "doi"
                    let ra = "doi.org/"+naturalProduct.citationDOI[i];
                    ref_link = <a href= {ra}>DOI </a> ;
                }else if( RegExp(/^(doi.org).+/).test(naturalProduct.citationDOI[i]) ){
                    //doi.org
                    ref_link = <a href={naturalProduct.citationDOI[i]}>DOI</a> ;
                }else if(RegExp(/^(doi:|DOI:).+/).test(naturalProduct.citationDOI[i])){
                    //doi:
                    let ra = "doi.org/" + naturalProduct.citationDOI[i].split(":")[1];
                    ref_link = <a href={ra}>DOI</a>;
                }else {
                    //for now, actual text
                    if (naturalProduct.citationDOI[i] != " " && naturalProduct.citationDOI[i] != "NA") {
                        ref_link = naturalProduct.citationDOI[i];
                    }
                }

                refTable.push(
                    <tr key={i+"_refs"}>
                        <td>{ref_link}</td>
                    </tr>
                );

            }
        }

        return (

            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">References</Card.Title>
                    <br />
                    <Table size="sm">
                        {refTable}
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}