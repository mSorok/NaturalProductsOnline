import Nav from "react-bootstrap/Nav";
import {HashRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import Utils from "../../Utils";

const React = require("react");


export default class NavigationSidebar extends React.Component {
    render() {
        const navigationItems = [];
        this.props.navigationItems.map((item) => {
            // make sure item is string when using string function on it
            if (typeof(item) === "string" && item != "") {
                navigationItems.push(
                    <LinkContainer key={item} to={item}>
                        <Nav.Link className="text-primary">{Utils.capitalize(item.replace(/_/g, " "))}</Nav.Link>
                    </LinkContainer>
                );
            }
        });

        return (
            <Nav className="flex-column" id="compoundCardSidebar">
                <HashRouter hashType="noslash">
                    {navigationItems}
                </HashRouter>
            </Nav>
        );
    }
}