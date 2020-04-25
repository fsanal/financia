import React, {Component} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import BarChart from './BarChart'
import * as d3 from 'd3'
//styles
import styled from "styled-components"
import axios from '../../apis/api';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: [10, 7, 6, 2, 9, 18],
        width: 700,
        height: 500,
    }
    
    render() {
        return (
          <div className="App">
            <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
          </div>
        );
    }
}

export default Statistics