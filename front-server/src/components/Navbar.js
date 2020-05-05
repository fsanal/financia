import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import history from '../history';

//styles
import styled from "styled-components"

//actions
import { searchHeadlines, retrieveHeadlines } from '../actions/Headline_Actions'

//misc
import { connect } from 'react-redux';

class Bar extends React.Component {

    constructor(props){
        super(props);
        this.timeout =  0;
        this.state = {
            startdate: 'YYYY-MM-DD',
            enddate: 'YYYY-MM-DD',
            searchQuery: '',
            show: false,
            display: ''
        }
    }

    searchText = (e) => { 
        if (window.location.href != "http://localhost:3000/headline") {
            history.push('/headlines')
        }
        var searchQuery = e.target.value; 
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({searchQuery});
            this.submitDate()
        }, 700);
    }

    isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
    }

    submitDate = () => {
        this.setState({show: false});
        let searchQuery = this.state.searchQuery;
        let startdate = this.state.startdate;
        let enddate = this.state.enddate;
        let validStart = this.isValidDate(startdate)
        let validEnd = this.isValidDate(enddate)
        if (validStart && validEnd){
            this.props.searchHeadlines({searchQuery, startdate, enddate});
        } else if (validStart) {
            this.props.searchHeadlines({searchQuery, startdate})
        } else if (validEnd) {
            this.props.searchHeadlines({searchQuery, enddate})
        } else {
            this.props.searchHeadlines({searchQuery});
            this.setState({startdate: 'YYYY-MM-DD', enddate: 'YYYY-MM-DD'})
        }
        this.setState({display: ''})
        
    }

    render() {
        return (
            <>
                <StyledNavbar bg="light" expand="lg">
                    <Brand href="/headlines">FINANCIA</Brand>
                        <FormWrap inline>
                            <SearchbarWrapper>
                                <StyledIcon icon={faSearch} />
                                <Searchbar onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange = {this.searchText} type="text" placeholder="Search For Headlines.." />
                            </SearchbarWrapper>
                            <OverlayTrigger
                                
                                trigger = 'click'
                                placement={'bottom'}
                                overlay={
                                <StyledPopover display = {this.state.display} id={`popover-positioned-bottom`}>
                                   
                                    <StyledPopoverContent>
                                        <Form>
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Label >Start Date</Form.Label>
                                                <Form.Control onChange ={(e) => {this.setState({startdate: e.target.value})}} placeholder={this.state.startdate} />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control onChange ={(e) => {this.setState({enddate: e.target.value})}} placeholder={this.state.enddate} />
                                            </Form.Group>
                                            <SubmitButton onClick = {this.submitDate} >Submit</SubmitButton>
                                        </Form>
                                    </StyledPopoverContent>
                                </StyledPopover>
                                }
                            >
                                <FilterButton onClick = {() => this.setState({display: ''})} >Filter</FilterButton>
                            </OverlayTrigger>{' '}
                            
                        </FormWrap>
                        <StyledButton8 onClick = {() => history.push('/events')} variant="outline-primary">Historical Events</StyledButton8>{' '}
                        <StyledButton8 onClick = {() => history.push('/stats')} variant="outline-warning">Economy Statistics</StyledButton8>{' '}
                </StyledNavbar>
            </>
        )
    }
}


export default connect(null, {searchHeadlines, retrieveHeadlines})(Bar);

const StyledButton8 = styled(Button)`
    margin-right: 20px;
`

const StyledPopover = styled(Popover)`
    display: ${props => props.display};
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #313896;
`

const StyledNavbar = styled(Navbar)`
    box-shadow: 0 2px 4px rgba(3,27,78,.1);
    height: 100px !important;
    background-color: white !important;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 30px;
    width: 100%;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 1;
`

const FormWrap = styled(Form)`
    width:1400px;
    margin-left: 120px;
`

const SearchbarWrapper = styled.div`
    border-bottom: 2px solid #313896;
    display: flex;
    align-items: center;
`

const Searchbar = styled(FormControl)`
    align-self: center;
    width: 700px !important;
    height: 50px !important;
    border: none !important;
    font-size: 18px;
    margin-left: 10px;
    color: #313896 !important;
    &:focus {
        outline: none !important;
        outline-offset: none !important;
    }
    &::placeholder {
        color: #313896 !important;
        opacity: 0.6;
    }
`

const FilterButton = styled(Button)`
    height: 50px !important;
    width: 100px !important;
    border: 0.5px solid #313896;
    margin-left: 30px;
    color: #313896;
    background-color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
        background-color: #313896;
        color: white
        border: 0.5px solid #313896 !important;
    }
`

const SubmitButton = styled(Button)`
    height: 50px !important;
    width: 100px !important;
    border: 0.5px solid #313896;
    margin-left: 50px;
    color: #313896;
    background-color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
        background-color: #313896;
        color: white
        border: 0.5px solid #313896 !important;
    }
`

const Brand = styled(Navbar.Brand)`
    margin-left: 30px;
    font-size: 30px !important;
    color: #313896 !important;
`

const StyledPopoverContent = styled(Popover.Content)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`