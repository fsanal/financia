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
import Headline from './Headline';
//styles
import styled from "styled-components"

const Headlines = () => {
    return (
        <>
            <StyledNavbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Financia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <FormWrap inline>
                        <Searchbar type="text" placeholder="Search For Headlines.." />
                        <FilterButton variant="outline-info">Filter</FilterButton>
                    </FormWrap>
                </Navbar.Collapse>
            </StyledNavbar>
            <Headline/>
        </>
    )
}

export default Headlines

const StyledNavbar = styled(Navbar)`
    height: 80px !important;
    background-color: white !important;
`

const FormWrap = styled(Form)`
    width:1200px;
    margin-left: 135px;
`
const Searchbar = styled(FormControl)`
    margin-right: 20px;
    align-self: center;
    width: 600px !important;
    height: 50px !important;
`

const FilterButton = styled(Button)`
    height: 50px !important;
    width: 100px !important;
`