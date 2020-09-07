import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Utils from "../../Utils";
const React = require("react");


export default class MolecularDescriptors extends React.Component {
    createRowWithOverlayTooltip(name, value, tooltiptext) {
        return (
            <tr>
                <OverlayTrigger key={name + "Overlay"} placement="top" overlay={
                    <Tooltip id={name + "Tooltip"}>{tooltiptext}</Tooltip>
                }>
                    <td>{Utils.capitalize(name)} <FontAwesomeIcon icon="question-circle" fixedWidth/></td>
                </OverlayTrigger>
                <td>{value}</td>
            </tr>
        );
    }

    createSimpleRow(name, value) {
        return (
            <tr>
                <td>{Utils.capitalize(name)}</td>
                <td>{value}</td>
            </tr>
        );
    }

    render() {
        const naturalProduct = this.props.naturalProduct;

        const bcutDescriptor = [];
        naturalProduct.bcutDescriptor.map((item, index) => {
            bcutDescriptor.push(<li key={index}>{item}</li>);
        });

        return (
            <Card  className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Molecular Descriptors</Card.Title>
                    <br />
                    <Table size="sm">
                        <tbody>
                        {this.createRowWithOverlayTooltip("NP-likeness score",  Math.round((naturalProduct.npl_score + Number.EPSILON) * 100) / 100 , "The likelihood of the compound to be a natural product, ranges from -5 (less likely) to 5 (very likely.")}

                        {this.createSimpleRow("alogp", Math.round((naturalProduct.alogp + Number.EPSILON) * 100) / 100 )}
                        {this.createSimpleRow("alogp2", Math.round((naturalProduct.alogp2 + Number.EPSILON) * 100) / 100 ) }
                        {/*{this.createSimpleRow("amralogp", naturalProduct.amralogp)}*/}
                        {this.createRowWithOverlayTooltip("apol", Math.round((naturalProduct.apol + Number.EPSILON) * 10000) / 10000  , "Sum of the atomic polarizabilities (including implicit hydrogens).")}
                        {this.createRowWithOverlayTooltip("bpol", Math.round((naturalProduct.bpol + Number.EPSILON) * 10000) / 10000 , "Sum of the absolute value of the difference between atomic polarizabilities of all bonded atoms in the molecule (including implicit hydrogens) with polarizabilities taken from http://www.sunysccc.edu/academic/mst/ptable/p-table2.htm This descriptor assumes 2-centered bonds.")}
                        {/*{this.createRowWithOverlayTooltip("bcutDescriptor", <ul className="list-unstyled">{bcutDescriptor}</ul>, "Eigenvalue based descriptor noted for its utility in chemical diversity.")}*/}
                        {this.createRowWithOverlayTooltip("eccentricConnectivityIndexDescriptor", Math.round((naturalProduct.eccentricConnectivityIndexDescriptor + Number.EPSILON) * 10000) / 10000 , "A topological descriptor combining distance and adjacency information.")}
                        {this.createRowWithOverlayTooltip("fmfDescriptor", Math.round((naturalProduct.fmfDescriptor + Number.EPSILON) * 10000) / 10000 , "FMF descriptor characterizing complexity of a molecule. The descriptor is described in (Yang, Y. et. al.. J. Med. Chem.. 2010. ASAP) and is an approach to characterizing molecular complexity based on the Murcko framework present in the molecule.")}
                        {this.createRowWithOverlayTooltip("fsp3", Math.round((naturalProduct.fsp3 + Number.EPSILON) * 10000) / 10000 , "This descriptor is characterizing non-flatness of a molecule.")}
                        {this.createRowWithOverlayTooltip("fragmentComplexityDescriptor", Math.round((naturalProduct.fragmentComplexityDescriptor + Number.EPSILON) * 10000) / 10000 , "Class that returns the complexity of a system. The complexity is defined as (Nilakantan, R. et. al.. Journal of chemical information and modeling. 2006. 46)")}
                        {/*{this.createSimpleRow("gravitationalIndexHeavyAtoms", naturalProduct.gravitationalIndexHeavyAtoms)}*/}
                        {/*{this.createRowWithOverlayTooltip("hBondAcceptorCount", naturalProduct.hBondAcceptorCount, "This descriptor calculates the number of hydrogen bond acceptors using a slightly simplified version of the PHACIR atom types.")}*/}
                        {/*{this.createRowWithOverlayTooltip("hBondDonorCount", naturalProduct.hBondDonorCount, "This descriptor calculates the number of hydrogen bond donors using a slightly simplified version of the PHACIR atom types.")}*/}
                        {/*{this.createRowWithOverlayTooltip("hybridizationRatioDescriptor", naturalProduct.hybridizationRatioDescriptor, "Reports the fraction of sp3 carbons to sp2 carbons. Note that it only considers carbon atoms and rather than use a simple ratio it reports the value of Nsp3/ (Nsp3 + Nsp2). The original form of the descriptor (i.e., simple ratio) has been used to characterize molecular complexity, especially in the are of natural products , which usually have a high value of the sp3 to sp2 ratio.")}*/}
                        {/*{this.createRowWithOverlayTooltip("kappaShapeIndex1", naturalProduct.kappaShapeIndex1, "Kier and Hall kappa molecular shape indices compare the molecular graph with minimal and maximal molecular graphs; a description is given at: http://www.chemcomp.com/Journal_of_CCG/Features/descr.htm#KH : \"they are intended to capture different aspects of molecular shape.")}*/}
                        {/*{this.createSimpleRow("kappaShapeIndex2", naturalProduct.kappaShapeIndex2)}*/}
                        {/*{this.createSimpleRow("kappaShapeIndex3", naturalProduct.kappaShapeIndex3)}*/}
                        {/*{this.createRowWithOverlayTooltip("manholdlogp", naturalProduct.manholdlogp, "Prediction of logP based on the number of carbon and hetero atoms. The implemented equation was proposed in (Mannhold, R. et. al.. J.Pharm.Sci.. 2009. 98).")}*/}
                        {this.createRowWithOverlayTooltip("petitjeanNumber", Math.round((naturalProduct.petitjeanNumber + Number.EPSILON) * 10000) / 10000 , "According to the Petitjean definition, the eccentricity of a vertex corresponds to the distance from that vertex to the most remote vertex in the graph. The distance is obtained from the distance matrix as the count of edges between the two vertices.")}
                        {/*{this.createRowWithOverlayTooltip("petitjeanShapeTopo", naturalProduct.petitjeanShapeTopo, "Evaluates the Petitjean shape indices, These original Petitjean number was described by Petitjean (( Petitjean, M. . Journal of Chemical Information and Computer Science. 1992. 32)) and considered the molecular graph. This class also implements the geometric analog of the topological shape index described by Bath et al (( Bath, P.A. et. al.. Journal of Chemical Information and Computer Science. 1995. 35)).")}*/}
                        {/*{this.createSimpleRow("petitjeanShapeGeom", naturalProduct.petitjeanShapeGeom)}*/}
                        {this.createRowWithOverlayTooltip("lipinskiRuleOf5Failures", Math.round((naturalProduct.lipinskiRuleOf5Failures + Number.EPSILON) * 10000) / 10000 , "Number of failures in the lipinski rule of 5")}
                        {/*{this.createSimpleRow("numberSpiroAtoms", naturalProduct.numberSpiroAtoms)}*/}
                        {/*{this.createRowWithOverlayTooltip("vabcDescriptor", naturalProduct.vabcDescriptor, "Volume descriptor using the method implemented in the VABCVolume class.")}*/}
                        {/*{this.createRowWithOverlayTooltip("vertexAdjMagnitude", naturalProduct.vertexAdjMagnitude, "Vertex adjacency information (magnitude): 1 + log2 m where m is the number of heavy-heavy bonds. If m is zero, then zero is returned. (definition from MOE tutorial on line)")}*/}
                        {this.createSimpleRow("WienerPathNumber", naturalProduct.weinerPathNumber ) }
                        {/*{this.createSimpleRow("weinerPolarityNumber", naturalProduct.weinerPolarityNumber)}*/}
                        {this.createRowWithOverlayTooltip("xlogp", Math.round((naturalProduct.xlogp + Number.EPSILON) * 10000) / 10000 , "Prediction of logP based on the atom-type method called XLogP. Requires all hydrogens to be explicit.")}
                        {this.createRowWithOverlayTooltip("zagrebIndex", Math.round((naturalProduct.zagrebIndex + Number.EPSILON) * 10000) / 10000 , "The sum of the squares of atom degree over all heavy atoms i.")}
                        {this.createRowWithOverlayTooltip("topoPSA", Math.round((naturalProduct.topoPSA + Number.EPSILON) * 10000) / 10000 , "Calculation of topological polar surface area based on fragment contributions (TPSA) (Ertl, P. et. al.. J. Med. Chem.. 2000. 43).")}
                        {/*{this.createRowWithOverlayTooltip("tpsaEfficiency", naturalProduct.tpsaEfficiency, "Polar surface area expressed as a ratio to molecular size. Calculates tpsaEfficiency, which is to TPSADescriptor / molecular weight, in units of square Angstroms per Dalton. Other related descriptors may also be useful to add, e.g. ratio of polar to hydrophobic surface area.")}*/}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}