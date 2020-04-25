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

//icons
import economy_icon from '../../icons/economy.png';
import micro_icon from '../../icons/microscope.png'
import poli_icon from '../../icons/politics.png'
import train_icon from '../../icons/training.png'
import travel_icon from '../../icons/travel.png'
import video_icon from '../../icons/video.png'
import world_icon from '../../icons/world.png'

//styles
import styled from "styled-components"


class HeadlineDetail extends React.Component {

    render(){
        return (
            <>
                <JumbotronWrapper>
                <StyledJumbotron>
                    <StyledImg2 src = {world_icon} />
                    <Date>January 7, 2016</Date>
                    <Wrapper>
                        <h2>A 117-year-old woman in Mexico City finally received her birth certificate, 
                            and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                            she had been born in 1898. </h2>
                    </Wrapper>
                    
                    <Wrapper>
                        <Topic background_color = '#9c88ff'>Immigration</Topic>
                        <Topic background_color = '#ff6348'>Death</Topic>
                    </Wrapper>
                    <Wrapper>
                        <SentimentWrapper>
                            <StyledIcon icon={faLaughBeam} />
                            <Sentiment >Sentiment: 0.5</Sentiment>
                        </SentimentWrapper>
                    </Wrapper>
                    <CardWrapper>
                        <StyledCard border="success" style={{}}>
                            <Card.Body>
                                <StyledImg src = {economy_icon} alt = "Economy Icon"/>
                                <StyledText>
                                    A 117-year-old woman in Mexico City finally received her birth certificate, 
                                    and died a few hours later. 
                                </StyledText>
                            </Card.Body>              
                        </StyledCard>
                        <StyledCard border="success" style={{}}>
                            <Card.Body>
                                <StyledImg src = {train_icon} />
                                <StyledText>
                                    A 117-year-old woman in Mexico City finally received her birth certificate, 
                                    and died a few hours later.
                                </StyledText>
                            </Card.Body>       
                        </StyledCard>
                        <StyledCard border="success" style={{}}>
                            <Card.Body>
                                <StyledImg src = {economy_icon} />
                                <StyledText>
                                    A 117-year-old woman in Mexico City finally received her birth certificate, 
                                    and died a few hours later. 
                                </StyledText>
                            </Card.Body>
                        </StyledCard>
                    </CardWrapper>
                </StyledJumbotron>
                </JumbotronWrapper>
            </>
        )
    }  
}

/*<StyledIcon icon={faLaughBeam} />*/
export default HeadlineDetail


const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    
`
const StyledCard = styled(Card)`
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 300px;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    &:hover {
        cursor: pointer;
        box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
    }
    font-family: 'Roboto', sans-serif;
    border: 1px solid rgba(36, 37, 38, 0.08) !important;
`

const StyledText = styled(Card.Text)`
    margin-top: 30px;
    margin-left: 12px;
`

const StyledImg = styled.img`
    width: 100px;
    height: 100px;
    margin-left: 81px;
`

const StyledImg2 = styled.img`
    width: 150px;
    height: 150px;
    margin-left: 43%;
`

const JumbotronWrapper = styled.div`
    padding-top: 150px;
`


const StyledJumbotron = styled(Jumbotron)`

    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    background-color: white !important;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: #2ecc71;
    font-size: 80px;
    display: inline;
`

const Date = styled.h3`
    margin-top: 40px;
    margin-left: 30px;
`

const Wrapper = styled.div`
    margin-top: 40px;
    margin-left: 30px;
    margin-right: auto;
`

const SentimentWrapper = styled.div`
    display: flex;
    align-items: center;
`





const Sentiment = styled.div`
    display:inline;
    font-size: 30px;
    margin-left: 20px;
    color: ${props => props.color} !important;
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