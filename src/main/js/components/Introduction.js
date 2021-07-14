import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";
import {useState} from "react";


const React = require("react");

function AlertLatestNews() {
    const [show, setShow] = useState(true);

    if (show) {
        return(
            <Alert variant="info" show={show} onClick={() => setShow(false)} dismissible
                   style={{right:"0",left:"0",top:"0",bottom:"0",marginRight:"auto",marginLeft:"auto",marginTop:"auto",marginBottom:"auto"}}
            >
                <Alert.Heading>Latest updates: March 2021</Alert.Heading>
                    <strong>What's new?</strong>
                    <ul>
                        <li>More natural products were added from <a href={"https://europepmc.org/article/med/25978395"}  target="_blank" rel="noopener noreferrer">Ayurveda database</a>, <a href={"http://alkamid.ugent.be/alkamidhome.php"}  target="_blank" rel="noopener noreferrer">Alkamid</a>, <a href={"https://www.cmnpd.org/"} target="_blank" rel="noopener noreferrer">CMNPD</a> and <a href={"https://doi.org/10.5281/zenodo.4562688"} target="_blank" rel="noopener noreferrer">CyanoMetDB</a></li>
                        <li>Data from <a href={"https://biofacquim.herokuapp.com/"} target="_blank" rel="noopener noreferrer">BIOFACQUIM</a> and <a href={"https://www.npatlas.org/joomla/"} target="_blank" rel="noopener noreferrer">NP Atlas</a> was updated with it's latest release</li>
                        <li><a target="_blank" rel="noopener noreferrer"  href="http://www.way2drug.com/passonline">PASS</a> bioactivity predictions for natural products have been added</li>
                    </ul>
            </Alert>
        );

    }else{
        return(
        <p></p>
        );
    }

}

export default class Introduction extends React.Component {





    render(){
        return (
            <Container>
                <Row>
                    <p style={{textAlign: "justify"}}>Natural Products Online is an open source project for Natural Products (NPs) storage, search and analysis. The present version hosts COCONUT, the
                    COlleCtion of Open Natural ProdUcTs, one of the biggest and best annotated resources for NPs available free of charge and without any restriction.</p>

                    {/*<AlertLatestNews/>*/}

                </Row>
            </Container>
        );
    }
}
