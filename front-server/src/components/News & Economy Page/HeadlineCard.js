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
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.props.date}</Card.Title>
                        <Card.Text>
                            {this.props.headline}
                        </Card.Text>
                    </Card.Body>
                </Card>
          </div>  
        );
    }
}

export default HeadlineCard;