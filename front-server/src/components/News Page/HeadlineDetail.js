import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons'
import { TagCloud } from 'react-tagcloud'
 
//styles
import styled from "styled-components"


const HeadlineDetail = () => {
    return (
        <>
            <StyledJumbotron>
                <StyledIcon icon={faLaughBeam} />
                <Wrapper>
                    <h1>A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898. </h1>
                </Wrapper>
                <Date>2016-07-01</Date>
                <Wrapper>
                    <Topic background_color = '#9c88ff'>Immigration</Topic>
                    <Topic background_color = '#ff6348'>Death</Topic>
                </Wrapper>
                <CardWrapper>
                    <StyledCard >
                        <Card.Body>
                            <Sentiment>Sentiment: 0.85</Sentiment>
                            <StyledText>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </StyledText>
                            
                        </Card.Body>
                    </StyledCard>
                    <StyledCard >
                        <Card.Body>
                            <Card.Title>Sentiment: 0.35</Card.Title>
                            <StyledText>
                            A woman in Mexico City finally received her birth certificate,
                            </StyledText>
                            
                        </Card.Body>
                    </StyledCard>
                    <StyledCard >
                        <Card.Body>
                            <Card.Title>Sentiment: 0.25</Card.Title>
                            
                            <StyledText>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </StyledText>
                            
                        </Card.Body>
                    </StyledCard>
                    <StyledCard >
                        <Card.Body>
                            <Card.Title>Sentiment: 0.75</Card.Title>
                            
                            <StyledText>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </StyledText>
                            
                        </Card.Body>
                    </StyledCard>
                </CardWrapper>
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

const StyledCard = styled(Card)`
    display: inline-block !important;
    margin-right: 36px;
    width: 15rem !important;
    height: 17rem !important;
`

const StyledText = styled(Card.Text)`
    height: 5rem !important;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #2ecc71;
    font-size: 100px;
    margin-left: 45%;
    margin-right:
`

const Date = styled.h3`
    margin-top: 30px;
    margin-left: 43%;
`

const Wrapper = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    margin-right: auto;
`

const CardWrapper = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    margin-right: auto;
    display:flex;
`

const Sentiment = styled(Card.Title)`
    color: #2ecc71 !important;
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