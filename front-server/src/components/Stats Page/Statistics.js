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

class Statistics extends React.Component {
  constructor(props) {
    super(props);
 
  }
  
  componentDidMount() {
    //this.props.highest_close()
  }

  render() {
    
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

