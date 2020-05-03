import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from '../../apis/api';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeadlineCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywords: [],
            score: 0
        };
    }

    componentWillMount() {
        if (this.props.keywords) {
            this.getKeywords();
            this.getImpactScore();
        }
    }

    getKeywords() {
        var keywords = [];
        for (var i = 0; i < this.props.keywords.length; i++) {
            const item = this.props.keywords[i]
            keywords.push(
                <li key={i}>{item}</li>
            );
        }
        this.setState({
            keywords: keywords
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

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.date}</Card.Title>
                        <Card.Text>
                            <h6>{this.props.headline}</h6>
                            <h5>Keywords: {this.state.keywords}</h5>
                            <h5>Sentiment: {this.props.sentiment}</h5>
                            <h5>Impact Score: {this.state.score}</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default HeadlineCard;