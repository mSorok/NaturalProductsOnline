import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "../Spinner";
import Error from "../Error";
import Utils from "../../Utils";
import NavigationSidebar from "./NavigationSidebar";
import Overview from "./Overview";
import Representations from "./Representations";
import MolecularProperties from "./MolecularProperties";
import ComputedProperties from "./ComputedProperties";
import CrossReferences from "./CrossReferences";
import KnownStereochemicalVariants from "./KnownStereochemicalVariants";
import References from "./References";
import Synonyms from "./Synonyms";

const React = require("react");
const restClient = require("../../restClient");


export default class NaturalProductCompoundCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            naturalProduct: []
        };
    }

    componentDidMount() {
        const identifier = this.props.match.params.identifier;
        const identifierValue = this.props.match.params.identifierValue;

        this.fetchNaturalProductByIdentifier(identifier, identifierValue);
    }

    fetchNaturalProductByIdentifier(identifier, identifierValue) {
        restClient({
            method: "GET",
            path: "/api/compound/search/findBy" + Utils.capitalize(identifier) + "?" + identifier + "=" + encodeURIComponent(identifierValue)
        }).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    naturalProduct: response.entity._embedded.uniqueNaturalProducts[0]
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            });
    }

    render() {
        const { error, isLoaded, naturalProduct } = this.state;

        if (error) {
            return <Error/>;
        } else if (!isLoaded) {
            return <Spinner/>;
        } else {
            const compoundCardItems = [
                "overview",
                "representations",
                "synonyms",
                "molecular_properties",
                "computed_properties",
                "known_stereochemical_variants",
                "references",
                "cross_references"
                /*

                "species"

                */
            ];

            return (
                <Container>
                    <Row>
                        <Col sm={3}>
                            <NavigationSidebar navigationItems={compoundCardItems} />
                        </Col>
                        <Col sm={9}>
                            <Row id={compoundCardItems[0]} className="compoundCardRow">
                                <Overview naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                            <Row id={compoundCardItems[1]} className="compoundCardRow">
                                <Representations naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                            <Row id={compoundCardItems[2]} className="compoundCardRow">
                                <Synonyms naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                            <Row id={compoundCardItems[3]} className="compoundCardRow">
                                <MolecularProperties naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                            <Row id={compoundCardItems[4]} className="compoundCardRow">
                                <ComputedProperties naturalProduct={naturalProduct}/>
                            </Row>

                            <br/>
                            <Row id={compoundCardItems[5]} className="compoundCardRow">
                                <KnownStereochemicalVariants naturalProduct={naturalProduct}/>
                            </Row>

                            <br/>
                            <Row id={compoundCardItems[6]} className="compoundCardRow">
                                <References naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                            <Row id={compoundCardItems[7]} className="compoundCardRow">
                                <CrossReferences naturalProduct={naturalProduct}/>
                            </Row>
                            <br/>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}