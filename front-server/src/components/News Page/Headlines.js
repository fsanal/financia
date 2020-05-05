import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import HeadlineCard from './HeadlineCard';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Spinner from 'react-bootstrap/Spinner'

//styles 
import styled from "styled-components"

//misc
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//icons
import economy_icon from '../../icons/economy.png';
import micro_icon from '../../icons/microscope.png'
import poli_icon from '../../icons/politics.png'
import train_icon from '../../icons/training.png'
import travel_icon from '../../icons/travel.png'
import video_icon from '../../icons/video.png'
import world_icon from '../../icons/world.png'

//actions
import { retrieveHeadlines } from "../../actions/Headline_Actions"


class Headlines extends React.Component {

    componentDidMount() {
        this.props.retrieveHeadlines()
    }

    rand(max) {
        return Math.floor(Math.random() * max)
    }

    renderCards() {
        if (this.props.headlines.length === 0) {
            return <StyledJumbotron>
                <StyledSpinner animation="border" />
                <h1>No Results... Please wait</h1>
            </StyledJumbotron>
        }
        var cards = []
        var icons = [economy_icon, micro_icon, poli_icon, train_icon, travel_icon, video_icon, world_icon, poli_icon]
        console.log(this.props.headlines.length)
        if (this.props.headlines.length === 2) {
            cards.push(<CardWrapper key={this.props.headlines[0].id}>
                <HeadlineCard icon = {icons[this.rand(icons.length)]} key = {this.props.headlines[0].id} item = {this.props.headlines[0]}/>
                <HeadlineCard icon = {icons[this.rand(icons.length)]} key = {this.props.headlines[1].id} item = {this.props.headlines[1]}/>
            </CardWrapper>);
        } else if (this.props.headlines.length === 1) {
            cards.push(<CardWrapper key={this.props.headlines[0].id}>
                <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[0].id} item = {this.props.headlines[0]}/>
            </CardWrapper>);
        } else {
            for (let i = 0; i <= this.props.headlines.length - 3; i += 3){
                cards.push(<CardWrapper key={this.props.headlines[i].id}>
                    <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i].id} item = {this.props.headlines[i]}/>
                    <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i + 1].id} item = {this.props.headlines[i + 1]}/>
                    <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i + 2].id} item = {this.props.headlines[i + 2]}/>
                </CardWrapper>);
            }
        }
        return cards
    }

    render(){
        return (
            <>
                <Background>
                    {this.renderCards()}
                </Background>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    
    return {
        headlines: Object.values(state.headlines)
    }
}

export default connect(mapStateToProps, {retrieveHeadlines})(Headlines);

const StyledSpinner = styled(Spinner)`
    width: 80px;
    height: 80px;
    margin-bottom: 80px;
    color: #313896;
`


const Background = styled.div`
    padding-top: 150px;
    height: 100%;
    width: 100%;
`

const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
`

const StyledJumbotron = styled(Jumbotron)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    background-color: white !important;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
`
