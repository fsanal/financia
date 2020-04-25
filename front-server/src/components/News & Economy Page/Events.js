import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import axios from '../../apis/api';
import 'bootstrap/dist/css/bootstrap.min.css';

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'events': []
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
                const id = item.id;
                const event = item.name;
                events.push(event);
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
        console.log(event);
    }

    render() {
        var event_items = [];
        for (var i = 0; i < this.state.events.length; i++) {
            const event = this.state.events[i];
            event_items.push(
                <Dropdown.Item eventKey={event} key={i}>{event}</Dropdown.Item>
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
                                </StyledCard>
                            </CardWrapper>
                        </div>
                        <div className="col-6">
                            <CardWrapper>
                                <StyledCard>

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
    height: 75vh;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-family: 'Roboto', sans-serif;
`

export default Events;