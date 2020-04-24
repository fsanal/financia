import React from 'react';

//styles
import styled from "styled-components"

//components
import Card from 'react-bootstrap/Card';

const Headline = () => {
    return (
        <Background>
            <StyledCard border="success" style={{}}>
                <Card.Body>
                    <Card.Title>2016-07-01</Card.Title>    
                    <Card.Text>
                        A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.
                    </Card.Text>
                </Card.Body>              
            </StyledCard>
            <StyledCard border="success" style={{}}>
                <Card.Body>
                    <Card.Title>2016-07-01</Card.Title>    
                    <Card.Text>
                        A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.
                    </Card.Text>
                </Card.Body>       
            </StyledCard>
            <StyledCard border="success" style={{}}>
                <Card.Body>
                    <Card.Title>2016-07-01</Card.Title>    
                    <Card.Text>
                        A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.
                    </Card.Text>
                </Card.Body>
            </StyledCard>
            <StyledCard border="success" style={{}}>
                <Card.Body>
                    <Card.Title>2016-07-01</Card.Title>    
                    <Card.Text>
                        A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.
                    </Card.Text>
                </Card.Body>
            </StyledCard>
            <StyledCard border="success" style={{}}>
                <Card.Body>
                    <Card.Title>2016-07-01</Card.Title>    
                    <Card.Text>
                        A 117-year-old woman in Mexico City finally received her birth certificate, 
                        and died a few hours later. Trinidad Alvarez Lira had waited years for proof that 
                        she had been born in 1898.
                    </Card.Text>
                </Card.Body>
            </StyledCard>
        </Background>
    )

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