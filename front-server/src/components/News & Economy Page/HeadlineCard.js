import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from '../../apis/api';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeadlineCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
          <div>
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.date}</Card.Title>
                        <Card.Text>
                            <p>{this.props.headline}</p>
                            <h5>Impact Score: {this.props.impact_score}</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
          </div>  
        );
    }
}

export default HeadlineCard;