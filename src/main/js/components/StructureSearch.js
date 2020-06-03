import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "./Spinner";
import CardBrowser from "./browser/CardBrowser";
import Error from "./Error";

const React = require("react");
const OpenChemLib = require("openchemlib/full");
const restClient = require("../restClient");


export default class StructureSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ajaxError: null,
            ajaxIsLoaded: false,
            ajaxResult: [],
            searchSubmitted: false,
            exactMatch: true
        };

        this.handleDefaultCaffeine = this.handleDefaultCaffeine().bind(this);
        this.handleStructureSubmit = this.handleStructureSubmit.bind(this);
        this.handleCheckboxExactMatch = this.handleCheckboxExactMatch.bind(this);

        this.searchResultHeadline = React.createRef();
    }

    componentDidMount() {
        this.editor = OpenChemLib.StructureEditor.createSVGEditor("structureSearchEditor", 1.25);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.ajaxIsLoaded) {
            this.scrollToRef(this.searchResultHeadline);
        }
    }

    handleDefaultCaffeine() {
        const caffeineCleanSmiles = "O=C1C2=C(N=CN2C)N(C(=O)N1C)C";

        this.editor.setSmiles(caffeineCleanSmiles);
    }

    handleStructureSubmit() {
        let structureAsSmiles = this.editor.getSmiles();

        this.setState({
            searchSubmitted: true
        });

        if (this.state.exactMatch) {
            this.doSearch("/api/search/exact/structure?smiles=", encodeURIComponent(structureAsSmiles));
        } else {
            this.doSearch("/api/search/substructure?smiles=", encodeURIComponent(structureAsSmiles));
        }

    }

    handleCheckboxExactMatch(e) {
        this.setState({
            exactMatch: e.target.checked
        });
    }

    doSearch(path, searchString) {
        restClient({
            method: "GET",
            path: path + encodeURIComponent(searchString)
        }).then(
            (response) => {
                this.setState({
                    ajaxIsLoaded: true,
                    ajaxResult: response.entity
                });
            },
            (error) => {
                this.setState({
                    ajaxIsLoaded: true,
                    ajaxError: error
                });
            });
    }

    scrollToRef(ref) {
        window.scrollTo(0, ref.current.offsetTop);
    }

    render() {
        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted, exactMatch} = this.state;
        let resultRow;

        if (searchSubmitted) {
            if (ajaxError) {
                resultRow = <Error/>;
            } else if (!ajaxIsLoaded) {
                resultRow =
                    <Row className="justify-content-center">
                        <Spinner/>
                        {!exactMatch && <p>Note: The substructure search might be long if the input molecule is small.</p>}
                    </Row>
            } else {
                if (ajaxResult.naturalProducts.length > 0) {
                    resultRow =
                        <>
                            <Row>
                                <p>Your search for "{ajaxResult.originalQuery}" yielded {ajaxResult.count} results. {ajaxResult.count > 250 && "Only 250 of these are shown."}</p>
                            </Row>
                            <Row>
                                <CardBrowser naturalProducts={ajaxResult.naturalProducts}/>
                            </Row>
                        </>
                } else {
                    resultRow = <Row><p>No matches found in the database.</p></Row>;
                }
            }
        }

        return (
            <Container>
                <Row>
                    <h2>Structure Search</h2>
                </Row>
                <br/>
                <Row>
                    <div id="structureSearchEditor"/>
                </Row>
                <br/>
                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Check id="checkboxExactMatch"
                                        type="checkbox"
                                        label="Exact match"
                                        onChange={this.handleCheckboxExactMatch}
                                        checked={exactMatch}/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Button id="structureSearchButton" variant="primary" type="submit" onClick={this.handleStructureSubmit}> //TODO here
                        <FontAwesomeIcon icon="search" fixedWidth/>
                        &nbsp;Substructure search
                    </Button>

                    <Button id="similaritySearchButton" variant="primary" type="submit" onClick={this.handleStructureSubmit}> //TODO here
                        <FontAwesomeIcon icon="search" fixedWidth/>
                        &nbsp;Similarity search (not functional for now)
                    </Button>

                    <Button id="structureSearchDrawExampleButton" variant="primary" type="submit" onClick={this.handleDefaultCaffeine()}>
                        &nbsp;Load example
                    </Button>
                </Row>
                <br/>
                {ajaxIsLoaded && <Row><h2 ref={this.searchResultHeadline}>Search Results</h2></Row>}
                {resultRow}
            </Container>
        );
    }
}