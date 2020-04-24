import React from 'react';
import axios from 'axios';
import './App.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'data': ''
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        var self = this;
        axios.get('http://localhost:5000/')
        .then(function(response) {
            self.setState({'data': response.data});
        })
        .catch(function(error) {
            self.setState({'error': error});
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.data}</h1>
            </div>
        );
    }
}

export default Home;

