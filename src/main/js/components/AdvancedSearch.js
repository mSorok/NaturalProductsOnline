import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "./Spinner";
import CardBrowser from "./browser/CardBrowser";
import Error from "./Error";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useRef } from 'react';
import Utils from "../Utils";

const { Formik } = require("formik");


import SourcesList from "./SourcesList";
import NetworkError from "./NetworkError";


const React = require("react");
const OpenChemLib = require("openchemlib/full");
const restClient = require("../restClient");


const ColoredLine = ({ color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);





export default class AdvancedSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ajaxError: null,
            ajaxIsLoaded: false,
            ajaxResult: [],
            ajaxErrorStatus:"",


            searchSubmitted: false,
            searchHitsLimit: 100,

            searchSubmittedAndSent:false,

            advancedSearchModel:{
                listOfSearchItems : []
            },

            molecularFormulaSubmitted: false,
            molecularFormula : "",
            molecularFormulaLogic: "AND",

            molecularWeightSubmitted: false,
            molecularWeightMin : "",
            molecularWeightMax: "",
            molecularWeightLogic: "AND",

            heavyAtomsSubmitted:false,
            heavyAtomsMin: "",
            heavyAtomsMax: "",
            heavyAtomsLogic:"AND",

            numberOfCarbonsSubmitted: false,
            numberOfCarbonsMin: "",
            numberOfCarbonsMax: "",
            numberOfCarbonsLogic: "AND",

            numberOfOxygensSubmitted: false,
            numberOfOxygensMin: "",
            numberOfOxygensMax: "",
            numberOfOxygensLogic: "AND",

            numberOfNitrogensSubmitted: false,
            numberOfNitrogensMin: "",
            numberOfNitrogensMax: "",
            numberOfNitrogensLogic: "AND",

            bondCountSubmitted: false,
            bondCountMin: "",
            bondCountMax: "",
            bondCountLogic: "AND",

            numberOfRingsSubmitted: false,
            numberOfRingsMin : "",
            numberOfRingsMax: "",
            numberOfRingsLogic: "AND",

            containSugarsSubmitted : false,
            containSugars :"indifferent",
            containSugarsLogic: "AND",

            nplScoreSubmitted: false,
            nplScoreMin : "",
            nplScoreMax: "",
            nplScoreLogic: "AND",

            apolSubmitted: false,
            apolMin: "",
            apolMax: "",
            apolLogic: "AND",

            alogpSubmitted: false,
            alogpMin: "",
            alogpMax: "",
            alogpLogic: "AND",

            fsp3Submitted: false,
            fsp3Min : "",
            fsp3Max: "",
            fsp3Logic: "AND",

            lipinskiSubmitted: false,
            lipinskiMin: "",
            lipinskiMax: "",
            lipinskiLogic: "AND",

            spiroSubmitted: false,
            spiroMin: "",
            spiroMax: "",
            spiroLogic: "AND",

            dbSelected: false,
            dbChoice: "",
            orAndDbChoice: "OR",
            dbChoiceLogic: "AND",








        };




        //here all the handles binding
        this.handleAdvancedSearchSubmit = this.handleAdvancedSearchSubmit.bind(this);
        this.handleSearchHitsLimit = this.handleSearchHitsLimit.bind(this);
        this.handleMolecularFormulaInput = this.handleMolecularFormulaInput.bind(this);
        this.handleMolecularFormulaLogic = this.handleMolecularFormulaLogic.bind(this);

        this.handleMolecularWeightMin = this.handleMolecularWeightMin.bind(this);
        this.handleMolecularWeightMax = this.handleMolecularWeightMax.bind(this);
        this.handleMolecularWeightLogic = this.handleMolecularWeightLogic.bind(this);

        this.handleNumberHeavyAtomsMin = this.handleNumberHeavyAtomsMin.bind(this);
        this.handleNumberHeavyAtomsMax = this.handleNumberHeavyAtomsMax.bind(this);
        this.handleNumberHeavyAtomsLogic = this.handleNumberHeavyAtomsLogic.bind(this);


        this.handleNumberOfCarbonsMin = this.handleNumberOfCarbonsMin.bind(this);
        this.handleNumberOfCarbonsMax = this.handleNumberOfCarbonsMax.bind(this);
        this.handleNumberOfCarbonsLogic = this.handleNumberOfCarbonsLogic.bind(this);

        this.handleNumberOfOxygensMin = this.handleNumberOfOxygensMin.bind(this);
        this.handleNumberOfOxygensMax = this.handleNumberOfOxygensMax.bind(this);
        this.handleNumberOfOxygensLogic = this.handleNumberOfOxygensLogic.bind(this);

        this.handleNumberOfNitrogensMin = this.handleNumberOfNitrogensMin.bind(this);
        this.handleNumberOfNitrogensMax = this.handleNumberOfNitrogensMax.bind(this);
        this.handleNumberOfNitrogensLogic = this.handleNumberOfNitrogensLogic.bind(this);

        this.handleBondCountMin = this.handleBondCountMin.bind(this);
        this.handleBondCountMax = this.handleBondCountMax.bind(this);
        this.handleBondCountLogic = this.handleBondCountLogic.bind(this);

        this.handleContainsSugars = this.handleContainsSugars.bind(this);
        this.handleContainSugarsLogic = this.handleContainSugarsLogic.bind(this);


        this.handleNumberOfRingsMin = this.handleNumberOfRingsMin.bind(this);
        this.handleNumberOfRingsMax = this.handleNumberOfRingsMax.bind(this);
        this.handleNumberOfRingsLogic = this.handleNumberOfRingsLogic.bind(this);

        this.handleNPLScoreMin = this.handleNPLScoreMin.bind(this);
        this.handleNPLScoreMax = this.handleNPLScoreMax.bind(this);
        this.handleNPLScoreLogic = this.handleNPLScoreLogic.bind(this);

        this.handleApolMin = this.handleApolMin.bind(this);
        this.handleApolMax = this.handleApolMax.bind(this);
        this.handleApolLogic = this.handleApolLogic.bind(this);

        this.handleAlogpMin = this.handleAlogpMin.bind(this);
        this.handleAlogpMax = this.handleAlogpMax.bind(this);
        this.handleAlogpLogic = this.handleAlogpLogic.bind(this);

        this.handleFsp3Min = this.handleFsp3Min.bind(this);
        this.handleFsp3Max = this.handleFsp3Max.bind(this);
        this.handleFsp3Logic = this.handleFsp3Logic.bind(this);

        this.handleLipinskiMin = this.handleLipinskiMin.bind(this);
        this.handleLipinskiMax = this.handleLipinskiMax.bind(this);
        this.handleLipinskiLogic = this.handleLipinskiLogic.bind(this);

        this.handleSpiroMin = this.handleSpiroMin.bind(this);
        this.handleSpiroMax = this.handleSpiroMax.bind(this);
        this.handleSpiroLogic =  this.handleSpiroLogic.bind(this);


        this.handleDBselect = this.handleDBselect.bind(this);
        this.handleDBSelectLogic = this.handleDBSelectLogic.bind(this);
        this.handleDBSelectAllOne = this.handleDBSelectAllOne.bind(this);


        this.handleSDFDownload = this.handleSDFDownload.bind(this);



        this.searchResultHeadline = React.createRef();

        this.spinnerRef = React.createRef();

        this.allChangeRef = React.createRef();


    }



    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.searchSubmitted){
            this.scrollToRef(this.allChangeRef);
        }

    }

    handleSDFDownload(e, npList) {
        e.preventDefault();

        const download = document.createElement("a");

        download.setAttribute("href", "data:chemical/x-mdl-molfile;charset=utf-8," + encodeURIComponent(Utils.getSDFileStringByNPList(npList)));
        download.setAttribute("download", "coconut_advanced_search_result.sdf");
        download.style.display = "none";

        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    }

    handleAdvancedSearchSubmit(){

        if(!this.state.searchSubmittedAndSent) {




            //check if at least one of the fields is set
            if (this.state.molecularFormulaSubmitted || this.state.molecularWeightSubmitted || this.state.heavyAtomsSubmitted || this.state.numberOfCarbonsSubmitted
                || this.state.numberOfOxygensSubmitted || this.state.numberOfNitrogensSubmitted || this.state.numberOfRingsSubmitted || this.state.containSugarsSubmitted
                || this.state.bondCountSubmitted || this.state.nplScoreSubmitted || this.state.apolSubmitted || this.state.alogpSubmitted || this.state.fsp3Submitted
                || this.state.lipinskiSubmitted || this.state.spiroSubmitted || this.state.dbSelected) {

                this.setState({
                    searchSubmitted: true
                });


                let uriString = "/api/search/advanced?max-hits=" + this.state.searchHitsLimit;

                if (this.state.molecularFormulaSubmitted) {
                    //uriString+="molecularFormula="+encodeURIComponent(this.state.molecularFormula)+"&"+"mfOA="+encodeURIComponent(this.state.molecularFormulaAO)+"&";

                    let advancedSearchItem = {
                        itemType: "molecular_formula",
                        itemValue: this.state.molecularFormula,
                        itemLogic: this.state.molecularFormulaLogic
                    };

                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);

                }

                if (this.state.molecularWeightSubmitted) {
                    let advancedSearchItem = {
                        itemType: "molecular_weight",
                        itemValueMin: this.state.molecularWeightMin,
                        itemValueMax: this.state.molecularWeightMax,
                        itemLogic: this.state.molecularWeightLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.heavyAtomsSubmitted) {
                    let advancedSearchItem = {
                        itemType: "heavy_atom_number",
                        itemValueMin: this.state.heavyAtomsMin,
                        itemValueMax: this.state.heavyAtomsMax,
                        itemLogic: this.state.heavyAtomsLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.numberOfCarbonsSubmitted) {
                    let advancedSearchItem = {
                        itemType: "number_of_carbons",
                        itemValueMin: this.state.numberOfCarbonsMin,
                        itemValueMax: this.state.numberOfCarbonsMax,
                        itemLogic: this.state.numberOfCarbonsLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.numberOfOxygensSubmitted) {
                    let advancedSearchItem = {
                        itemType: "number_of_oxygens",
                        itemValueMin: this.state.numberOfOxygensMin,
                        itemValueMax: this.state.numberOfOxygensMax,
                        itemLogic: this.state.numberOfOxygensLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.numberOfNitrogensSubmitted) {

                    let advancedSearchItem = {
                        itemType: "number_of_nitrogens",
                        itemValueMin: this.state.numberOfNitrogensMin,
                        itemValueMax: this.state.numberOfNitrogensMax,
                        itemLogic: this.state.numberOfNitrogensLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.bondCountSubmitted) {
                    let advancedSearchItem = {
                        itemType: "bond_count",
                        itemValueMin: this.state.bondCountMin,
                        itemValueMax: this.state.bondCountMax,
                        itemLogic: this.state.bondCountLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);

                }


                if (this.state.numberOfRingsSubmitted) {
                    let advancedSearchItem = {
                        itemType: "number_of_rings",
                        itemValueMin: this.state.numberOfRingsMin,
                        itemValueMax: this.state.numberOfRingsMax,
                        itemLogic: this.state.numberOfRingsLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);

                }

                if (this.state.containSugarsSubmitted) {
                    let advancedSearchItem = {
                        itemType: "contains_sugars",
                        itemValue: this.state.containSugars,
                        itemLogic: this.state.containSugarsLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.nplScoreSubmitted) {
                    let advancedSearchItem = {
                        itemType: "npl_score",
                        itemValueMin: this.state.nplScoreMin,
                        itemValueMax: this.state.nplScoreMax,
                        itemLogic: this.state.nplScoreLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.apolSubmitted) {
                    let advancedSearchItem = {
                        itemType: "apol",
                        itemValueMin: this.state.apolMin,
                        itemValueMax: this.state.apolMax,
                        itemLogic: this.state.apolLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }


                if (this.state.alogpSubmitted) {
                    let advancedSearchItem = {
                        itemType: "alogp",
                        itemValueMin: this.state.alogpMin,
                        itemValueMax: this.state.alogpMax,
                        itemLogic: this.state.alogpLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.fsp3Submitted) {
                    let advancedSearchItem = {
                        itemType: "fsp3",
                        itemValueMin: this.state.fsp3Min,
                        itemValueMax: this.state.fsp3Max,
                        itemLogic: this.state.fsp3Logic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.lipinskiSubmitted) {
                    let advancedSearchItem = {
                        itemType: "lipinskiRuleOf5Failures",
                        itemValueMin: this.state.lipinskiMin,
                        itemValueMax: this.state.lipinskiMax,
                        itemLogic: this.state.lipinskiLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }

                if (this.state.spiroSubmitted) {
                    let advancedSearchItem = {
                        itemType: "numberSpiroAtoms",
                        itemValueMin: this.state.spiroMin,
                        itemValueMax: this.state.spiroMax,
                        itemLogic: this.state.spiroLogic
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }


                if (this.state.dbSelected) {

                    let advancedSearchItem = {
                        itemType: "databases",
                        itemValue: this.state.dbChoice,
                        itemLogic: this.state.dbChoiceLogic,
                        dbLogic: this.state.orAndDbChoice,
                    };
                    this.state.advancedSearchModel.listOfSearchItems.push(advancedSearchItem);
                }


                this.doSearch(uriString);


            } else {
                alert("Please, provide at least one search criterion!");
            }
        }else{
            //console.log("wait till the previous query returns or open a new tab!");
            alert("Please, wait the completion of the running query or run a new query in a new window!");
        }
    }




    /**
     * CARBONS, OXYGENS, NITROGENS
     * @param e
     */
    handleNumberOfCarbonsMin(e){
        this.state.numberOfCarbonsMin = e.target.value;
        if(  (this.state.numberOfCarbonsMin != "" && this.state.numberOfCarbonsMin != null) || (this.state.numberOfCarbonsMax != "" && this.state.numberOfCarbonsMax != null)   ) {
            this.state.numberOfCarbonsSubmitted = true;

        }else{
            this.state.numberOfCarbonsSubmitted = false;
        }
    }

    handleNumberOfCarbonsMax(e){
        this.state.numberOfCarbonsMax = e.target.value;

        if(  (this.state.numberOfCarbonsMin != "" && this.state.numberOfCarbonsMin != null) || (this.state.numberOfCarbonsMax != "" && this.state.numberOfCarbonsMax != null)   ) {
            this.state.numberOfCarbonsSubmitted = true;

        }else{
            this.state.numberOfCarbonsSubmitted = false;
        }
    }

    handleNumberOfCarbonsLogic(e){
        this.setState(
            {
                numberOfCarbonsLogic:e.target.value
            }
        );

    }





    handleNumberOfOxygensMin(e){
        this.state.numberOfOxygensMin = e.target.value;
        if( (this.state.numberOfOxygensMin != "" && this.state.numberOfOxygensMin != null) || (this.state.numberOfOxygensMax != "" && this.state.numberOfOxygensMax != null)  ) {
            this.state.numberOfOxygensSubmitted = true;

        }else{
            this.state.numberOfOxygensSubmitted = false;
        }
    }

    handleNumberOfOxygensMax(e){
        this.state.numberOfOxygensMax = e.target.value;

        if( (this.state.numberOfOxygensMin != "" && this.state.numberOfOxygensMin != null) || (this.state.numberOfOxygensMax != "" && this.state.numberOfOxygensMax != null)  ) {
            this.state.numberOfOxygensSubmitted = true;

        }else{
            this.state.numberOfOxygensSubmitted = false;
        }
    }

    handleNumberOfOxygensLogic(e){
        this.setState(
            {
                numberOfOxygensLogic:e.target.value
            }
        );
    }



    handleNumberOfNitrogensMin(e){
        this.state.numberOfNitrogensMin = e.target.value;
        if( (this.state.numberOfNitrogensMin != "" && this.state.numberOfNitrogensMin != null) || (this.state.numberOfNitrogensMax != "" && this.state.numberOfNitrogensMax != null) ) {
            this.state.numberOfNitrogensSubmitted = true;

        }else{
            this.state.numberOfNitrogensSubmitted = false;
        }
    }

    handleNumberOfNitrogensMax(e){
        this.state.numberOfNitrogensMax = e.target.value;

        if( (this.state.numberOfNitrogensMin != "" && this.state.numberOfNitrogensMin != null) || (this.state.numberOfNitrogensMax != "" && this.state.numberOfNitrogensMax != null) ) {
            this.state.numberOfNitrogensSubmitted = true;

        }else{
            this.state.numberOfNitrogensSubmitted = false;
        }
    }

    handleNumberOfNitrogensLogic(e){
        this.setState(
            {
                numberOfNitrogensLogic:e.target.value
            }
        );
    }




    handleBondCountMin(e){

        this.state.bondCountMin = e.target.value;
        if( (this.state.bondCountMin != "" && this.state.bondCountMin != null) || (this.state.bondCountMax != "" && this.state.bondCountMax != null) ) {
            this.state.bondCountSubmitted = true;

        }else{
            this.state.bondCountSubmitted = false;
        }

    }

    handleBondCountMax(e){
        this.state.bondCountMax = e.target.value;
        if( (this.state.bondCountMin != "" && this.state.bondCountMin != null) || (this.state.bondCountMax != "" && this.state.bondCountMax != null) ) {
            this.state.bondCountSubmitted = true;

        }else{
            this.state.bondCountSubmitted = false;
        }
    }

    handleBondCountLogic(e){
        this.setState(
            {
                bondCountLogic:e.target.value
            }
        );
    }




    handleNumberOfRingsMin(e){
        this.state.numberOfRingsMin = e.target.value;
        if( (this.state.numberOfRingsMin != "" && this.state.numberOfRingsMin != null) || (this.state.numberOfRingsMax != "" && this.state.numberOfRingsMax != null) ) {
            this.state.numberOfRingsSubmitted = true;

        }else{
            this.state.numberOfRingsSubmitted = false;
        }

    }

    handleNumberOfRingsMax(e){
        this.state.numberOfRingsMax = e.target.value;

        if( (this.state.numberOfRingsMin != "" && this.state.numberOfRingsMin != null) || (this.state.numberOfRingsMax != "" && this.state.numberOfRingsMax != null) ) {
            this.state.numberOfRingsSubmitted = true;

        }else{
            this.state.numberOfRingsSubmitted = false;
        }
    }

    handleNumberOfRingsLogic(e){
        this.setState(
            {
                numberOfRingsLogic:e.target.value
            }
        );
    }




    /**
     * Molecular weight
     * @param e
     */

    handleMolecularWeightMin(e){
        this.state.molecularWeightMin = e.target.value;
        if( (this.state.molecularWeightMin != "" && this.state.molecularWeightMin != null) || (this.state.molecularWeightMax != "" && this.state.molecularWeightMax != null)  ) {
            this.state.molecularWeightSubmitted = true;

        }else{
            this.state.molecularWeightSubmitted = false;
        }
    }

    handleMolecularWeightMax(e){
        this.state.molecularWeightMax = e.target.value;

        if( (this.state.molecularWeightMin != "" && this.state.molecularWeightMin != null) || (this.state.molecularWeightMax != "" && this.state.molecularWeightMax != null)  ) {
            this.state.molecularWeightSubmitted = true;

        }else{
            this.state.molecularWeightSubmitted = false;
        }
    }

    handleMolecularWeightLogic(e){
        this.setState(
            {
                molecularWeightLogic:e.target.value
            }
        );

    }



    handleNumberHeavyAtomsMin(e){
        this.state.heavyAtomsMin = e.target.value;
        if( (this.state.heavyAtomsMin != "" && this.state.heavyAtomsMin != null) || (this.state.heavyAtomsMax != "" && this.state.heavyAtomsMax != null) ) {
            this.state.heavyAtomsSubmitted = true;

        }else{
            this.state.heavyAtomsSubmitted = false;
        }
    }

    handleNumberHeavyAtomsMax(e){
        this.state.heavyAtomsMax = e.target.value;

        if( (this.state.heavyAtomsMin != "" && this.state.heavyAtomsMin != null) || (this.state.heavyAtomsMax != "" && this.state.heavyAtomsMax != null) ) {
            this.state.heavyAtomsSubmitted = true;

        }else{
            this.state.heavyAtomsSubmitted = false;
        }
    }

    handleNumberHeavyAtomsLogic(e){
        this.setState(
            {
                heavyAtomsLogic:e.target.value
            }
        );
    }



    /**
     * Molecular descriptors
     *
     */
    handleNPLScoreMin(e){

        this.state.nplScoreMin = e.target.value;

        if( (this.state.nplScoreMin != "" && this.state.nplScoreMin != null) || (this.state.nplScoreMax != "" && this.state.nplScoreMax != null) ) {
            this.state.nplScoreSubmitted = true;

        }else{
            this.state.nplScoreSubmitted = false;
        }

    }

    handleNPLScoreMax(e){
        this.state.nplScoreMax = e.target.value;

        if( (this.state.nplScoreMin != "" && this.state.nplScoreMin != null) || (this.state.nplScoreMax != "" && this.state.nplScoreMax != null) ) {
            this.state.nplScoreSubmitted = true;

        }else{
            this.state.nplScoreSubmitted = false;
        }
    }

    handleNPLScoreLogic(e){
        this.setState(
            {
                nplScoreLogic: e.target.value
            }
        );

    }

    handleApolMin(e){
        this.state.apolMin = e.target.value;

        if( (this.state.apolMin != "" && this.state.apolMin != null) || (this.state.apolMax != "" && this.state.apolMax != null) ) {
            this.state.apolSubmitted = true;

        }else{
            this.state.apolSubmitted = false;
        }

    }
    handleApolMax(e){
        this.state.apolMax = e.target.value;

        if( (this.state.apolMin != "" && this.state.apolMin != null) || (this.state.apolMax != "" && this.state.apolMax != null) ) {
            this.state.apolSubmitted = true;

        }else{
            this.state.apolSubmitted = false;
        }

    }
    handleApolLogic(e){
        this.setState(
            {
                apolLogic: e.target.value
            }
        );
    }


    handleAlogpMin(e){
        this.state.alogpMin = e.target.value;

        if( (this.state.alogpMin != "" && this.state.alogpMin != null) || (this.state.alogpMax != "" && this.state.alogpMax != null) ) {
            this.state.alogpSubmitted = true;

        }else{
            this.state.alogpSubmitted = false;
        }

    }
    handleAlogpMax(e){
        this.state.alogpMax = e.target.value;

        if( (this.state.alogpMin != "" && this.state.alogpMin != null) || (this.state.alogpMax != "" && this.state.alogpMax != null) ) {
            this.state.alogpSubmitted = true;

        }else{
            this.state.alogpSubmitted = false;
        }
    }
    handleAlogpLogic(e){
        this.setState(
            {
                alogpLogic: e.target.value
            }
        );
    }


    handleFsp3Min(e){
        this.state.fsp3Min = e.target.value;

        if( (this.state.fsp3Min != "" && this.state.fsp3Min != null) || (this.state.fsp3Max != "" && this.state.fsp3Max != null) ) {
            this.state.fsp3Submitted = true;

        }else{
            this.state.fsp3Submitted = false;
        }

    }
    handleFsp3Max(e){
        this.state.fsp3Max = e.target.value;

        if( (this.state.fsp3Min != "" && this.state.fsp3Min != null) || (this.state.fsp3Max != "" && this.state.fsp3Max != null) ) {
            this.state.fsp3Submitted = true;

        }else{
            this.state.fsp3Submitted = false;
        }
    }
    handleFsp3Logic(e){
        this.setState(
            {
                fsp3Logic: e.target.value
            }
        );
    }


    handleLipinskiMin(e){
        this.state.lipinskiMin = e.target.value;

        if( (this.state.lipinskiMin != "" && this.state.lipinskiMin != null) || (this.state.lipinskiMax != "" && this.state.lipinskiMax != null) ) {
            this.state.lipinskiSubmitted = true;

        }else{
            this.state.lipinskiSubmitted = false;
        }
    }
    handleLipinskiMax(e){
        this.state.lipinskiMax = e.target.value;

        if( (this.state.lipinskiMin != "" && this.state.lipinskiMin != null) || (this.state.lipinskiMax != "" && this.state.lipinskiMax != null) ) {
            this.state.lipinskiSubmitted = true;

        }else{
            this.state.lipinskiSubmitted = false;
        }
    }
    handleLipinskiLogic(e){
        this.setState(
            {
                lipinskiLogic: e.target.value
            }
        );
    }


    handleSpiroMin(e){
        this.state.spiroMin = e.target.value;

        if( (this.state.spiroMin != "" && this.state.spiroMin != null) || (this.state.spiroMax != "" && this.state.spiroMax != null) ) {
            this.state.spiroSubmitted = true;

        }else{
            this.state.spiroSubmitted = false;
        }
    }
    handleSpiroMax(e){
        this.state.spiroMax = e.target.value;

        if( (this.state.spiroMin != "" && this.state.spiroMin != null) || (this.state.spiroMax != "" && this.state.spiroMax != null) ) {
            this.state.spiroSubmitted = true;

        }else{
            this.state.spiroSubmitted = false;
        }
    }
    handleSpiroLogic(e){
        this.setState(
            {
                spiroLogic: e.target.value
            }
        );
    }






    /**
     *
     *
     */
    handleContainsSugars(e){
        this.state.containSugars = e.target.value;
        if(this.state.containSugars != "" && this.state.containSugars != null && this.state.containSugars != "Indifferent") {
            this.state.containSugarsSubmitted = true;

        }else{
            this.state.containSugarsSubmitted = false;
        }
    }

    handleContainSugarsLogic(e){
        this.setState(
            {
                containSugarsLogic:e.target.value
            }
        );
    }



    handleDBselect(e){


        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected && options[i].value != "0" && options[i].value != 0) {
                value.push(options[i].value);
            }
        }




        if(value.length>0 ) {
            this.state.dbChoice = value;
        }else{
            this.state.dbChoice = "";
        }


        if(this.state.dbChoice != "" && this.state.dbChoice != null && this.state.dbChoice.length >0) {
            this.state.dbSelected = true;

        }else{
            this.state.dbSelected = false;
        }
    }

    handleDBSelectLogic(e){
        this.setState(
            {
                dbChoiceLogic:e.target.value
            }
        );
    }

    handleDBSelectAllOne(e){
        this.setState(
            {
                orAndDbChoice:e.target.value
            }
        );
    }



    /**
     * Molecular Formula
     * */

    handleMolecularFormulaInput(e){
        this.state.molecularFormula=e.target.value;
        if(this.state.molecularFormula != "" && this.state.molecularFormula != null) {
            this.state.molecularFormulaSubmitted = true;

        }else{
            this.state.molecularFormulaSubmitted = false;
        }

    }

    handleMolecularFormulaLogic(e){
        this.setState(
            {
                molecularFormulaLogic:e.target.value
            }
        );
    }

    handleSearchHitsLimit(e){
        this.setState(
            {
                searchHitsLimit:e.target.value
            }
        );
    }


    /**************************************************************/


    doSearch(searchString) {
        this.setState({searchSubmittedAndSent:true});

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(this.state.advancedSearchModel);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(searchString, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    ajaxIsLoaded: true,
                    ajaxResult: result,
                    searchSubmittedAndSent:false,
                    ajaxErrorStatus:""
                });
                //console.log(this.state.ajaxResult);
            })
            .catch(error => {
                if (!error.response) {
                    // network error
                    this.state.ajaxErrorStatus = 'network';
                } else {
                    this.setState({
                        ajaxIsLoaded: true,
                        ajaxError: error,
                        searchSubmittedAndSent:false,
                        ajaxErrorStatus:""
                    });
                }
            });
    }



    scrollToRef(ref) {
        window.scrollTo(0, ref.current.offsetTop);
    }


    render() {

        const {ajaxError, ajaxIsLoaded, ajaxResult, searchSubmitted } = this.state;
        let resultRow;

        console.log("before");
        console.log(this.state);


        if (searchSubmitted) {
            if (ajaxError) {
                if (this.state.ajaxErrorStatus === "") {

                    resultRow =
                        <>
                            <Row ref={this.allChangeRef}>
                                <Error/>
                            </Row>
                        </>;
                }else{
                    resultRow =
                        <>
                            <Row ref={this.allChangeRef}>
                                <NetworkError/>
                            </Row>
                        </>;
                }
                this.state.ajaxIsLoaded = false; //TODO verify here!
                this.state.ajaxError = null;
                this.state.searchSubmitted=false;

            } else if (!ajaxIsLoaded) {
                resultRow =
                    <Row className="justify-content-center" ref={this.allChangeRef}>
                        <Spinner/>
                        {/*Eventually some message here*/}
                    </Row>
            } else {
                let npList = [...ajaxResult.naturalProducts];
                if (ajaxResult.naturalProducts.length > 0) {
                    resultRow =
                        <>
                            <Row ref={this.allChangeRef}><h2>Search Results</h2></Row>
                            <Row>
                                <Col>
                                    <p>Your search returned {ajaxResult.count} results.</p>
                                </Col>
                                <Col md="auto">
                                    <Button id="downloadSDFfile" variant="outline-primary" size="sm" onClick={(e) => this.handleSDFDownload(e, npList)}>
                                        <FontAwesomeIcon icon="file-download" fixedWidth/>
                                        &nbsp;Download SDF
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <CardBrowser naturalProducts={ajaxResult.naturalProducts}/>
                            </Row>
                        </>
                } else {
                    resultRow = <Row><p>There are no results that match your request.</p></Row>;
                }
                this.state.ajaxIsLoaded = false; //TODO verify here!
                this.state.searchSubmitted = false;

                console.log(this.state);

                //console.log(this.state);
            }

        }



        return (
            <Container>
                <Row>
                    <h2>Advanced Search</h2>
                </Row>

                <br/>
                <h3>Structural properties</h3>
                <br/>


                <Form.Group>
                    <Form>
                        <Form.Label>Molecular formula</Form.Label>
                        <Form.Row>
                            <Col xs={10}>
                                <Form.Control onChange={this.handleMolecularFormulaInput}/>
                                <Form.Text className="text-muted">Warning: case sensitive</Form.Text>
                            </Col>
                            <Col>
                                <Form.Control name="molecular-formula-and-or" as="select" onChange={this.handleMolecularFormulaLogic}>
                                    <option value="AND">AND</option>
                                    <option value="OR">OR</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                    </Form>
                </Form.Group>




                <Form.Group>
                    <Row>
                        <Col>

                            <Form>
                                <Form.Label>Molecular weight</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleMolecularWeightMin}  type="number" />
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 74.08)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleMolecularWeightMax} type="number" />
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 3346.74)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="molecular-weight-and-or" as="select" onChange={this.handleMolecularWeightLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>

                                </Form.Row>
                            </Form>
                        </Col>

                        <Col xs lg="1" ></Col>

                        <Col>

                            <Form>
                                <Form.Label>Number of heavy atoms</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberHeavyAtomsMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 6)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberHeavyAtomsMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 209)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="heavy-atoms-and-or" as="select" onChange={this.handleNumberHeavyAtomsLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                    </Row>

                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>

                            <Form>
                                <Form.Label>Number of carbons</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfCarbonsMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfCarbonsMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 156)</Form.Text>
                                    </Col>
                                    <Col  md="auto">
                                        <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfCarbonsLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>

                        </Col>
                        <Col  xs lg="1" ></Col>
                        <Col>
                            <Form>
                                <Form.Label>Number of oxygens</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfOxygensMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfOxygensMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 109)</Form.Text>
                                    </Col>
                                    <Col  md="auto">
                                        <Form.Control name="number-oxygens-and-or" as="select" onChange={this.handleNumberOfOxygensLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                    </Row>
                </Form.Group>


                <Form.Group>
                    <Row>
                        <Col>

                            <Form>
                                <Form.Label>Number of nitrogens</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfNitrogensMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfNitrogensMax} type={"number"}/>
                                        <Form.Text className="text-muted">To (ex: 45)</Form.Text>
                                    </Col>
                                    <Col  md="auto">
                                        <Form.Control name="number-carbons-and-or" as="select" onChange={this.handleNumberOfNitrogensLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                        <Col  xs lg="1"></Col>

                        <Col>

                            <Form>
                                <Form.Label>Bond count</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleBondCountMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 5)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleBondCountMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 231)</Form.Text>
                                    </Col>
                                    <Col  md="auto">
                                        <Form.Control name="bond-count-and-or" as="select" onChange={this.handleBondCountLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Form.Group>


                <Form.Group>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Label>Contain sugars</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control name="contain-sugars" as="select" onChange={this.handleContainsSugars}>
                                            <option value="indifferent">Indifferent</option>
                                            <option value="any_sugar">Any sugar type</option>
                                            <option value="ring_sugar">Ring sugars</option>
                                            <option value="only_ring_sugar">Only ring sugars</option>
                                            <option value="linear_sugar">Linear sugars</option>
                                            <option value="only_linear_sugar">Only linear sugars</option>
                                            <option value="no_sugar">No sugar</option>
                                        </Form.Control>
                                    </Col>

                                    <Col>
                                        <Form.Control name="contain-sugars-and-or" as="select" onChange={this.handleContainSugarsLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                        <Col  xs lg="1"></Col>

                        <Col>
                            <Form>
                                <Form.Label>Number of rings</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfRingsMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNumberOfRingsMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 1639)</Form.Text>
                                    </Col>
                                    <Col  md="auto">
                                        <Form.Control name="number-rings-and-or" as="select" onChange={this.handleNumberOfRingsLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Form.Group>

                <br/>
                <h3>Molecular descriptors</h3>
                <br/>

                <Form.Group>
                    <Row>
                        <Col>


                            <Form>
                                <Form.Label>NP-likeness score</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleNPLScoreMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: -4.5)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleNPLScoreMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 4.6)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="npl-score-and-or" as="select" onChange={this.handleNPLScoreLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                        <Col md="auto"></Col>

                        <Col>
                            <Form>
                                <Form.Label>Apol</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleApolMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 6.2)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleApolMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 501.3)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="apol-and-or" as="select" onChange={this.handleApolLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Form.Group>


                <Form.Group>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Label>AlpgP</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleAlogpMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 1.5)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleAlogpMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 50.1)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="alogp-and-or" as="select" onChange={this.handleAlogpLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                        <Col md="auto"></Col>

                        <Col>
                            <Form>
                                <Form.Label>Fractional FSP3 (non-flatness of a molecule)</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleFsp3Min} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 1.5)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleFsp3Max} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 50.1)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="fsp3-and-or" as="select" onChange={this.handleFsp3Logic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Form.Group>



                <Form.Group>
                    <Row>
                        <Col>

                            <Form>
                                <Form.Label>Lipinski Rule of 5 failures</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleLipinskiMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">Minimal number of failures (0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleLipinskiMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">Maximal number of failures (5)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="lipinski-and-or" as="select" onChange={this.handleLipinskiLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>

                        <Col md="auto"></Col>

                        <Col>
                            <Form>
                                <Form.Label>Number of Spiro Atoms</Form.Label>
                                <Form.Row>
                                    <Col>
                                        <Form.Control onChange={this.handleSpiroMin} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">From (ex: 0)</Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Control onChange={this.handleSpiroMax} type={"number"}/>
                                        <Form.Control.Feedback type="invalid">Please use only numeric values.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">To (ex: 9)</Form.Text>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control name="spiro-and-or" as="select" onChange={this.handleSpiroLogic}>
                                            <option value="AND">AND</option>
                                            <option value="OR">OR</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Form.Group>





                <h3>Data sources</h3>

                <Form.Group>


                    <Form.Row>
                        <Col>
                            <Form onChange = {this.handleDBselect}>
                                <SourcesList/>
                            </Form>
                        </Col>

                        <Col md="auto">
                            <Form.Control name="select-db-all-or" as="select" onChange={this.handleDBSelectAllOne}>
                                <option value="OR">IN AT LEAST ONE</option>
                                <option value="AND">IN ALL</option>

                            </Form.Control>
                            <Form.Text className="text-muted">Select if query present in ALL the selected databases or in AT LEAST ONE</Form.Text>
                        </Col>

                        <Col md="auto">
                            <Form.Control name="select-db-and-or" as="select" onChange={this.handleDBSelectLogic}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </Form.Control>
                            <Form.Text className="text-muted">Select if this criteria adds to others with AND or with OR</Form.Text>
                        </Col>



                    </Form.Row>


                </Form.Group>



                <Container>
                    <Row className="align-items-center">
                        <Col md="auto" >
                            Select maximal number of returned hits:
                        </Col>
                        <Col md="auto">
                            <Form>
                                <Form.Group controlId="search-hits-limit">
                                    <br/>
                                    <Form.Control as="select" size="lg" name="control-hits-limit" onChange={this.handleSearchHitsLimit}  >
                                        <option value="100">100</option>
                                        <option value="250">250</option>
                                        <option value="1000">1000</option>
                                        <option value="10000">10000 (can be long)</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    {/*{searchSubmittedButIncorrect}*/}
                    {/*{alertMessage}*/}

                    <Row>
                        <Button id="structureSearchButton" variant="primary" type="submit" size="lg" block onClick={this.handleAdvancedSearchSubmit}>
                            <FontAwesomeIcon icon="search" fixedWidth/>
                            &nbsp;Submit search
                        </Button>
                    </Row>
                </Container>

                <br/>

                {resultRow}

            </Container>


        );
    }
}