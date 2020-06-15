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
            molecularWeight : 0,
            molecularWeightRange: 0,
            molecularWeightLogic: "AND",

            heavyAtomsSubmitted:false,
            heavyAtoms: 0,
            heavyAtomsRange:0,
            heavyAtomsLogic:"AND",

            numberOfCarbonsSubmitted: false,
            numberOfCarbons: 0,
            numberOfCarbonsRange: 0,
            numberOfCarbonsLogic: "AND",

            numberOfOxygensSubmitted: false,
            numberOfOxygens: 0,
            numberOfOxygensRange: 0,
            numberOfOxygensLogic: "AND",

            numberOfNitrogensSubmitted: false,
            numberOfNitrogens: 0,
            numberOfNitrogensRange: 0,
            numberOfNitrogensLogic: "AND",

            numberOfRingsSubmitted: false,
            numberOfRings : 0,
            numberOfRingsRange: 0,
            numberOfRingsLogic: "AND",

            containSugarsSubmitted : false,
            containSugars :"indifferent",
            containSugarsLogic: "AND",



        };




        //here all the handles binding
        this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
        this.handleSearchHitsLimit = this.handleSearchHitsLimit.bind(this);
        this.handleMolecularFormulaInput = this.handleMolecularFormulaInput.bind(this);
        this.handleMolecularFormulaLogic = this.handleMolecularFormulaLogic.bind(this);

        this.handleMolecularWeightInput = this.handleMolecularWeightInput.bind(this);
        this.handleMolecularWeightRangeInput = this.handleMolecularWeightRangeInput.bind(this);
        this.handleMolecularWeightLogic = this.handleMolecularWeightLogic.bind(this);

        this.handleNumberHeavyAtomsInput = this.handleNumberHeavyAtomsInput.bind(this);
        this.handleNumberHeavyAtomsRangeInput = this.handleNumberHeavyAtomsRangeInput.bind(this);
        this.handleNumberHeavyAtomsLogic = this.handleNumberHeavyAtomsLogic.bind(this);


        this.handleNumberOfCarbonsInput = this.handleNumberOfCarbonsInput.bind(this);
        this.handleNumberOfCarbonsRangeInput = this.handleNumberOfCarbonsRangeInput.bind(this);
        this.handleNumberOfCarbonsLogic = this.handleNumberOfCarbonsLogic.bind(this);

        this.handleNumberOfOxygensInput = this.handleNumberOfOxygensInput.bind(this);
        this.handleNumberOfOxygensRangeInput = this.handleNumberOfOxygensRangeInput.bind(this);
        this.handleNumberOfOxygensLogic = this.handleNumberOfOxygensLogic.bind(this);

        this.handleNumberOfNitrogensInput = this.handleNumberOfNitrogensInput.bind(this);
        this.handleNumberOfNitrogensRangeInput = this.handleNumberOfNitrogensRangeInput.bind(this);
        this.handleNumberOfNitrogensLogic = this.handleNumberOfNitrogensLogic.bind(this);

        this.handleContainsSugars = this.handleContainsSugars.bind(this);
        this.handleContainSugarsLogic = this.handleContainSugarsLogic.bind(this);


        this.handleNumberOfRingsInput = this.handleNumberOfRingsInput.bind(this);
        this.handleNumberOfRingsRangeInput = this.handleNumberOfRingsRangeInput.bind(this);
        this.handleNumberOfRingsLogic = this.handleNumberOfRingsLogic.bind(this);


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
        if(this.state.molecularFormulaSubmitted || this.state.molecularWeightSubmitted || this.state.heavyAtomsSubmitted || this.state.numberOfCarbonsSubmitted
        || this.state.numberOfOxygensSubmitted || this.state.numberOfNitrogensSubmitted || this.state.numberOfRingsSubmitted || this.state.containSugarsSubmitted){
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
                let advancedSearchItem = {
                    itemType: "molecular_weight",
                    itemValue : this.state.molecularWeight,
                    itemRange: this.state.molecularWeightRange,
                    itemLogic: this.state.molecularWeightLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            if(this.state.heavyAtomsSubmitted){
                let advancedSearchItem = {
                    itemType: "heavy_atom_number",
                    itemValue : this.state.heavyAtoms,
                    itemRange: this.state.heavyAtomsRange,
                    itemLogic: this.state.heavyAtomsLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            if(this.state.numberOfCarbonsSubmitted){
                let advancedSearchItem = {
                    itemType: "number_of_carbons",
                    itemValue : this.state.numberOfCarbons,
                    itemRange: this.state.numberOfCarbonsRange,
                    itemLogic: this.state.numberOfCarbonsLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            if(this.state.numberOfOxygensSubmitted){
                let advancedSearchItem = {
                    itemType: "number_of_oxygens",
                    itemValue : this.state.numberOfOxygens,
                    itemRange: this.state.numberOfOxygensRange,
                    itemLogic: this.state.numberOfOxygensLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            if(this.state.numberOfNitrogensSubmitted){
                let advancedSearchItem = {
                    itemType: "number_of_nitrogens",
                    itemValue : this.state.numberOfNitrogens,
                    itemRange: this.state.numberOfNitrogensRange,
                    itemLogic: this.state.numberOfNitrogensLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            if(this.numberOfRingsSubmitted){
                let advancedSearchItem = {
                    itemType: "number_of_rings",
                    itemValue : this.state.numberOfRings,
                    itemRange: this.state.numberOfRingsRange,
                    itemLogic: this.state.numberOfRingsLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);

            }

            if(this.containSugarsSubmitted){
                let advancedSearchItem = {
                    itemType: "contains_sugars",
                    itemValue : this.state.containSugars,
                    itemLogic: this.state.containSugarsLogic
                };
                this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
            }

            //todo more ifs...


            this.doSearch(uriString);


        }
    }




    /**
     * CARBONS, OXYGENS, NITROGENS
     * @param e
     */
    handleNumberOfCarbonsInput(e){
        this.state.numberOfCarbons = e.target.value;
        if(this.state.numberOfCarbons != "" && this.state.numberOfCarbons != null && this.state.numberOfCarbons != 0) {
            this.state.numberOfCarbonsSubmitted = true;

        }else{
            this.state.numberOfCarbonsSubmitted = false;
        }
    }

    handleNumberOfCarbonsRangeInput(e){
        this.state.numberOfCarbonsRange = e.target.value;

        if(this.state.numberOfCarbonsRange == "" || this.state.numberOfCarbonsRange == null){
            this.state.numberOfCarbonsRange=0;
        }
    }

    handleNumberOfCarbonsLogic(e){
        this.setState(
            {
                numberOfCarbonsLogic:e.target.value
            }
        );

    }


    handleNumberOfOxygensInput(e){
        this.state.numberOfOxygens = e.target.value;
        if(this.state.numberOfOxygens != "" && this.state.numberOfOxygens != null && this.state.numberOfOxygens != 0) {
            this.state.numberOfOxygensSubmitted = true;

        }else{
            this.state.numberOfOxygensSubmitted = false;
        }
    }

    handleNumberOfOxygensRangeInput(e){
        this.state.numberOfOxygensRange = e.target.value;

        if(this.state.numberOfOxygensRange == "" || this.state.numberOfOxygensRange == null){
            this.state.numberOfOxygensRange=0;
        }
    }

    handleNumberOfOxygensLogic(e){
        this.setState(
            {
                numberOfOxygensLogic:e.target.value
            }
        );
    }

    handleNumberOfNitrogensInput(e){
        this.state.numberOfNitrogens = e.target.value;
        if(this.state.numberOfNitrogens != "" && this.state.numberOfNitrogens != null && this.state.numberOfNitrogens != 0) {
            this.state.numberOfNitrogensSubmitted = true;

        }else{
            this.state.numberOfNitrogensSubmitted = false;
        }
    }

    handleNumberOfNitrogensRangeInput(e){
        this.state.numberOfNitrogenssRange = e.target.value;

        if(this.state.numberOfNitrogenssRange == "" || this.state.numberOfNitrogenssRange == null){
            this.state.numberOfNitrogenssRange=0;
        }
    }

    handleNumberOfNitrogensLogic(e){
        this.setState(
            {
                numberOfNitrogensLogic:e.target.value
            }
        );
    }

    handleNumberOfRingsInput(e){
        this.state.numberOfRings = e.target.value;
        if(this.state.numberOfRings != "" && this.state.numberOfRings != null && this.state.numberOfRings != 0) {
            this.state.numberOfRingsSubmitted = true;

        }else{
            this.state.numberOfRingsSubmitted = false;
        }

    }

    handleNumberOfRingsRangeInput(e){
        this.state.numberOfRingsRange = e.target.value;

        if(this.state.numberOfRingsRange == "" || this.state.numberOfRingsRange == null){
            this.state.numberOfRingsRange=0;
        }
    }

    handleNumberOfRingsLogic(e){
        this.setState(
            {
                numberOfRingsLogic:e.target.value
            }
        );
    }




    /**
     * Molecular weight
     * @param e
     */

    handleMolecularWeightInput(e){
        this.state.molecularWeight = e.target.value;
        if(this.state.molecularWeight != "" && this.state.molecularWeight != null && this.state.molecularWeight != 0) {
            this.state.molecularWeightSubmitted = true;

        }else{
            this.state.molecularWeightSubmitted = false;
        }
    }

    handleMolecularWeightRangeInput(e){
        this.state.molecularWeightRange = e.target.value;

        if(this.state.molecularWeightRange == "" || this.state.molecularWeightRange == null){
            this.state.molecularWeightRange=0;
        }
    }

    handleMolecularWeightLogic(e){
        this.setState(
            {
                molecularWeightLogic:e.target.value
            }
        );

    }

    handleNumberHeavyAtomsInput(e){
        this.state.heavyAtoms = e.target.value;
        if(this.state.heavyAtoms != "" && this.state.heavyAtoms != null && this.state.heavyAtoms != 0) {
            this.state.heavyAtomsSubmitted = true;

        }else{
            this.state.heavyAtomsSubmitted = false;
        }
    }

    handleNumberHeavyAtomsRangeInput(e){
        this.state.heavyAtomsRange = e.target.value;

        if(this.state.heavyAtomsRange == "" || this.state.heavyAtomsRange == null){
            this.state.heavyAtomsRange=0;
        }
    }

    handleNumberHeavyAtomsLogic(e){
        this.setState(
            {
                heavyAtomsLogic:e.target.value
            }
        );
    }

    handleContainsSugars(e){
        this.state.containSugars = e.target.value;
        if(this.state.containSugars != "" && this.state.containSugars != null && this.state.containSugars != 0) {
            this.state.containSugarsSubmitted = true;

        }else{
            this.state.containSugarsSubmitted = false;
        }
    }

    handleContainSugarsLogic(e){
        this.setState(
            {
                containSugarsLogic:e.target.value
            }
        );
    }



    /**
     * Molecular Formula
     * */

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


    /**************************************************************/


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

                <br/>
                <h3>Structural properties</h3>
                <br/>
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

                <Form>
                    <Form.Label>Molecular weight</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleMolecularWeightInput}/>
                            <Form.Text className="text-muted"></Form.Text>
                        </Col>
                        <Col>
                            <Form.Control onChange={this.handleMolecularWeightRangeInput}/>
                            <Form.Text className="text-muted">Search range</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="molecular-weight-and-or" as="select" onChange={this.handleMolecularWeightLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>

                <Form>
                    <Form.Label>Number of heavy atoms</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleNumberHeavyAtomsInput}/>
                            <Form.Text className="text-muted"></Form.Text>
                        </Col>
                        <Col>
                            <Form.Control onChange={this.handleNumberHeavyAtomsRangeInput}/>
                            <Form.Text className="text-muted">Search range</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="heavy-atoms-and-or" as="select" onChange={this.handleNumberHeavyAtomsLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>

                <Form>
                    <Form.Label>Number of carbons</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleNumberOfCarbonsInput}/>
                            <Form.Text className="text-muted"></Form.Text>
                        </Col>
                        <Col>
                            <Form.Control onChange={this.handleNumberOfCarbonsRangeInput}/>
                            <Form.Text className="text-muted">Search range</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfCarbonsLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>

                <Form>
                    <Form.Label>Number of oxygens</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleNumberOfOxygensInput}/>
                            <Form.Text className="text-muted"></Form.Text>
                        </Col>
                        <Col>
                            <Form.Control onChange={this.handleNumberOfOxygensRangeInput}/>
                            <Form.Text className="text-muted">Search range</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfOxygensLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>

                <Form>
                    <Form.Label>Number of nitrogens</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control onChange={this.handleNumberOfNitrogensInput}/>
                            <Form.Text className="text-muted"></Form.Text>
                        </Col>
                        <Col>
                            <Form.Control onChange={this.handleNumberOfNitrogensRangeInput}/>
                            <Form.Text className="text-muted">Search range</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfNitrogensLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>


                <Row>
                    <Col>
                        <Form>
                            <Form.Label>Contain sugars</Form.Label>
                            <Form.Row>
                                <Col>
                                    <Form.Control name="contain-sugars" as="select" onChange={this.handleContainsSugars}>
                                        <option value="indifferent">Indifferent</option>
                                        <option value="any_sugar">Any sugar type</option>
                                        <option value="ring_sugar">Ring sugars</option>
                                        <option value="only_ring_sugar">Only ring sugars</option>
                                        <option value="linear_sugar">Linear sugars</option>
                                        <option value="only_linear_sugar">Only linear sugars</option>
                                        <option value="no_sugar">No sugar</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control name="contain-sugars-and-or" as="select" onChange={this.handleContainSugarsLogic}>
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Label>Number of rings</Form.Label>
                            <Form.Row>
                                <Col xs={8}>
                                    <Form.Control onChange={this.handleNumberOfRingsInput}/>
                                    <Form.Text className="text-muted">Min and max number of rings to search</Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control onChange={this.handleNumberOfRingsRangeInput}/>
                                    <Form.Text className="text-muted">Search range</Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfRingsLogic}>
                                        <option value="AND">AND</option>
                                        <option value="OR">OR</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>

                </Row>

                <br/>
                <br/>

                <br/>
                <h3>Molecular descriptors</h3>
                <br/>

                NP-likeness score
                apol
                ..




                <h3>Data sources</h3>
                <p>
                    TODO data sources (multiple selection list)
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