import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

//styles
import styled from "styled-components"


const HeadlineDetail = () => {
    return (
        <>
            <StyledJumbotron>
                <Title>A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.</Title>
                <Date>2016-07-01</Date>
                <TopicWrapper>
                    <Topic background_color = '#9c88ff'>Immigration</Topic>
                    <Topic background_color = '#ff6348'>Death</Topic>
                </TopicWrapper>
                
            </StyledJumbotron>
        </>
    )
}

export default HeadlineDetail


const StyledJumbotron = styled(Jumbotron)`
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    background-color: white !important;
`
const Title = styled.h1`
    
`

const Date = styled.h4`
    margin-top: 40px;
    margin-left: 480px;
`

const TopicWrapper = styled.div`
    margin-top: 30px;
`


const Topic = styled(Button)`
    background-color: ${props => props.background_color};
    border: 0px solid black;
    margin-right: 20px;
    &:hover {
        color: ${props => props.background_color};
        background-color: white;
        border: 1px solid ${props => props.background_color};
    }
`