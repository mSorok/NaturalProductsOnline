import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const React = require("react");

export default class Introduction extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <p>Welcome to the COlleCtion of Open Natural prodUcTs (COCONUT).</p>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                </Row>
            </Container>
        );
    }
}