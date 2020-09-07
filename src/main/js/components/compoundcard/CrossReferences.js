import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Error from "../Error";
import Spinner from "../Spinner";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");
const restClient = require("../../restClient");


export default class CrossReferences extends React.Component {



    render() {

        const naturalProduct = this.props.naturalProduct;


        let nbXref = 0 ;
        if(naturalProduct.clean_xrefs != null) {
            nbXref = naturalProduct.clean_xrefs.length;
        }

        const found_in_databases = naturalProduct.found_in_databases.join(", ");



        if (nbXref===0) {
            return(
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Cross References</Card.Title>
                        <br />
                        <p>This compound is not present in a currently existing database.</p>
                        <p>It was retrieved from the following collection(s): {found_in_databases}</p>
                    </Card.Body>
                </Card>
            );
        } else {


            let dic = {};
            for(let i=0; i<naturalProduct.clean_xrefs.length; i++){

                let xref = naturalProduct.clean_xrefs[i];
                //clean_xref = {"source": source_pretty_names[xref[0]], "id_in_source": xref[1], "link_to_source": xref[2]}
                let source = xref.source;
                let linkToSource = xref.link_to_source + xref.id_in_source;

                dic[linkToSource] = source;

            }

            console.log(dic);

            let linksToSources = [];
            //for(let i=0; i<naturalProduct.clean_xrefs.length; i++){
            for(let linkToSource in dic){

/*                let xref = naturalProduct.clean_xrefs[i];
                //clean_xref = {"source": source_pretty_names[xref[0]], "id_in_source": xref[1], "link_to_source": xref[2]}
                let source = xref.source;
                let linkToSource = xref.link_to_source + xref.id_in_source;*/

                const buttonToSource =
                    <Button id={"linkTo_" + linkToSource} variant="outline-primary" size="sm" href={linkToSource} target="_blank">
                        <FontAwesomeIcon icon="external-link-alt" fixedWidth/>
                    </Button>;

                linksToSources.push(
                    <tr key={"ref_"+linkToSource}>
                        <td>{dic[linkToSource]}</td>
                        <td>{buttonToSource}</td>
                    </tr>
                );

            }

            return (
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Cross References</Card.Title>
                        <br/>
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th>Database</th>
                                <th>Link to reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            {linksToSources}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            );
        }
    }
}


/*

const { error, isLoaded, sourceNaturalProducts } = this.state;

constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sourceNaturalProduct: []
        };
    }


componentDidMount() {
        this.fetchSourcesByInchikey(this.props.naturalProduct.inchikey);
    }

    fetchSourcesByInchikey(inchikey) {
        restClient({
            method: "GET",
            path: "/api/source/search/findBySimpleInchiKey?inchikey=" + encodeURIComponent(inchikey)
        }).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    sourceNaturalProducts: response.entity._embedded.sourceNaturalProducts
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            });
    }


 */