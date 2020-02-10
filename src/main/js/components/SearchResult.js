import Container from "react-bootstrap/Container";
import CardBrowser from "./browser/CardBrowser";
import Row from "react-bootstrap/Row";
import Error from "./Error";
import Spinner from "./Spinner";

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
    }

    componentDidMount() {
        this.fetchSearchResults();
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

            return (
                <Container>
                    <Row>
                        <h2>Search Results</h2>
                    </Row>
                    <br/>
                    <Row>
                        {searchIsLoaded &&
                            <p>Your search for "{searchResult.originalQuery}" yielded {resultCount} natural product{resultCount > 1 ? "s" : null}
                            {typeof(searchResult.determinedInputType) !== "undefined" && searchResult.determinedInputType !== "" ? " under the assumption of the entered sequence being of type " + searchResult.determinedInputType + "." : "."} </p>}
                    </Row>
                    <br/>
                    {searchResult && <CardBrowser naturalProducts={searchResult.naturalProducts}/>}
                </Container>
            );
        }
    }
}