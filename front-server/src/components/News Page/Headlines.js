import React from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import HeadlineCard from './HeadlineCard';
import { Link } from 'react-router-dom';

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
        var cards = []
        var icons = [economy_icon, micro_icon, poli_icon, train_icon, travel_icon, video_icon, world_icon]
        for (let i = 0; i <= this.props.headlines.length - 3; i += 3){
            cards.push(<CardWrapper>
                <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i].id} item = {this.props.headlines[i]}/>
                <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i + 1].id} item = {this.props.headlines[i + 1]}/>
                <HeadlineCard icon = {icons[this.rand(icons.length - 1)]} key = {this.props.headlines[i + 2].id} item = {this.props.headlines[i + 2]}/>
            </CardWrapper>);
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
    console.log(state.headlines)
    return {
        headlines: Object.values(state.headlines)
    }
}

export default connect(mapStateToProps, {retrieveHeadlines})(Headlines);


const Background = styled.div`
    padding-top: 150px;
    
`

const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
`