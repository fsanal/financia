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
import history from '../../history';

//misc
import { connect } from 'react-redux';

//styles
import styled from "styled-components"

//actions
import { retrieveHeadlines } from "../../actions/Headline_Actions"

//icons
import i1 from '../../icons/headline icons/i1.png'
import i2 from '../../icons/headline icons/i2.png'
import i3 from '../../icons/headline icons/i4.png'
import i4 from '../../icons/headline icons/i4.png'
import i5 from '../../icons/headline icons/i5.png'
import i6 from '../../icons/headline icons/i6.png'
import i7 from '../../icons/headline icons/i7.png'
import i8 from '../../icons/headline icons/i8.png'
import i9 from '../../icons/headline icons/i9.png'
import i10 from '../../icons/headline icons/i10.png'
import i11 from '../../icons/headline icons/i11.png'
import i12 from '../../icons/headline icons/i12.png'
import i13 from '../../icons/headline icons/i13.png'
import i14 from '../../icons/headline icons/i14.png'
import i15 from '../../icons/headline icons/i15.png'
import space from '../../icons/headline icons/space.svg'
import emo from '../../icons/intelligence.svg'
import clock from '../../icons/square.svg'
import fil from '../../icons/tool.svg'
import senti from '../../icons/senti.svg'

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
        const icons = [i1, i2, i3, i4, i12, i5, i6, i12, i12, i7, i12, i8, i9, i10, i12, i11, i12, i13, i14, i15];
        
        if (!this.props.headlines){
            return (
                <>
                </>
            )
        } 
        let headline = this.props.headlines[this.props.match.params.id]
        if (!headline){
            return (
                <>
                </>
            )
        } 
        console.log(headline)
        return (
            <>
                <JumbotronWrapper>
                <StyledJumbotron>
                    <StyledImg2 onClick = {() => history.push('/headlines')} src = {icons[this.rand(icons.length)]} />
                    <Date>{headline.date.split(' ').slice(0, 4).join(' ')}</Date>
                    <Wrapper>
                        <h2>{this.renderHeadline(headline)} </h2>
                    </Wrapper>
                    
                    <Wrapper>
                        {this.renderKeywords()}
                    </Wrapper>
                    <Wrapper>
                        <SentimentWrapper>
                            <StyledImg src = {emo} />
                            <Sentiment >{`Sentiment: ${headline.sentiment_score}`}</Sentiment>
                        </SentimentWrapper>
                    </Wrapper>
                    
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

`

const StyledImg2 = styled.img`
    width: 120px;
    height: 120px;
    margin-left: 43%;
    margin-bottom: 30px;
`

const JumbotronWrapper = styled.div`
    padding-top: 150px;
    padding-bottom:100px;
`


const StyledJumbotron = styled(Jumbotron)`

    width: 800px;
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