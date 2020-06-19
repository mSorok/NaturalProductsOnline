import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

const React = require("react");


export default class Footer extends React.Component {
    render() {
        return (
            <Container fluid id="footer" className="sticky-bottom border-top">
                <Container className="align-content-center text-muted">

                    <p>COCONUT and Natural Products Online is an open-source open-data repository for natural products. Please submit bug reports, feature requests and general issues through <a target="_blank" rel="noopener noreferrer"  href="https://github.com/mSorok/NaturalProductOnline/issues">the issues tracker at GitHub</a>.
                        COCONUT and Natural Products Online are developed and maintained by the <a target="_blank" rel="noopener noreferrer"  href="https://cheminf.uni-jena.de">Steinbeck group</a> at the University Friedrich-Schiller in Jena, Germany.
                        The code for this web application is released under the MIT license. Copyright &copy; CC-BY-SA 2020</p>

                </Container>

            </Container>
        )
    }
}