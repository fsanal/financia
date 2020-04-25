import React from 'react';

//styles
import styled from "styled-components"

//components
import Card from 'react-bootstrap/Card';

//icons
import economy_icon from '../../icons/economy.png';
import micro_icon from '../../icons/microscope.png'
import poli_icon from '../../icons/politics.png'
import train_icon from '../../icons/training.png'
import travel_icon from '../../icons/travel.png'
import video_icon from '../../icons/video.png'
import world_icon from '../../icons/world.png'


const HeadlineCard = () => {
    return (
        <Background>
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
            <CardWrapper>
                <StyledCard border="success" style={{}}>
                    <Card.Body>
                        <StyledImg src = {poli_icon} />
                        <StyledText>
                            A 117-year-old woman in Mexico City finally received her birth certificate, 
                            and died a few hours later.
                        </StyledText>
                    </Card.Body>
                </StyledCard>
                <StyledCard border="success" style={{}}>
                    <Card.Body>
                        <StyledImg src = {travel_icon} />
                        <StyledText>
                            A 117-year-old woman in Mexico City finally received her birth certificate, 
                            and died a few hours later. 
                        </StyledText>
                    </Card.Body>
                </StyledCard>
                <StyledCard border="success" style={{}}>
                    <Card.Body>
                        <StyledImg src = {video_icon} />
                        <StyledText>
                            A 117-year-old woman in Mexico City finally received her birth certificate, 
                            and died a few hours later. 
                        </StyledText>
                    </Card.Body>
                </StyledCard>
            </CardWrapper>
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
        </Background>
    )

}

/*
<Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>

*/

export default HeadlineCard


const Background = styled.div`
    width: 100%;
    height: 100%;
`

const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
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