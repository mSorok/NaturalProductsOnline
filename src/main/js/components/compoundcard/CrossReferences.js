import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Error from "../Error";
import Spinner from "../Spinner";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");
const restClient = require("../../restClient");


export default class CrossReferences extends React.Component {
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

    render() {
        const { error, isLoaded, sourceNaturalProducts } = this.state;

        if (error) {
            return <Error/>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {
            const countSources = sourceNaturalProducts.length;

            let sourceTableRows = [];
            sourceNaturalProducts.map((item, index) => {
                const buttonToSource =
                    <Button id={"linkTo" + item["idInSource"]} variant="outline-primary" size="sm" disabled>
                        <FontAwesomeIcon icon="external-link-alt" fixedWidth/>
                    </Button>;

                sourceTableRows.push(
                    <tr key={index}>
                        <td>{item["source"]}</td>
                        <td>{item["idInSource"]}</td>
                        <td>{item["acquisition_date"]}</td>
                        <td>{buttonToSource}</td>
                    </tr>
                );
            });

            return (
                <Card className="compoundCardItem">
                    <Card.Body>
                        <Card.Title className="text-primary">Cross References</Card.Title>
                        <br/>
                        <p>For {this.props.naturalProduct.inchikey} exist {countSources} different references:</p>
                        <Table size="sm">
                            <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Original ID</th>
                                <th>Acquisition date</th>
                                <th>Link to reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sourceTableRows}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            );
        }
    }
}