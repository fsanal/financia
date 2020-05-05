import React, {Component} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import {extent, max} from 'd3-array';
import { highest_close } from "../../actions/Statistics_Actions"

import ApexChart from './ApexChart';

//misc
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//styles
import styled from "styled-components"
import axios from '../../apis/api';

var data = appleStock;

const width = 750;
const height = 400;
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = d => new Date(d.date); // d.date is unix timestamps
const y = d => d.close;
data.map(y); // Gives an array of all the y values
const xScale = scaleTime({
  range: [0, xMax],
  domain: extent(data, x)
});
const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});
class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dji_closings:[]
    }
    this.get_dji_closings()
 
  }

  async get_dji_closings(){
    const self = this;
        axios.get('/dji_closings')
            .then(function (response) {
                self.setState({
                    'dji_closings': response.data.data
                });
                console.log(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  
  
  componentDidMount() {
    //this.props.highest_close()
  }

  render() {
    data = this.state.dji_closings
    console.log("reached!")
    return(
      <ApexChart/>
    )
  }
  
}
/*

        <Background>
            <div className = "container">
                <svg width={width} height={height}>
                  <rect x={0} y={0} width={width} height={height} fill="#FFFFFF"/>
                    <Group top={margin.top} left={margin.left}>
                    <GradientPinkBlue id="gradient" />
                      <AreaClosed
                      
                        data={data}
                        x={d => xScale(x(d))}
                        y={d => yScale(y(d))}
                        yScale={yScale}
                        fill="url('#gradient')"
                      />
                      <AxisLeft
                        scale={yScale}
                        top={0}
                        left={0}
                        label={'Close Price ($)'}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                      />

                      <AxisBottom
                        scale={xScale}
                        top={yMax}
                        label={'Years'}
                        stroke={'#1b1a1e'}
                        tickTextFill={'#1b1a1e'}
                      />
                    </Group>
                </svg>
            </div>
        </Background>
*/
const Background = styled.div`
    padding-top: 150px;
    height: 100%;
    width: 100%;
`

const mapStateToProps = (state) => {
    
  return {
      headlines: Object.values(state.headlines)
  }
}

export default connect(mapStateToProps, {highest_close})(Statistics);

