import Table from "react-bootstrap/Table";
import NaturalProductTableItem from "../NaturalProductTableItem";

const React = require("react");


export default class TableBrowser extends React.Component {
    render() {
        const naturalProductTableItems = this.props.naturalProducts.map(naturalProduct =>
            <NaturalProductTableItem key={naturalProduct.inchikey} naturalProduct={naturalProduct}/>

        );

        return (
            <Table responsive="lg" bordered hover size="sm">
                <thead>
                <tr>
                    <th className="tableThumbnail"></th>
                    <th>Name</th>
                    <th>NPL score</th>
                    <th>Mol. formula</th>
                    <th>Mol. weight</th>
                    <th>InChI</th>
                    <th>InChIKey</th>
                </tr>
                </thead>
                <tbody>
                    {naturalProductTableItems}
                </tbody>
            </Table>
        );
    }
}