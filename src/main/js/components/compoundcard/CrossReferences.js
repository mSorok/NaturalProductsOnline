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

        const nbXref = naturalProduct.xrefs.length;

        const found_in_databases = naturalProduct.found_in_databases;



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


            let linksToSources = [];
            for(let i=0; i<naturalProduct.xrefs.length; i++){
                let source = naturalProduct.xrefs[i][0];
                let linkToSource = naturalProduct.xrefs[i][2] + naturalProduct.xrefs[i][1];

                const buttonToSource =
                    <Button id={"linkTo" + i} variant="outline-primary" size="sm" href={linkToSource} target="_blank">
                        <FontAwesomeIcon icon="external-link-alt" fixedWidth/>
                    </Button>;

                linksToSources.push(
                    <tr key={i}>
                        <td>{source}</td>
                        <td>{buttonToSource}</td>
                    </tr>
                );

            }

            return (
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Cross References</Card.Title>
                        <br/>
                        <p>External identifiers:</p>
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th>Reference</th>
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