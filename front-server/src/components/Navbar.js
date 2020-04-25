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
import { faSearch} from '@fortawesome/free-solid-svg-icons'

//styles
import styled from "styled-components"


const Bar = () => {
    return (
        <>
            <StyledNavbar bg="light" expand="lg">
                <Brand href="/headlines">FINANCIA</Brand>
                
                    <FormWrap inline>
                        <SearchbarWrapper>
                            <StyledIcon icon={faSearch} />
                            <Searchbar type="text" placeholder="Search For Headlines.." />
                        </SearchbarWrapper>
                        <FilterButton variant="outline-info">Filter</FilterButton>
                    </FormWrap>
                
            </StyledNavbar>
        </>
    )
}

export default Bar

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #313896;
`

const StyledNavbar = styled(Navbar)`
    height: 100px !important;
    background-color: white !important;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 30px;
    width: 100%;
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