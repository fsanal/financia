import React from 'react';

//styles
import styled from "styled-components"

//components
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

//icons
import economy_icon from '../../icons/economy.png';
import micro_icon from '../../icons/microscope.png'
import poli_icon from '../../icons/politics.png'
import train_icon from '../../icons/training.png'
import travel_icon from '../../icons/travel.png'
import video_icon from '../../icons/video.png'
import world_icon from '../../icons/world.png'


class HeadlineCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeadline(){
        let headline = this.props.item.headline
        let left = 30
        let bool = false
        while (headline.length > 130){
            headline = headline.split(' ').slice(0,left).join(' ');
            left -= 10;
            bool = true
        }
        if (bool) {
            headline = headline + '...'
        }
        return headline
    }

    render(){
        return (
            <StyledLink to={`/detail/${this.props.item.id}`}>
                <StyledCard>
                    <StyledBody>
                        <StyledImg src = {this.props.icon} />
                        <StyledText>
                            {this.renderHeadline()}
                        </StyledText>
                    </StyledBody>
                </StyledCard>
            </StyledLink>
        )
    }

}

/*
<Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>

*/

export default HeadlineCard



const StyledCard = styled(Card)`
    
    margin-bottom: 30px;
    
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
    margin-top: 40px;
    padding-left: 15px;

    color: #202124;
`

const StyledImg = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 20px;
`

const StyledBody = styled(Card.Body)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-left: auto;
    margin-right: auto;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;