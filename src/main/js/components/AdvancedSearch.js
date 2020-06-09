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

export default class AdvancedSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ajaxError: null,
            ajaxIsLoaded: false,
            ajaxResult: [],


            searchSubmitted: false,
            searchHitsLimit: 100,

        };

        //here all the handles binding
        this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.ajaxIsLoaded) {
            this.scrollToRef(this.searchResultHeadline);
        }
    }

    handleAdvancedSearchSubmit(){

        //here create URLs and doSearch()
        console.log("ready for the search!");
    }

    /*
    here all the handles declarations
     */


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
        return (
            <Container>
                <Row>
                    <h2>Advanced Search</h2>
                </Row>
                <Row>
                    <p>Coming soon....</p>
                </Row>

                <Form>
                    <Form.Label>Molecular formula</Form.Label>
                    <Form.Row>
                        <Col xs={8}>
                            <Form.Control/>
                            <Form.Text className="text-muted">Warning: case sensitive</Form.Text>
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form>



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
                        <Button id="structureSearchButton" variant="primary" type="submit" size="lg" block onClick={this.handleStructureSubmit}>
                            <FontAwesomeIcon icon="search" fixedWidth/>
                            &nbsp;Submit search
                        </Button>
                    </Row>
                </Container>

            </Container>


        );
    }
}