import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Utils from "../../Utils";

const React = require("react");


export default class Fragments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFragmentsWithSugar: false
        };
        this.handleFragmentsCheckbox = this.handleFragmentsCheckbox.bind(this);
    }

    handleFragmentsCheckbox(e) {
        this.setState({
            showFragmentsWithSugar: e.target.checked
        });
    }

    render() {
        const fragments = [];
        const fragmentsWithSugar = [];

        Object.keys(this.props.fragments).map((key) => {
            fragments.push(
                <tr key={key}>
                    <td>{key}</td>
                    <td>{this.props.fragments[key]}</td>
                </tr>
            );
        });

        let fragmentsEqual = Utils.objectsAreEqual(this.props.fragments, this.props.fragmentsWithSugar);

        if (!fragmentsEqual) {
            Object.keys(this.props.fragmentsWithSugar).map((key) => {
                fragmentsWithSugar.push(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{this.props.fragmentsWithSugar[key]}</td>
                    </tr>
                );

            });
        }

        return (
            <Card className="compoundCardItem">
                <Card.Body>
                    <Card.Title className="text-primary">Fragments</Card.Title>
                    <br />
                    {fragmentsEqual ?
                        <Form.Check type="checkbox" id="fragmentsCheckbox" label="with sugar" disabled /> :
                        <Form.Check type="checkbox" id="fragmentsCheckbox" label="with sugar" checked={this.state.showFragmentsWithSugar} onChange={this.handleFragmentsCheckbox}/>}
                    {fragmentsEqual ?
                        <p>The fragments and fragments with sugar are equal.</p> :
                        null}
                    <Table size="sm">
                        <tbody>
                        {this.state.showFragmentsWithSugar ? fragmentsWithSugar : fragments}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}