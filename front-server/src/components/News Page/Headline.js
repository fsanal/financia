import React from 'react';
import axios from '../../apis/api';

//styles
import styled from "styled-components"

//components
import Card from 'react-bootstrap/Card';

class Headline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'headlines': []
        };

        this.getHeadlines();
    }

    async getHeadlines() {
        const self = this;

        axios.get('/scan_headline')
            .then(function(response) {
                self.setState({
                    'headlines': response.data.data
                });
                self.forceUpdate();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        var cards = [];
        if (this.state.headlines.length >= 10) {
            for (var i = 0; i < 10; i++) {
                const headline = this.state.headlines[i];
                cards.push(
                    <StyledCard border="success" style={{}}>
                        <Card.Body>
                            <Card.Title>{headline[2].slice(0, -13)}</Card.Title>
                            <Card.Text>
                                <h5>Sentiment Score: {headline[3].toFixed(2)}</h5>
                                <h3>{headline[1]}</h3>
                            </Card.Text>
                        </Card.Body>
                    </StyledCard>
                );
            }
        }

        return (
            <Background>
                {cards}
            </Background>
        );
    }
}

/*
<Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>

*/

export default Headline


const Background = styled.div`
    width: 100%;
    height: 100%;
`
const StyledCard = styled(Card)`
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
    0 2px 2px rgba(0,0,0,0.11), 
    0 4px 4px rgba(0,0,0,0.11), 
    0 6px 8px rgba(0,0,0,0.11),
    0 8px 16px rgba(0,0,0,0.11);
    border-radius: 5px !important;
    border: 0px solid #9F32B2 !important;
`