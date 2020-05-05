import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../apis/api';
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

//misc
import { connect } from 'react-redux';

//styles
import styled from "styled-components"

//actions
import { retrieveHeadlines } from "../../actions/Headline_Actions"


class HeadlineDetail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            'keywords': []
        }
        this.getKeywords()
    }
    componentDidMount() {
        this.props.retrieveHeadlines()
    }

    async getKeywords() {
        console.log("ENTERED HERE")
        const self = this;
        axios.get('/keywords2?headline_id=' + this.props.match.params.id)
            .then(function (response) {
                self.setState({
                    'keywords': response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderHeadline(head) {
        let headline = head.headline
        if (headline.substring(0, 1) === 'b'){
            headline = headline.substring(1, headline.length)
        }
        return headline
    }
    rand(max) {
        return Math.floor(Math.random() * max)
    }

    renderKeywords() {
        let colors = ['#ff9f43', '#eb4d4b', '#9c88ff', '#eb4d4b', '#4834d4', '#e056fd', '#f0932b', '#eb4d4b', '#10ac84', '#2e86de', '#54a0ff', '#feca57']
        if (this.state.keywords[0]) {
            return this.state.keywords[0].map((keyw) => {
                console.log(keyw)
                return <Topic background_color = {colors[this.rand(colors.length)]}>{keyw}</Topic>
            })
        }
       
    }
    render(){
        if (!this.props.headlines){
            return (
                <>
                </>
            )
        } 
        let headline = this.props.headlines[this.props.match.params.id]
        console.log(headline)
        return (
            <>
                <JumbotronWrapper>
                <StyledJumbotron>
                    <StyledImg2 src = {world_icon} />
                    <Date>{headline.date.split(' ').slice(0, 4).join(' ')}</Date>
                    <Wrapper>
                        <h2>{this.renderHeadline(headline)} </h2>
                    </Wrapper>
                    
                    <Wrapper>
                        {this.renderKeywords()}
                    </Wrapper>
                    <Wrapper>
                        <SentimentWrapper>
                            <StyledIcon icon={faLaughBeam} />
                            <Sentiment >{`Sentiment: ${headline.sentiment_score}`}</Sentiment>
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

const mapStateToProps = (state) => {
    return {
        headlines: state.headlines
    }
}

export default connect(mapStateToProps, {retrieveHeadlines})(HeadlineDetail);



const Background = styled.div`
    background: url(images/Purple-Abstract.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding-top: 130px;
    min-height:100vh;
    padding-bottom: 100px;
`

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

const Date = styled.h4`
    margin-top: 40px;
    margin-left: 40px;
`

const Wrapper = styled.div`
    margin-top: 40px;
    margin-left: 40px;
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