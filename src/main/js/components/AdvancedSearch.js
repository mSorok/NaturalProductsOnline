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



export default class AdvancedSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ajaxError: null,
            ajaxIsLoaded: false,
            ajaxResult: [],


            searchSubmitted: false,
            searchHitsLimit: 100,

            advancedSearchModel:{
                listOfSearchItems : []
            },

            molecularFormulaSubmitted: false,
            molecularFormula : "",
            molecularFormulaLogic: "AND",

            molecularWeightSubmitted: false,
            //more...


        };




        //here all the handles binding
        this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
        this.handleSearchHitsLimit = this.handleSearchHitsLimit.bind(this);
        this.handleMolecularFormulaInput = this.handleMolecularFormulaInput.bind(this);
        this.handleMolecularFormulaLogic = this.handleMolecularFormulaLogic.bind(this);

        this.searchResultHeadline = React.createRef();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.ajaxIsLoaded) {
            this.scrollToRef(this.searchResultHeadline);
        }
    }

    handleAdvancedSearchSubmit(){

        console.log("ready for the search!");

        //check if at least one of the fields is set
        if(this.state.molecularFormulaSubmitted || this.state.molecularWeightSubmitted){
            this.setState({
                searchSubmitted: true
            });


            let uriString = "/api/search/advanced?max-hits=" + this.state.searchHitsLimit;

            if(this.state.molecularFormulaSubmitted){
                //uriString+="molecularFormula="+encodeURIComponent(this.state.molecularFormula)+"&"+"mfOA="+encodeURIComponent(this.state.molecularFormulaAO)+"&";

                let advancedSearchItem = {
                    itemType: "molecular_formula",
                    itemValue : this.state.molecularFormula,
                    itemLogic: this.state.molecularFormulaLogic
                };

                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);

            }

            if(this.state.molecularWeightSubmitted){

            }

            //todo more ifs...

            //removing the last &
            //uriString = uriString.slice(0, -1);

            this.doSearch(uriString);


        }
    }


    handleMolecularFormulaInput(e){
        this.state.molecularFormula=e.target.value;
        if(this.state.molecularFormula != "" && this.state.molecularFormula != null) {
            this.state.molecularFormulaSubmitted = true;

        }else{
            this.state.molecularFormulaSubmitted = false;
        }

    }

    handleMolecularFormulaLogic(e){

        this.setState(
            {
                molecularFormulaLogic:e.target.value
            }
        );

    }

    handleSearchHitsLimit(e){
        this.setState(
            {
                searchHitsLimit:e.target.value
            }
        );
    }


    doSearch(searchString) {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(this.state.advancedSearchModel);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(searchString, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    ajaxIsLoaded: true,
                    ajaxResult: result
                });
            })
            .catch(error => {
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

        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted } = this.state;
        let resultRow;


        if (searchSubmitted) {
            console.log("search was submitted!");
                if (ajaxError) {
                    resultRow = <Error/>;
                } else if (!ajaxIsLoaded) {
                    resultRow =
                        <Row className="justify-content-center">
                            <Spinner/>
                            {/*Eventually some message here*/}
                        </Row>
                } else {
                    if (ajaxResult.naturalProducts.length > 0) {
                        resultRow =
                            <>
                                <Row>
                                    <p>Your search returned {ajaxResult.count} results.</p>
                                </Row>
                                <Row>
                                    <CardBrowser naturalProducts={ajaxResult.naturalProducts}/>
                                </Row>
                            </>
                    } else {
                        resultRow = <Row><p>There are no results that match your request.</p></Row>;
                    }
                }

        }



        return (
            <Container>
                <Row>
                    <h2>Advanced Search</h2>
                </Row>

                <Form>
                    <Form.Label>Molecular formula</Form.Label>
                    <Form.Row>
                        <Col xs={10}>
                            <Form.Control onChange={this.handleMolecularFormulaInput}/>
                            <Form.Text className="text-muted">Warning: case sensitive</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="molecular-formula-and-or" as="select" onChange={this.handleMolecularFormulaLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>

                <p>//molecular weight -> weight +/- something
                //monoistotopic mass
                //different calculated properties (min - max)
                //data sources (multiple selection list)
                </p>



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

                    {/*{searchSubmittedButIncorrect}*/}
                    {/*{alertMessage}*/}

                    <Row>
                        <Button id="structureSearchButton" variant="primary" type="submit" size="lg" block onClick={this.handleAdvancedSearchSubmit}>
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