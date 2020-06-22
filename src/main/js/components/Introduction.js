import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

const React = require("react");

export default class Introduction extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <p>Natural Products Online is an open source project for Natural Products (NPs) storage, search and analysis. The present version hosts COCONUT, the
                    COlleCtion of Open Natural ProdUcTs, one of the biggest and best annotated resources for NPs available free of charge and without any restriction.</p>
                </Row>
            </Container>
        );
    }
}