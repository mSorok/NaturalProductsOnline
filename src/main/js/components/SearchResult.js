import Container from "react-bootstrap/Container";
import CardBrowser from "./browser/CardBrowser";
import Row from "react-bootstrap/Row";
import Error from "./Error";
import Spinner from "./Spinner";

import { Link } from 'react-router-dom';

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(encodeURIComponent(this.props.match.params.q) !== encodeURIComponent(prevProps.match.params.q) ) {
            this.setState(this.baseState);
            this.fetchSearchResults();
        }
    }

    fetchSearchResults() {
        restClient({
            method: "GET",
            path: "/api/search/simple?query=" + encodeURIComponent(this.props.match.params.q)
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

            if(resultCount == 0){
                additionalSearch = <p> Try our <Link to="/search/structure">structure</Link> or <Link to="/search/advanced">advanced</Link> search for more results</p>;
            }else{
                additionalSearch = <p> Not what you were searching for? Try our <Link to="/search/structure">structure</Link> or <Link to="/search/advanced">advanced</Link> search for more results</p>;
            }

            return (
                <Container>
                    <Row>
                        <h2>Search Results</h2>
                    </Row>
                    <br/>
                    <Row>
                        {searchIsLoaded &&
                            <p>Your search for "{searchResult.originalQuery}" returned {resultCount.toLocaleString()} natural product{resultCount > 1 ? "s" : null}
                            { ". "} </p>}
                    <br/>

                        {additionalSearch}

                    </Row>
                    <br/>
                    {searchResult && <CardBrowser naturalProducts={searchResult.naturalProducts}/>}
                </Container>
            );
        }
    }
}