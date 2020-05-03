import React from 'react';
import { Dropdown, Form, Button, Table } from 'react-bootstrap';
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
            'keywords': [],
            'impactful_events': [],
            'min_volumes': []
        };

        this.getEconomicEvents();
        this.getMinVolumes();
    }

    async getMinVolumes() {
        const self = this;
        axios.get('/min_volumes')
            .then(function (response) {
                self.setState({
                    'min_volumes': response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getEconomicEvents() {
        const self = this;
        axios.get('/scan_event')
            .then(function (response) {
                var events = [];
                for (var i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    events.push(item);
                }

                self.setState({
                    'events': events
                });
                // self.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getEvent(event) {
        const self = this;
        this.setState({
            'current_event': this.state.events[event - 7].name
        });

        axios.get('/event_headlines?event_id=' + event)
            .then(function (response) {
                var headlines = [];
                for (var i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    headlines.push(item);
                }
                self.setState({
                    'headlines': headlines
                });
                // self.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });

        this.getKeywords(event);
    }

    async getKeywords(id) {
        const self = this;
        axios.get('/keywords?event_id=' + id)
            .then(function (response) {
                self.setState({
                    'keywords': response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    count(sentence, word) {
        sentence += '';
        word += '';

        if (word.length <= 0) {
            return sentence.length + 1;
        }

        word = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (sentence.match(new RegExp(word, 'gi')) || []).length;
    }

    getImpactScore() {
        var score = 0;
        for (var i = 0; i < this.props.keywords.length; i++) {
            const keyword = this.props.keywords[i];
            score += this.count(this.props.headline, keyword);
        }
        this.setState({
            score: score
        });
    }

    async getImpactfulEvents(threshold) {
        const self = this;
        axios.get('/impactful_events?threshold=' + threshold)
            .then(function (response) {
                const events = response.data.data;
                self.setState({
                    'impactful_events': events
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var event_items = [];
        var headlines = [];
        var sentiments = [];
        var scores = [];
        var events_table = [];
        var volume_table = [];
        for (var i = 0; i < this.state.events.length; i++) {
            const event = this.state.events[i];
            const id = event.id;
            const name = event.name;
            event_items.push(
                <Dropdown.Item eventKey={id} key={i}>{name}</Dropdown.Item>
            );
        }
        for (var i = 0; i < this.state.headlines.length; i++) {
            const item = this.state.headlines[i];
            const headline = item.headline;
            const date = item.date;
            const sentiment = item.sentiment_score;
            var score = 0;
            if (this.state.keywords[i]) {
                for (var j = 0; j < this.state.keywords[i].length; j++) {
                    const word = this.state.keywords[i][j];
                    score += this.count(headline, word);
                }
            }
            headlines.push(
                <HeadlineCard key={i} headline={headline} date={date.slice(0, -13)} sentiment={sentiment} keywords={this.state.keywords[i]} impact_score={score}></HeadlineCard>
            );
            sentiments.push(sentiment);
        }
        for (var i = 0; i < this.state.impactful_events.length; i++) {
            const item = this.state.impactful_events[i];
            const event_name = item.name;
            const event_year = item.year;
            events_table.push(
                <tr key={i}>
                    <td>{event_name}</td>
                    <td>{event_year}</td>
                </tr>
            );
        }
        for (var i = 0; i < this.state.min_volumes.length; i++) {
            const item = this.state.min_volumes[i];
            const event_name = item.name;
            const vol = item.min_volume;
            volume_table.push(
                <tr key={i}>
                    <td>{event_name}</td>
                    <td>{vol}</td>
                </tr>
            );
        }

        const submitForm = (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const threshold = form.elements.threshold.value;
            this.getImpactfulEvents(threshold);
        }

        return (
            <Background>
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{ position: 'absolute', left: '50px', overflowX: 'hidden', overflowY: 'scroll' }}>
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

                                    <br />
                                    <br />

                                    <div className="row">
                                        <div className="col" style={{ margin: '20px' }}>
                                            <h3>Most Impactful Events</h3>
                                            <Form onSubmit={submitForm}>
                                                <Form.Group controlId="threshold">
                                                    <Form.Control type="text" placeholder="Enter Sentiment Threshold (eg. 0.5)" />
                                                </Form.Group>
                                                <Button type="submit">Submit</Button>
                                            </Form> <br />
                                            {this.state.impactful_events.length != 0 &&
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Event</th>
                                                            <th>Year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {events_table}
                                                    </tbody>
                                                </Table>
                                            }
                                        </div>
                                    </div>

                                    <br />
                                    <br />

                                    {this.state.current_event !== "" &&
                                        <div className="row">
                                            <div className="col" style={{ margin: '20px' }}>
                                                <h3>Current Event:</h3>
                                                <p>{this.state.current_event}</p>
                                                <h3>Average Sentiment: {(sentiments.reduce((a, b) => a + b, 0) / sentiments.length).toFixed(2)}</h3><br />
                                            </div>
                                        </div>}
                                </StyledCard>
                            </CardWrapper>

                            <div className="row">
                                <CardWrapper>
                                    <StyledCard>
                                        <div className="col" style={{ margin: '20px' }} >
                                            <h3>Minimum Intraday Volume During Economic Events</h3>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Event</th>
                                                        <th>Minimum Intraday Volume</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {volume_table}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </StyledCard>
                                </CardWrapper>
                            </div>

                            {this.state.current_event !== '' &&
                                <div className="row">
                                    <CardWrapper>
                                        <StyledCard>
                                            <h1>TODO: Insert Economic Graph</h1>
                                        </StyledCard>
                                    </CardWrapper>
                                </div>}
                        </div>
                        <div className="col-6" style={{ position: 'absolute', right: '50px', overflowX: 'hidden', overflowY: 'scroll' }}>
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
    // height: 100%;
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
    margin-left: 6vw;
    
    width: 35vw;
    // height: 100vh;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-family: 'Roboto', sans-serif;
`

export default Events;