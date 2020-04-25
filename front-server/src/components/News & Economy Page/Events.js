import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import axios from '../../apis/api';
import HeadlineCard from './HeadlineCard';
import 'bootstrap/dist/css/bootstrap.min.css';

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'events': [],
            'headlines': [],
            'current_event': '',
            'keywords': []
        };

        this.getEconomicEvents();
    }

    async getEconomicEvents() {
        const self = this;
        axios.get('/scan_event')
        .then(function(response) {
            var events = [];
            for (var i = 0; i < response.data.data.length; i++) {
                const item = response.data.data[i];
                events.push(item);
            }

            self.setState({
                'events': events
            });
            self.forceUpdate();
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    async getEvent(event) {
        const self = this;
        this.setState({
            'current_event': this.state.events[event-1].name
        });

        axios.get('/event_headlines?event_id='+event)
        .then(function(response) {
            var headlines = [];
            for (var i = 0; i < response.data.data.length; i++) {
                const item = response.data.data[i];
                headlines.push(item);
            }
            self.setState({
                'headlines': headlines
            });
            self.forceUpdate();
        })
        .catch(function(error) {
            console.log(error);
        });

        this.getKeywords(event);
    }

    async getKeywords(id) {
        const self = this;
        axios.get('/keywords?event_id='+id)
            .then(function(response) {
                self.setState({
                    'keywords': response.data.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        var event_items = [];
        var headlines = [];
        var sentiments = [];
        var keywords = [];
        for (var i = 0; i < this.state.events.length; i++) {
            const event = this.state.events[i];
            const id = event.id;
            const name = event.name;
            event_items.push(
                <Dropdown.Item eventKey={id} key={id}>{name}</Dropdown.Item>
            );
        }
        for (var i = 0; i < this.state.headlines.length; i++) {
            const item = this.state.headlines[i];
            const headline = item.headline;
            const date = item.date;
            const sentiment = item.sentiment_score;
            headlines.push(
                <HeadlineCard key={i} headline={headline} date={date.slice(0, -13)}></HeadlineCard>
            );
            sentiments.push(sentiment);
        }
        for (var i = 0; i < this.state.keywords.length; i++) {
            const item = this.state.keywords[i]
            keywords.push(
                <li key={i}>{item}</li>
            );
        }

        return (
            <Background>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <CardWrapper>
                                <StyledCard>
                                    <div className="row">
                                        <div className="col">
                                            <Dropdown onSelect={e => this.getEvent(e)}>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Economic Event
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {event_items}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <br/>
                                    <br/>

                                    {this.state.current_event !== "" && 
                                    <div className="row">
                                        <div className="col">
                                            <h3>Current Event: {this.state.current_event}</h3><br/>
                                            <h3>Average Sentiment: {(sentiments.reduce((a,b) => a + b, 0) / sentiments.length).toFixed(2)}</h3><br/>
                                            <h3>Keywords:</h3>
                                            <ul>
                                                {keywords}
                                            </ul>
                                        </div>
                                    </div>}
                                </StyledCard>
                            </CardWrapper>
                        </div>
                        <div className="col-6">
                            <CardWrapper>
                                <StyledCard>
                                    <div className="row">
                                        <div className="col">
                                            {headlines}
                                        </div>
                                    </div>
                                </StyledCard>
                            </CardWrapper>
                        </div>
                    </div>
                </div>
            </Background>
        );
    }
}

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

const StyledCard = styled(Card)`
    
    margin-bottom: 30px;
    margin-left: 8vw;
    
    width: 30vw;
    height: 100vh;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-family: 'Roboto', sans-serif;
`

export default Events;