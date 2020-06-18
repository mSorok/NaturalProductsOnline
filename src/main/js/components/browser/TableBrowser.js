import Table from "react-bootstrap/Table";
import NaturalProductTableItem from "../NaturalProductTableItem";

const React = require("react");


export default class TableBrowser extends React.Component {
    render() {
        const naturalProductTableItems = this.props.naturalProducts.map(naturalProduct =>
            <NaturalProductTableItem key={naturalProduct.coconut_id} naturalProduct={naturalProduct}/>

        );

        return (
            <Table responsive="lg" bordered hover size="sm">
                <thead>
                <tr>
                    <th className="tableThumbnail"></th>
                    <th>COCONUT id</th>
                    <th>Name</th>
                    <th>Mol. formula</th>
                    <th>Mol. weight</th>
                    <th>NP-likeness</th>
                    <th>InChI</th>
                </tr>
                </thead>
                <tbody>
                    {naturalProductTableItems}
                </tbody>
            </Table>
        );
    }
}