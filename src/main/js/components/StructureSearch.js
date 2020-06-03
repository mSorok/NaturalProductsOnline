import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "./Spinner";
import CardBrowser from "./browser/CardBrowser";
import Error from "./Error";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Col from "react-bootstrap/Col";


const React = require("react");
const OpenChemLib = require("openchemlib/full");
const restClient = require("../restClient");

const ColoredLine = ({ color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);


export default class StructureSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ajaxError: null,
            ajaxIsLoaded: false,
            ajaxResult: [],
            searchSubmitted: false,

            exactMatch: false,
            fullExactMatch:true,
            bondTypeFreeExactMatch:false,

            substructureSearch: false,


            similaritySearch: false
        };

        this.handleDesireForCoffee = this.handleDesireForCoffee.bind(this);
        this.handleEditorClearing = this.handleEditorClearing.bind(this);
        this.handleStructureSubmit = this.handleStructureSubmit.bind(this);

        this.handleSearchTypeSelect = this.handleSearchTypeSelect.bind(this);


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

    handleDesireForCoffee() {
        const caffeineCleanSmiles = "O=C1C2=C(N=CN2C)N(C(=O)N1C)C";

        this.editor.setSmiles(caffeineCleanSmiles);
    }

    handleEditorClearing(){
        this.editor.setSmiles("");
    }

    handleStructureSubmit() {
        let structureAsSmiles = this.editor.getSmiles();

        this.setState({
            searchSubmitted: true
        });

        if (this.state.exactMatch) {
            this.doSearch("/api/search/exact-structure?smiles=", encodeURIComponent(structureAsSmiles));
        } else if (this.state.substructureSearch) {
            this.doSearch("/api/search/substructure?smiles=", encodeURIComponent(structureAsSmiles));
        } else{
            this.doSearch("/api/search/exact-structure?smiles=", encodeURIComponent(structureAsSmiles));
        }

    }

    handleCheckboxExactMatch(e) {
        this.setState({
            exactMatch: e.target.checked
        });
    }


    handleSearchTypeSelect(key){
        if(key==="exact-match"){
            this.setState(
                {
                    exactMatch:true,
                    substructureSearch: false,
                    similaritySearch: false

                }
            );
        }
        if(key==="substructure-search"){
            console.log("substructure");
            this.setState(
                {
                    exactMatch:false,
                    substructureSearch: true,
                    similaritySearch: false

                }
            );
        }

        if(key==="similarity-search"){
            this.setState(
                {
                    exactMatch:false,
                    substructureSearch: false,
                    similaritySearch: true

                }
            );
        }

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
        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted, exactMatch, fullExactMatch, bondTypeFreeExactMatch, substructureSearch, similaritySearch } = this.state;
        let resultRow;

        if (searchSubmitted) {
            if (ajaxError) {
                resultRow = <Error/>;
            } else if (!ajaxIsLoaded) {
                resultRow =
                    <Row className="justify-content-center">
                        <Spinner/>
                        {substructureSearch && <p>Note: The substructure search might be long if the input molecule is small.</p>}
                        {similaritySearch && <p>Note: The similarity search can be long.</p>}
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
                    resultRow = <Row><p>There are no results that exactly match your structure.</p></Row>;
                }
            }
        }

        return (
            <Container>
                <Row>
                    <h2>Structure Search</h2>
                </Row>
                <br/>


                <Tabs defaultActiveKey="draw" id="select-input-type">
                    <Tab eventKey="draw" title="Draw structure">

                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <br/>
                                <p>Use the editor to draw your structure</p>
                            </Col>
                            <Col xs lg="2">
                                <br/>
                                <Button id="structureSearchDrawExampleButton" variant="outline-info" type="submit" onClick={this.handleDesireForCoffee}>
                                    &nbsp;Load example
                                </Button>
                            </Col>
                            <Col xs lg="2">
                                <br/>
                                <Button variant="outline-warning" id="clear-structure" type="submit" onClick={this.handleEditorClearing} >
                                    &nbsp;Clear structure
                                </Button>
                            </Col>
                        </Row>
                        <ColoredLine color="white" />

                        <Row  className="justify-content-md-center">
                            <br/>
                            <br/>
                            <div id="structureSearchEditor"/>
                        </Row>

                    </Tab>

                    <Tab eventKey="paste" title="Paste structure" disabled>
                        <p>Here will be submission form for SMILES and Inchi etc</p>
                    </Tab>
                </Tabs>



                <br/>

                <Tabs defaultActiveKey="exact-match" id="select-search-type" onSelect={this.handleSearchTypeSelect} >
                    <Tab eventKey="exact-match" title="Exact match" >
                        <p>Here will be radio buttons for exact match search params</p>
                    </Tab>
                    <Tab eventKey="substructure-search" title="Substructure search" >
                        <p>Here will be radio buttons for substructure search params</p>
                        <p>Only 1000 first matches will be displayed</p>
                    </Tab>
                    <Tab eventKey="similarity-search" title="Similarity search" disabled>
                        <p>Here will be radio buttons for similarity search params</p>
                    </Tab>
                </Tabs>


                <Container>
                    <Row>
                    <Button id="structureSearchButton" variant="primary" type="submit" size="lg" block onClick={this.handleStructureSubmit}>
                        <FontAwesomeIcon icon="search" fixedWidth/>
                        &nbsp;Submit search
                    </Button>
                    </Row>
                </Container>
                <br/>
                {ajaxIsLoaded && <Row><h2 ref={this.searchResultHeadline}>Search Results</h2></Row>}
                {resultRow}
            </Container>
        );
    }
}
