import Introduction from "./Introduction";
import Browser from "./browser/Browser";
import Container from "react-bootstrap/Container";

const React = require("react");


export default class Index extends React.Component {
    render() {
        return (
            <Container>
                <Introduction />
                <br/>
                <Browser />
            </Container>
        );
    }
}