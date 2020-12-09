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
import Utils from "../Utils";

import RangeSlider from 'react-bootstrap-range-slider';
import NetworkError from "./NetworkError";


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
            ajaxErrorStatus: "",

            resultIsRendered:false,

            inputType: "draw",

            searchSubmitted: false,
            searchSubmittedButIncorrect:false,
            searchHitsLimit: 100,

            searchSubmittedAndSent:false,

            searchType: "exact", //substructure OR similarity


            exactMatchType: "inchi",

            smilesCorrect:false,


            substructureSearchType: "default",

            stringInput: "",

            similarityThreshold : 90,



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

        this.handleSDFDownload = this.handleSDFDownload.bind(this);

        this.handleSimilarityThreshold = this.handleSimilarityThreshold.bind(this);




        this.searchResultHeadline = React.createRef();
        this.spinnerRef = React.createRef();

        this.allChangeRef = React.createRef();
    }




    componentDidMount() {
        this.editor = OpenChemLib.StructureEditor.createSVGEditor("structureSearchEditor", 1);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if(this.state.searchSubmitted){
            this.scrollToRef(this.allChangeRef);
        }


    }

    handleSDFDownload(e, npList) {
        e.preventDefault();

        const download = document.createElement("a");

        download.setAttribute("href", "data:chemical/x-mdl-molfile;charset=utf-8," + encodeURIComponent(Utils.getSDFileStringByNPList(npList)));
        download.setAttribute("download", "coconut_structure_search_result.sdf");
        download.style.display = "none";

        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);


    }

    handleExactMatchTypeSelect(e){
        if(e.target.value=="inchi"){
            //console.log("I'm in inchi");
            this.state.exactMatchType="inchi";

        }else if(e.target.value=="smi") {
            //console.log("I'm in smi");
            this.state.exactMatchType="smiles";
        }
    }

    handleSubstructureSearchTypeSelect(e){
        if(e.target.value=="sub-def"){
            //console.log("I'm in sub-def");
            this.state.substructureSearchType="default";

        }else if(e.target.value=="vf") {
            //console.log("I'm in vf");
            this.state.substructureSearchType="vf";
        }else if(e.target.value=="df") {
            //console.log("I'm in df");
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

        console.log("handling submit");

        //console.log(this.state);
        if(!this.state.searchSubmittedAndSent) {

            let structureAsSmiles = "";
            if (this.state.inputType == "draw") {
                structureAsSmiles = this.editor.getSmiles();
            } else if (this.state.inputType == "paste") {
                structureAsSmiles = this.state.stringInput;
            }


            // testing if SMILES is correct (prevents entering random stuff for searching)
            if(! /^([^J][a-z0-9@+\-\[\]\(\)\\\/%=#$]{6,})$/ig.test(structureAsSmiles)){
                alert("The molecule you pasted is not in a recognized structure format!")
            }else {



                if (structureAsSmiles != null && structureAsSmiles != "" && structureAsSmiles != " ") {


                    this.setState({
                        searchSubmitted: true,
                        resultIsRendered:false
                    });

                    this.state.smilesCorrect = true;
                    this.state.searchSubmittedButIncorrect = false;

                    if (this.state.searchType == "exact") {
                        if (this.state.exactMatchType == "inchi") {
                            this.doSearch("/api/search/exact-structure?type=inchi&smiles=", encodeURIComponent(structureAsSmiles));
                        } else {
                            this.doSearch("/api/search/exact-structure?type=smi&smiles=", encodeURIComponent(structureAsSmiles));
                        }

                    } else if (this.state.searchType == "substructure") {
                        if (this.state.substructureSearchType == "default") {
                            this.doSearch("/api/search/substructure?type=default&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                        } else if (this.state.substructureSearchType == "df") {
                            this.doSearch("/api/search/substructure?type=uit&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                        } else {
                            this.doSearch("/api/search/substructure?type=vf&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                        }


                    } else if (this.state.searchType == "similarity") {

                        //console.log("detected similarity");
                        //console.log(this.state.similarityThreshold);

                        this.doSearch("/api/search/similarity?simThreshold=" + this.state.similarityThreshold + "&max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));


                    } else {
                        this.doSearch("/api/search/exact-structure?max-hits=" + this.state.searchHitsLimit + "&smiles=", encodeURIComponent(structureAsSmiles));
                    }

                }
                else {
                    //console.log("you need to submit a valid molecule!");
                    alert("Please submit a valid molecule!");
                    this.state.smilesCorrect = false;
                    this.state.searchSubmittedButIncorrect = true;
                    this.setState({
                        searchSubmittedButIncorrect: true
                    });
                }
            }
        }else{
            //console.log("wait till the previous query returns or open a new tab!");
            alert("Please, wait the completion of the running query or run a new query in a new window!");
        }
    }



    handleCloseAlert(){
        this.state.searchSubmittedButIncorrect=false;
    }



    handleSimilarityThreshold(e){

        this.setState({
            similarityThreshold : Number(e.target.value)
        });
        //this.state.similarityThreshold = e.target.value;
        //setValue(Number(e.target.value));
    }



    handleInputType(key){
        if(key==="draw"){
            this.state.inputType = "draw";
            this.state.stringInput= "";
        }else{
            this.state.inputType = "paste";
            this.editor.setSmiles("");
        }
    }

    handleStringInput(e){
        this.state.stringInput=e.target.value;
    }

    handleSearchTypeSelect(key){
        if(key==="exact-match"){
            this.setState(
                {
                    searchType :"exact",
                    //exactMatch:true,
                    //substructureSearch: false,
                    //similaritySearch: false

                }
            );
        }
        if(key==="substructure-search"){
            //console.log("substructure");
            this.setState(
                {
                    searchType :"substructure",
                    //exactMatch:false,
                    //substructureSearch: true,
                    //similaritySearch: false

                }
            );
        }

        if(key==="similarity-search"){
            this.setState(
                {
                    searchType :"similarity",
                    //exactMatch:false,
                    //substructureSearch: false,
                    //similaritySearch: true

                }
            );
        }

    }





    doSearch(path, searchString) {
        console.log("do search called!");

        this.setState({searchSubmittedAndSent:true});
        restClient({
            method: "GET",
            path: path + encodeURIComponent(searchString)
        }).then(
            (response) => {
                this.setState({
                    ajaxIsLoaded: true,
                    ajaxResult: response.entity,
                    searchSubmittedAndSent:false,
                    ajaxErrorStatus:""
                });
            },
            (error) => {
                if (!error.response) {
                    // network error
                    this.state.ajaxErrorStatus = 'network';
                } else {
                    this.setState({
                        ajaxIsLoaded: true,
                        ajaxError: error,
                        searchSubmittedAndSent:false,
                        ajaxErrorStatus:""
                    });
                }


            });
    }

    scrollToRef(ref) {
        window.scrollTo(0, ref.current.offsetTop);
    }



    render() {
        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted, searchSubmittedButIncorrect, searchType, fullExactMatch, bondTypeFreeExactMatch, smilesCorrect } = this.state;
        let resultRow;
        let alertMessage;

        console.log("before");
        console.log(this.state);

        //console.log(ajaxResult);

        if (searchSubmitted) {
            if(smilesCorrect){
                if (ajaxError) {
                    if (this.state.ajaxErrorStatus === "") {

                        resultRow =
                            <>
                                <Row ref={this.allChangeRef}>
                                    <Error/>
                                </Row>
                            </>;
                    }else{
                        resultRow =
                            <>
                                <Row ref={this.allChangeRef}>
                                    <NetworkError/>
                                </Row>
                            </>;
                    }
                    this.state.ajaxIsLoaded = false;
                    this.state.ajaxError = null;
                    this.state.searchSubmitted=false;

                } else if (!ajaxIsLoaded) {
                    resultRow =
                        <>
                            <Row><h2>Search running</h2></Row>
                            <Row className="justify-content-center" ref={this.allChangeRef}>
                                <Spinner/>
                                {searchType=="substructure" &&
                                <p>Note: The substructure search might be long if the input molecule is small.</p>}
                                {searchType=="similarity" && <p>Note: The similarity search can be long.</p>}
                            </Row>
                        </>;
                } else {
                    let npList = [...ajaxResult.naturalProducts];
                    if (ajaxResult.naturalProducts.length > 0) {
                        resultRow =
                            <>
                                <Row ref={this.allChangeRef}><h2>Search Results</h2></Row>
                                <Row>
                                    <Col>
                                        <p>Your search for "{ajaxResult.originalQuery}" returned {ajaxResult.count} hits.</p>
                                    </Col>
                                    <Col md="auto">
                                        <Button id="downloadSDFfile" variant="outline-primary" size="sm" onClick={(e) => this.handleSDFDownload(e, npList)}>
                                            <FontAwesomeIcon icon="file-download" fixedWidth/>
                                            &nbsp;Download SDF
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <CardBrowser naturalProducts={ajaxResult.naturalProducts}/>
                                </Row>
                            </>;
                    } else {
                        resultRow = <Row><p>There are no results that match your structure.</p></Row>;
                    }
                    this.state.ajaxIsLoaded = false;
                    this.state.resultIsRendered = true;
                    this.state.searchSubmitted = false;

                    console.log(this.state);
                }
            }
        }
        else if(searchSubmittedButIncorrect){
            //console.log("trying to pop an alert");
            this.state.searchSubmitted = false;
            this.state.searchSubmittedButIncorrect = true;
            alert("Warning! You need to draw or paste a molecular structure!");
            //alertMessage = <Alert variant="danger" > Warning! You need to draw or paste a molecular structure! </Alert>;
        }
        console.log("after");
        console.log(this.state);

        return (
            <Container>


                <Row>
                    <h2>Structure Search</h2>
                </Row>
                <br/>


                <Tabs defaultActiveKey="draw" id="select-input-type" onSelect={this.handleInputType}>


                    <Tab eventKey="paste" title="Paste structure">
                        <Form>
                            <Form.Group controlId="molecularStructureString">
                                <Form.Label>Paste molecule</Form.Label>
                                <Form.Control onChange={this.handleStringInput} />
                                <Form.Text className="text-muted">SMILES</Form.Text> {/*in the future: , InChI, COCONUT id, name*/}
                            </Form.Group>
                        </Form>


                    </Tab>


                    <Tab eventKey="draw" title="Draw structure">

                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <br/>
                                <p>Use the editor to draw your structure</p>
                            </Col>
                            <Col xs lg="2">
                                <br/>
                                <Button id="structureSearchDrawExampleButton" type="submit" onClick={this.handleDesireForCoffee}>
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



                </Tabs>



                <br/>

                <Tabs defaultActiveKey="exact-match" id="select-search-type" onSelect={this.handleSearchTypeSelect} >


                    <Tab eventKey="exact-match" title="Exact match" >

                        <br/>
                        <Form>
                            <h4 >Exact match type: using InChI (recommended) or SMILES</h4>
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
                        <br/>

                        <Form>
                            <h4 >Substructure matching algorithm</h4>
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

                    <Tab eventKey="similarity-search" title="Similarity search" >
                        <br/>

                        <Form>
                            <Form.Row>
                                <Col>
                                    <h4 >Select Tanimoto similarity threshold (in %)</h4>
                                    <Form.Group controlId="tanimotoThreshold"  as={Row}>
                                        <Col xs="11">


                                            <RangeSlider
                                                value={this.state.similarityThreshold}
                                                onChange={this.handleSimilarityThreshold}
                                                tooltip='auto'
                                            />

                                        </Col>
                                        <Col xs="1">
                                            <Form.Control value={this.state.similarityThreshold} onChange={this.handleSimilarityThreshold}/>
                                        </Col>

                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>


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

                {resultRow}
            </Container>
        );
    }

}
