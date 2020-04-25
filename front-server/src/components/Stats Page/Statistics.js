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
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './xy-axis';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
//styles
import styled from "styled-components"
import axios from '../../apis/api';


class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: [
          { name: 'A', value: 3 },
          { name: 'B', value: 1 },
          { name: 'C', value: 5 },
          { name: 'D', value: 2 },
          { name: 'E', value: 8 },

        ],
      }
    
    render() {
        const { data } = this.state;
        const parentWidth = 1000;

        const margins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        };

        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;
        const ticks = 5;
        const t = transition().duration(1000);


        const xScale = scaleBand()
        .domain(data.map(d => d.name))
        .rangeRound([0, width]).padding(0.1);


        const yScale = scaleLinear()
        .domain(extent(data, d => d.value))
        .range([height, 0])
        .nice();



        return (
          <svg className="Chart"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
          >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <BarChart data={this.state.data} width={width} height={height} />
          </g>
            
          </svg>
        );
    }
}

export default Statistics