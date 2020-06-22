import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";

const React = require("react");


export default class HeaderNavBar extends React.Component {
    render() {
        return (
            <Row id="headerNav">
                <Col>
                    <Nav variant="tabs">
                        <Nav.Item>
                            <LinkContainer to="/" activeClassName="">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink}>Browser</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <LinkContainer to="/browser/table" activeClassName="active">
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon="table" fixedWidth/>
                                        &nbsp;Table Browser
                                    </Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/browser/cards" activeClassName="active">
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon="clipboard-list" fixedWidth/>
                                        &nbsp;Card Browser
                                    </Dropdown.Item>
                                </LinkContainer>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={NavItem}>
                            <Dropdown.Toggle as={NavLink}>Search</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <LinkContainer to="/search/advanced" activeClassName="active">
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon="search-plus" fixedWidth/>
                                        &nbsp;Advanced Search
                                    </Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/search/structure" activeClassName="active">
                                    <Dropdown.Item>
                                        <FontAwesomeIcon icon="atom" fixedWidth/>
                                        &nbsp;Structure Search
                                    </Dropdown.Item>
                                </LinkContainer>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item>
                            <LinkContainer to="/download">
                                <Nav.Link>Download</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/documentation">
                                <Nav.Link>Documentation</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        );
    }
}