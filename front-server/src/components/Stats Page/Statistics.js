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
    componentDidMount() {
        const data = [ 2, 4, 2, 6, 8 ]
        this.drawBarChart(data)
    }
    drawBarChart(data) {
        const canvasHeight = 400
        const canvasWidth = 600
        const scale = 20
        const svgCanvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", canvasWidth)
            .attr("heigh", canvasHeight)
            .style("border", "1px solid black")
        svgCanvas.selectAll("rect")
            .data(data).enter()
                .append("rect")
                .attr("width", 40)
                .attr("height", (datapoint) => datapoint * scale)
                .attr("fill", "orange")
                .attr("x", (datapoint, iteration) => iteration * 45)
                .attr("y", (datapoint) => canvasHeight - datapoint * scale)
        }
    render() { return <div ref="canvas"></div> }
}

export default Statistics