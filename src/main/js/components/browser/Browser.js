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
            currentPage: 1
        };


        this.handlePageRequestEvent = this.handlePageRequestEvent.bind(this);


        this.handlePageFirst = this.handlePageFirst.bind(this);
        this.handlePagePrev = this.handlePagePrev.bind(this);
        this.handlePageNext = this.handlePageNext.bind(this);
        this.handlePageLast = this.handlePageLast.bind(this);

    }



    handlePageRequestEvent(e) {

        e.preventDefault();

        this.state.currentPage = e.target.text;

        this.setState({
            currentPage: e.target.text
        });
    }

    handlePageNext(e){

        if(this.state.currentPage+1 > this.state.stats.totalPageCount){
            this.state.currentPage = this.state.stats.totalPageCount;
        }else{
            this.state.currentPage = this.state.currentPage+1;
        }



        this.setState({
            currentPage: this.state.currentPage
        });
    }

    handlePagePrev(e){

        if(this.state.currentPage-1 >=1 ){
            this.state.currentPage = this.state.currentPage-1;
        }else{
            this.state.currentPage=1;
        }


        this.setState({
            currentPage: this.state.currentPage
        });
    }

    handlePageFirst(e){
        this.state.currentPage = 1;

        this.setState({
            currentPage: this.state.currentPage
        });
    }

    handlePageLast(e, lastPage){
        this.state.currentPage =lastPage-1;

        this.setState({
            currentPage: this.state.currentPage
        });
    }


    withSubscription(ViewComponent, pageNumber, pageRequestHandler, firstPageHandler, prevPageHandler, nextPageHandler, lastPageHandler) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    currentPage: pageNumber,
                    data: {
                        error: null,
                        isLoaded: false,
                        result: []
                    },
                    stats: {
                        totalCompoundCount: null,
                        totalPageCount: null,
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


                    let current = parseInt(this.state.currentPage);
                    let last = this.state.stats.totalPageCount-1;
                    let delta = 5;
                    let range = [];
                    let rangeWithDots = [];



                    if(!current){
                        current=1;
                    }

                    let left = current - delta;
                    let right = current + delta + 1;
                    if(left<=1) {
                        right = right+Math.abs(left);
                    }


                    for (let i = 1; i <= last; i++) {

                        if (i === 1 ) {
                            range.push(i);
                        }else if(i === last){
                            range.push(i);
                        }else if(i >= left && i < right){
                            range.push(i);
                        }
                    }


                    let l;



                    for (let index = 0 ; index < range.length; index++) {


                        let i = range[index];



                        if (l != null) {
                            if (i - l === 2) {
                                //rangeWithDots.push(l + 1);
                                rangeWithDots.push(
                                <Pagination.Item key={l+1} onClick={pageRequestHandler} active={l+1 === current} >
                                    {l+1}
                                </Pagination.Item>);

                            } else if (i - l >= 2 ) {
                                rangeWithDots.push(
                                    <Pagination.Ellipsis key={"ellipsis_"+i} disabled/>
                                );
                            }
                        }
                        rangeWithDots.push(
                            <Pagination.Item key={i} onClick={pageRequestHandler} active={i === current} >
                            {i}
                        </Pagination.Item>);
                        l = i;

                    }


                    let paginationItems = rangeWithDots;




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
                                <p>There are {this.state.stats.totalCompoundCount.toLocaleString()} unique natural products in the database. They are sorted by their annotation level, starting with the best annotated.</p>
                            </Row>
                            <Row className="justify-content-md-center" >
                                <Pagination >
                                    <Pagination.First onClick={firstPageHandler}/>
                                    <Pagination.Prev onClick={prevPageHandler}/>
                                    {paginationItems}
                                    <Pagination.Next onClick={nextPageHandler}/>
                                    <Pagination.Last onClick={ (e)=>   lastPageHandler (e, this.state.stats.totalPageCount)}/>
                                </Pagination>
                            </Row>
                            <br/>
                            <Row>
                                <ViewComponent naturalProducts={result}/>
                            </Row>


                            <Row className="justify-content-md-center" >
                                <Pagination >
                                    <Pagination.First onClick={firstPageHandler}/>
                                    <Pagination.Prev onClick={prevPageHandler}/>
                                    {paginationItems}
                                    <Pagination.Next onClick={nextPageHandler}/>
                                    <Pagination.Last onClick={ (e)=>   lastPageHandler (e, this.state.stats.totalPageCount)}/>
                                </Pagination>
                            </Row>

                        </Container>
                    );
                }
            }
        }
    }

    render() {
        const CardBrowserWithSubscription = this.withSubscription(CardBrowser, this.state.currentPage, this.handlePageRequestEvent, this.handlePageFirst, this.handlePagePrev, this.handlePageNext, this.handlePageLast);
        const TableBrowserWithSubscription = this.withSubscription(TableBrowser, this.state.currentPage, this.handlePageRequestEvent, this.handlePageFirst, this.handlePagePrev, this.handlePageNext, this.handlePageLast);

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