import React from 'react';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Background>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <CardWrapper>
                                <StyledCard>
                                    
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