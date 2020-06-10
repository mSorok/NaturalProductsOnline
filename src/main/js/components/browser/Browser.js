import Container from "react-bootstrap/Container"
import BrowserFilter from "./BrowserFilter";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import TableBrowser from "./TableBrowser";
import CardBrowser from "./CardBrowser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Redirect, Route, Switch} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import BrowserViewPills from "./BrowserViewPills";
import Spinner from "../Spinner";
import Error from "../Error";
import Pagination from "react-bootstrap/Pagination";

const React = require("react");
const restClient = require("../../restClient");


export default class Browser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        };
        this.handlePageRequestEvent = this.handlePageRequestEvent.bind(this);
    }

    handlePageRequestEvent(e, targetPageNumber) {
        e.preventDefault();
        this.setState({
            currentPage: targetPageNumber
        });
    }

    withSubscription(ViewComponent, pageNumber, pageRequestHandler) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: {
                        error: null,
                        isLoaded: false,
                        result: []
                    },
                    stats: {
                        totalCompoundCount: null,
                        totalPageCount: null
                    }
                };
            }

            componentDidMount() {
                this.fetchNaturalProducts();
            }

            fetchNaturalProducts(link = "/api/compound?sort=annotationLevel,desc&page=" + pageNumber) {
                restClient({
                    method: "GET",
                    path: link
                }).then(
                    (response) => {
                        this.setState({
                            data: {
                                isLoaded: true,
                                result: response.entity._embedded.uniqueNaturalProducts
                            },
                            stats: {
                                totalCompoundCount: response.entity.page.totalElements,
                                totalPageCount: response.entity.page.totalPages
                            }
                        });
                    },
                    (error) => {
                        this.setState({
                            data: {
                                isLoaded: true,
                                error: error
                            }
                        });
                    });
            }

            render() {
                const {error, isLoaded, result} = this.state.data;

                if (error) {
                    return <Error/>
                } else if (!isLoaded) {
                    return <Spinner/>
                } else {
                    /*
                    note: the api starts counting pages at 0
                    pageNumber refers to the page that should be fetched from the api
                    displayPageNumber is the number shown in the UI
                    */
                    const pageNumberFirst = 0;
                    const displayPageNumberFirst = pageNumberFirst + 1;

                    const pageNumberLast = this.state.stats.totalPageCount - 1;
                    const displayPageNumberLast = this.state.stats.totalPageCount;

                    const pageNumberPrev = pageNumber - 1;
                    const pageNumberNext = pageNumber + 1;

                    let paginationItems = [];
                    for (let i = 0; i < 10; i++) {
                        paginationItems.push(
                            <Pagination.Item key={pageNumberFirst + i} onClick={(e) => pageRequestHandler(e, pageNumberFirst + i)} active={pageNumberFirst + i === pageNumber}>
                                {displayPageNumberFirst + i}
                            </Pagination.Item>);
                    }
                    paginationItems.push(<Pagination.Ellipsis key="ellipsis_0" disabled/>);
                    paginationItems.push(<Pagination.Item key={pageNumberLast} onClick={(e) => pageRequestHandler(e, pageNumberLast)} active={pageNumberLast === pageNumber}>{displayPageNumberLast}</Pagination.Item>);

                    return (
                        <Container>
                            <Row>
                                <h2>Component Browser</h2>
                            </Row>
                            <br/>
                            <Row>
                                {/*There are no filters yet. */}
                                {/*<BrowserFilter/>*/}
                            </Row>
                            <br/>
                            <Row>
                                <BrowserViewPills {...this.props}/>
                            </Row>
                            <br/>
                            <Row>
                                <p>There are {this.state.stats.totalCompoundCount} unique natural products in the database.</p>
                            </Row>
                            <Row>
                                <Pagination>
                                    <Pagination.First onClick={(e) => pageRequestHandler(e, pageNumberFirst)}/>
                                    {pageNumberPrev >= pageNumberFirst &&
                                        <Pagination.Prev onClick={(e) => pageRequestHandler(e, pageNumberPrev)}/>
                                    }

                                    {paginationItems}

                                    {pageNumberNext <= pageNumberLast &&
                                        <Pagination.Next onClick={(e) => pageRequestHandler(e, pageNumberNext)}/>
                                    }
                                    <Pagination.Last onClick={(e) => pageRequestHandler(e, pageNumberLast)}/>
                                </Pagination>
                            </Row>
                            <br/>
                            <Row>
                                <ViewComponent naturalProducts={result}/>
                            </Row>
                        </Container>
                    );
                }
            }
        }
    }

    render() {
        const CardBrowserWithSubscription = this.withSubscription(CardBrowser, this.state.currentPage, this.handlePageRequestEvent);
        const TableBrowserWithSubscription = this.withSubscription(TableBrowser, this.state.currentPage, this.handlePageRequestEvent);

        return (
            <Switch>
                <Route path="/browser/cards" component={CardBrowserWithSubscription}/>
                <Route path="/browser/table" component={TableBrowserWithSubscription}/>
                <Redirect from="/browser*" to="/browser/cards"/>
                {/* if none of the above routes match, show the CardBrowser (e.g. on the index page) */}
                <Route component={CardBrowserWithSubscription}/>
            </Switch>
        );
    }
}