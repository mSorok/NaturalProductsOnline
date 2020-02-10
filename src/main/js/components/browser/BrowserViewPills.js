import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const React = require("react");


export default class BrowserViewPills extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav variant="pills">
                <Nav.Item>
                    <LinkContainer to="/browser/cards" activeClassName="active" isActive={() => this.props.location.pathname === "/" || this.props.location.pathname === "/browser/cards"}>
                        <Nav.Link>
                            <FontAwesomeIcon icon="clipboard-list" fixedWidth/>
                            &nbsp;Cards
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/browser/table" activeClassName="active">
                        <Nav.Link>
                            <FontAwesomeIcon icon="table" fixedWidth/>
                            &nbsp;Table
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    }
}