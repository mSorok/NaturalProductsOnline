import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkContainer} from "react-router-bootstrap";
import {Redirect, Switch} from "react-router-dom";

const React = require("react");


export default class HeaderSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchSubmitted: false,

            queryString: null,
        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchSubmitKey = this.handleSearchSubmitKey.bind(this);
        this.updateStateFromSearchResult = this.updateStateFromSearchResult.bind(this);


        this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    }


    updateStateFromSearchResult(){
        this.setState({
            searchSubmitted: false,
            queryString: null,
        });
    }

    handleSearchSubmit(e) {
        this.setState({
            searchSubmitted: true,
            queryString: document.getElementById("searchInput").value.replace(/%/g, "jjj")
        });

    }

    handleSearchSubmitKey(e){
        if (e.key === "Enter") {
            this.setState({
                searchSubmitted: true,
                queryString: document.getElementById("searchInput").value.replace(/%/g, "jjj")
            });
        }


    }

    handleSearchStringChange(e){
        this.updateStateFromSearchResult();
    }

    render() {
        return (
            <Row>
                <Col>
                    <Form.Label><small>Find natural products</small></Form.Label>
                    <InputGroup>
                        <Form.Control id="searchInput"
                                      type="text"
                                      placeholder="Name, InChI, formula, COCONUT id, SMILES, chemical class, bioactivity"
                                      onKeyPress={this.handleSearchSubmitKey}
                                      onChange={this.handleSearchStringChange}
                        />
                        <InputGroup.Append>
                            <Button id="searchButton" variant="primary" type="submit" onClick={this.handleSearchSubmit}>
                                <FontAwesomeIcon id="searchButtonIcon" icon="search" fixedWidth/>
                                &nbsp;Search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Text>
                        <LinkContainer to="/search/structure">
                            <a className="text-primary">Structure Search</a>
                        </LinkContainer>
                        <span> | </span>
                        <LinkContainer to="/search/advanced">
                            <a className="text-primary">Advanced Search</a>
                        </LinkContainer>
                    </Form.Text>
                </Col>
                {this.state.searchSubmitted && <Redirect to={"/search/simple/" + encodeURIComponent(this.state.queryString)}/> }

            </Row>


        );
    }
}