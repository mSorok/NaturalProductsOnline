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
import Alert from "react-bootstrap/Alert";


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
            newQuery:true, //TODO

            inputType: "draw",

            searchSubmitted: false,
            searchSubmittedButIncorrect:false,
            searchHitsLimit: 100,

            exactMatch: true,
            exactMatchType: "inchi",

            smilesCorrect:false,


            substructureSearch: false,
            substructureSearchType: "default",

            stringInput: "",


            similaritySearch: false
        };

        this.handleSearchHitsLimit = this.handleSearchHitsLimit.bind(this);

        this.handleDesireForCoffee = this.handleDesireForCoffee.bind(this);
        this.handleEditorClearing = this.handleEditorClearing.bind(this);
        this.handleStructureSubmit = this.handleStructureSubmit.bind(this);

        this.handleSearchTypeSelect = this.handleSearchTypeSelect.bind(this);

        this.handleExactMatchTypeSelect = this.handleExactMatchTypeSelect.bind(this);

        this.handleSubstructureSearchTypeSelect = this.handleSubstructureSearchTypeSelect.bind(this);

        this.handleCloseAlert = this.handleCloseAlert.bind(this);

        this.handleInputType = this.handleInputType.bind(this);

        this.handleStringInput = this.handleStringInput.bind(this);



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

    handleExactMatchTypeSelect(e){
        if(e.target.value=="inchi"){
            console.log("I'm in inchi");
            this.state.exactMatchType="inchi";

        }else if(e.target.value=="smi") {
            console.log("I'm in smi");
            this.state.exactMatchType="smiles";
        }
    }

    handleSubstructureSearchTypeSelect(e){
        if(e.target.value=="sub-def"){
            console.log("I'm in sub-def");
            this.state.substructureSearchType="default";

        }else if(e.target.value=="vf") {
            console.log("I'm in vf");
            this.state.substructureSearchType="vf";
        }else if(e.target.value=="df") {
            console.log("I'm in df");
            this.state.substructureSearchType="df";
        }
    }





    handleSearchHitsLimit(e){
        this.setState(
            {
                searchHitsLimit:e.target.value
            }
        );
    }

    handleDesireForCoffee() {
        const caffeineCleanSmiles = "O=C1C2=C(N=CN2C)N(C(=O)N1C)C";
        this.editor.setSmiles(caffeineCleanSmiles);
    }

    handleEditorClearing(){
        this.editor.setSmiles("");
    }

    handleStructureSubmit() {

        let structureAsSmiles = "";
        if(this.state.inputType=="draw"){
            structureAsSmiles = this.editor.getSmiles();
        }else if(this.state.inputType=="paste"){
            structureAsSmiles = this.state.stringInput;
        }



        //TODO test if SMILES (or other Inchi and co)
        
        if (structureAsSmiles != null && structureAsSmiles != "" && structureAsSmiles != " ") {


            this.setState({
                searchSubmitted: true
            });

            this.state.smilesCorrect = true;
            this.state.searchSubmittedButIncorrect = false;

            if (this.state.exactMatch) {
                if (this.state.exactMatchType == "inchi") {
                    this.doSearch("/api/search/exact-structure?type=inchi&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                } else {
                    this.doSearch("/api/search/exact-structure?type=smi&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                }

            } else if (this.state.substructureSearch) {
                if (this.state.substructureSearchType == "dafault") {
                    this.doSearch("/api/search/substructure?type=default&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                } else if (this.state.substructureSearchType == "df") {
                    this.doSearch("/api/search/substructure?type=uit&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                } else {
                    this.doSearch("/api/search/substructure?type=vf&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                }
            } else {
                this.doSearch("/api/search/exact-structure?max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
            }

        }
        else{
            console.log("you need to submit a valid molecule!")
            this.state.smilesCorrect = false;
            this.state.searchSubmittedButIncorrect = true;
            this.setState({
                searchSubmittedButIncorrect: true
            });
        }

    }



    handleCloseAlert(){
        this.state.searchSubmittedButIncorrect=false;
    }



    handleInputType(key){
        if(key==="draw"){
            this.state.inputType = "draw";
        }else{
            this.state.inputType = "paste";
        }
    }

    handleStringInput(e){
        this.state.stringInput=e.target.value;
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
        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted, searchSubmittedButIncorrect, exactMatch, fullExactMatch, bondTypeFreeExactMatch, substructureSearch, similaritySearch, smilesCorrect } = this.state;
        let resultRow;
        let alertMessage;

        if (searchSubmitted) {
            if(smilesCorrect){
                if (ajaxError) {
                    resultRow = <Error/>;
                } else if (!ajaxIsLoaded) {
                    resultRow =
                        <Row className="justify-content-center">
                            <Spinner/>
                            {substructureSearch &&
                            <p>Note: The substructure search might be long if the input molecule is small.</p>}
                            {similaritySearch && <p>Note: The similarity search can be long.</p>}
                        </Row>
                } else {
                    if (ajaxResult.naturalProducts.length > 0) {
                        resultRow =
                            <>
                                <Row>
                                    <p>Your search for "{ajaxResult.originalQuery}" yielded {ajaxResult.count} results.</p>
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
        }
        else if(searchSubmittedButIncorrect){
            console.log("trying to pop an alert");
            this.state.searchSubmitted = false;
            this.state.searchSubmittedButIncorrect = true;
            alertMessage = <Alert variant="danger" > Warning! You need to draw or paste a molecular structure! </Alert>;
        }

        return (
            <Container>


                <Row>
                    <h2>Structure Search</h2>
                </Row>
                <br/>


                <Tabs defaultActiveKey="draw" id="select-input-type" onSelect={this.handleInputType}>
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




                    <Tab eventKey="paste" title="Paste structure">
                        <Form>
                            <Form.Group controlId="molecularStructureString">
                                <Form.Label>Paste molecule</Form.Label>
                                <Form.Control onChange={this.handleStringInput} />
                                <Form.Text className="text-muted">SMILES, InChI, COCONUT id, name</Form.Text>
                            </Form.Group>
                        </Form>


                    </Tab>
                </Tabs>



                <br/>

                <Tabs defaultActiveKey="exact-match" id="select-search-type" onSelect={this.handleSearchTypeSelect} >


                    <Tab eventKey="exact-match" title="Exact match" >


                        <Form>
                            <Form.Group>
                                <div key="exact-match-type" className="lg-8">
                                    <Form.Check
                                        name='ext-radios'
                                        type="radio"
                                        label="Exact match (by InChI)"
                                        id="inch"
                                        value="inch"
                                        defaultChecked
                                        onChange={this.handleExactMatchTypeSelect}
                                    />

                                    <Form.Check
                                        name='ext-radios'
                                        type="radio"
                                        label="Exact match (by canonical SMILES)"
                                        id="smi"
                                        value="smi"
                                        onChange={this.handleExactMatchTypeSelect}
                                    />

                                </div>
                            </Form.Group>
                        </Form>


                    </Tab>



                    <Tab eventKey="substructure-search" title="Substructure search" >


                        <Form>
                            <Form.Group>
                                <div key="substructure-match-type" className="lg-8">
                                    <Form.Check
                                        name='sub-radios'
                                        type="radio"
                                        label="Default substructure search (Ullmann algorithm)"
                                        id="sub-def"
                                        value="sub-def"
                                        defaultChecked
                                        onChange={this.handleSubstructureSearchTypeSelect}
                                    />

                                    <Form.Check
                                        name='sub-radios'
                                        type="radio"
                                        label="Substructure search with depth-first (DF) pattern"
                                        id="df"
                                        value="df"
                                        onChange={this.handleSubstructureSearchTypeSelect}
                                    />

                                    <Form.Check
                                        name='sub-radios'
                                        type="radio"
                                        label="Substructure search with Vento-Foggia algorithm"
                                        id="vf"
                                        value="vf"
                                        onChange={this.handleSubstructureSearchTypeSelect}
                                    />



                                </div>
                            </Form.Group>
                        </Form>



                    </Tab>
                    <Tab eventKey="similarity-search" title="Similarity search" disabled>
                        <p>Here will be radio buttons for similarity search params</p>
                    </Tab>
                </Tabs>


                <Container>
                    <Row>
                        <Form>
                            <Form.Group controlId="search-hits-limit">
                                <br/>
                                <Form.Control as="select" size="lg" name="control-hits-limit" onChange={this.handleSearchHitsLimit}  >
                                    <option value="100">100</option>
                                    <option value="250">250</option>
                                    <option value="1000">1000</option>
                                    <option value="10000">10000 (can be long)</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Row>

                    {searchSubmittedButIncorrect}
                    {alertMessage}

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
