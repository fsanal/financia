import React, {Component} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import {extent, max} from 'd3-array';
import { AreaClosed } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { highest_close } from "../../actions/Statistics_Actions"
import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'


//misc
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//styles
import styled from "styled-components"
import axios from '../../apis/api';

var data
class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      series1: [],

      options1: {
        chart: {
          type: 'line',
          stacked: false,
          height: 350,
          background: '#fff',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        legend: {
          horizontalAlign: 'right',
        },
        dataLabels: {
          enabled: false,
          show: true
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val
            },
          },
          title: {
            text: 'Price'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      }
    }
    this.get_closings()
 
  }

  async get_closings(){
    const self = this;
        axios.get('/dji_closings')
            .then(function (response) {
              let item = {
                name: "DJI",
                data: response.data.data
              }
              var target = []
              Object.assign(target, self.state.series1)
              target.push(item)
              self.setState({
                series1:target
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/gspc_closings')
            .then(function (response) {
              let item = {
                name: "GSPC",
                data: response.data.data
              }
              var target = []
              Object.assign(target, self.state.series1)
              target.push(item)
              console.log(target)
              self.setState({
                series1:target
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/ixic_closings')
            .then(function (response) {
              let item = {
                name: "IXIC",
                data: response.data.data
              }
              var target = []
              Object.assign(target, self.state.series1)
              target.push(item)
              console.log(target)
              self.setState({
                series1:target
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
      axios.get('/rut_closings')
            .then(function (response) {
              let item = {
                name: "RUT",
                data: response.data.data
              }
              var target = []
              Object.assign(target, self.state.series1)
              target.push(item)
              console.log(target)
              self.setState({
                series1:target
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  
  
  componentDidMount() {
  }

  render() {
    return(
        <Background>
            <div className = "container">
              <div>
                <ReactApexChart options={this.state.options1} series={this.state.series1} type="area" height={350} />
              </div>
    
            </div>
        </Background>
    )
  }
  
}

const Background = styled.div`
    padding-top: 150px;
    height: 100%;
    width: 100%;
`


export default (Statistics);

