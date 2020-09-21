import Container from "react-bootstrap/Container";
import CardBrowser from "./browser/CardBrowser";
import Row from "react-bootstrap/Row";
import Error from "./Error";
import Spinner from "./Spinner";

import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";
import Utils from "../Utils";

const React = require("react");
const restClient = require("../restClient");




export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchError: null,
            searchIsLoaded: false,
            searchResult: []
        };

        this.baseState = this.state;

    }

    componentDidMount() {
        this.fetchSearchResults();

    }

    handleSDFDownload(e, npList) {
        e.preventDefault();

        const download = document.createElement("a");

        download.setAttribute("href", "data:chemical/x-mdl-molfile;charset=utf-8," + encodeURIComponent(Utils.getSDFileStringByNPList(npList)));
        download.setAttribute("download", "coconut_simple_search_result.sdf");
        download.style.display = "none";

        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(encodeURIComponent(this.props.match.params.q) !== encodeURIComponent(prevProps.match.params.q) ) {
            this.setState(this.baseState);
            this.fetchSearchResults();
        }
    }

    fetchSearchResults(link = "/api/search/simple?query=" + encodeURIComponent(this.props.match.params.q)) {
        restClient({
            method: "GET",
            path: link
        }).then(
            (response) => {
                this.setState({
                    searchIsLoaded: true,
                    searchResult: response.entity
                });
            },
            (error) => {
                this.setState({
                    searchIsLoaded: true,
                    searchError: error
                });
            });
    }

    render() {
        const {searchError, searchIsLoaded, searchResult} = this.state;

        if (searchError) {
            return <Error/>
        } else if (!searchIsLoaded) {
            return <Spinner/>
        } else {
            const resultCount = searchResult.naturalProducts.length;

            let additionalSearch ="";

            let resultDlRow = "";

            if(resultCount == 0){


                additionalSearch = <p> Try our <Link to="/search/structure">structure</Link> or <Link to="/search/advanced">advanced</Link> search for more results</p>;


                resultDlRow =
                    <Container fluid>
                        <Row>
                            {searchIsLoaded &&
                            <p>Your search for "{searchResult.originalQuery}" returned {resultCount.toLocaleString()} natural product{resultCount > 1 ? "s" : null}
                                { ". "} </p>}

                        </Row>
                        <br/>
                        <Row>

                            {additionalSearch}

                        </Row>

                    </Container>

            }else{
                additionalSearch = <p> Not what you were searching for? Try our <Link to="/search/structure">structure</Link> or <Link to="/search/advanced">advanced</Link> search for more results</p>;

                let npList = [...searchResult.naturalProducts];

                resultDlRow =
                    <Container fluid>
                        <Row>
                            <Col>
                                {searchIsLoaded &&
                                <p>Your search for "{searchResult.originalQuery}" returned {resultCount.toLocaleString()} natural product{resultCount > 1 ? "s" : null}
                                    { ". "} </p>}
                            </Col>
                            <Col md="auto">
                                <Button id="downloadSDFfile" variant="outline-primary" size="sm" onClick={(e) => this.handleSDFDownload(e, npList)}>
                                    <FontAwesomeIcon icon="file-download" fixedWidth/>
                                    &nbsp;Download SDF
                                </Button>
                            </Col>
                            <br/>
                        </Row>

                        <Row>

                            <Col>
                                {additionalSearch}
                            </Col>

                        </Row>


                    </Container>
            }

            return (
                <Container>
                    <Row>
                        <h2>Search Results</h2>
                    </Row>
                    <br/>
                    {resultDlRow}
                    <br/>
                    {searchResult && <CardBrowser naturalProducts={searchResult.naturalProducts}/>}
                </Container>
            );
        }
    }
}