import React, {Component} from 'react';

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import {extent, max} from 'd3-array';
import { highest_close } from "../../actions/Statistics_Actions"
import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'
import { Dropdown, Form, Button, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';



import ApexChart from './ApexChart';

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
      indices: ['DJI','IXIC','GPSC','RUT'],
      current_idx: '',
      headlines: [],
      dow_worst: [],
      scores: [],
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
    this.get_sent_score()
    this.get_worst_dow()
 
  }

  async getIdx(idx) {
    const self = this;
    console.log(this.state.indices[idx])
    this.setState({
        'current_idx': this.state.indices[idx]
    });

    axios.get('/biggest_change?idx=' + this.state.indices[idx])
        .then(function (response) {
            var heads = [];
            for (var i = 0; i < response.data.data.length; i++) {
                const item = response.data.data[i];
                heads.push(item);
            }
            self.setState({
                'headlines': heads
            });
        })
        .catch(function (error) {
            console.log(error);
        });
  }

  async get_worst_dow(){
    const self = this;
        axios.get('/dow_worst')
            .then(function (response) {
              self.setState({
                dow_worst:response.data.data
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  async get_sent_score(){
    const self = this;
        axios.get('/sent_scores')
            .then(function (response) {
              self.setState({
                scores:response.data.data
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
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
              self.setState({
                series1:target
              })
                
            })
            .catch(function (error) {
                console.log(error);
            });
  }

  
  
  componentDidMount() {
    //this.props.highest_close()
  }

  render() {
    var idx_items = [];
    for (var i = 0; i < this.state.indices.length; i++) {
      const idx = this.state.indices[i];
      idx_items.push(
          <Dropdown.Item eventKey = {i} key = {i}>{idx}</Dropdown.Item>
      );
  }
    var worst = [];
    if(this.state.dow_worst.length > 0){
      const item2 = this.state.dow_worst[0];
      const date = item2.date;
      const headline = item2.headline;
      const sc = item2.sentiment_score;
      worst.push(
        <tr key={0}>
              <td>{date}</td>
              <td>{headline}</td>
              <td>{sc}</td>
          </tr>
      );
    }
    var headline_table = [];
    for (var i = 0; i < this.state.headlines.length; i++) {
      const item3 = this.state.headlines[i];
      const d = item3.date;
      const h = item3.headline;
      headline_table.push(
          <tr key={i}>
              <td>{d}</td>
              <td>{h}</td>
          </tr>
      );
    }
    var volume_table = [];
    for (var i = 0; i < this.state.scores.length; i++) {
      const item = this.state.scores[i];
      const date = item.date;
      const ss = item.sentiment_score;
      volume_table.push(
          <tr key={i}>
              <td>{date}</td>
              <td>{ss}</td>
          </tr>
      );
    }
    return(
      <ApexChart/>
    )
  }
  
}
/*

        <Background>
            <div className = "container">
              <div className="row">
                <div className="col-10" style={{ position: 'absolute', left: '50px', overflowX: 'hidden', overflowY: 'scroll' }}>
                    <div>
                      <ReactApexChart options={this.state.options1} series={this.state.series1} type="area" width={'90%'} height={350} />
                    </div>
                    <CardWrapper>
                      <StyledCard>
                        <div className="row">
                            <div className="col">
                                <Dropdown onSelect={i => this.getIdx(i)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Index
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {idx_items}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <br />
                        <br />

                        {this.state.current_idx !== "" &&
                          <div className="row">
                              <div className="col" style={{ margin: '20px' }}>
                                  <h3>Headlines On Day With Largest Change</h3>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Headline</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {headline_table}
                                        </tbody>
                                    </Table>
                              </div>
                          </div>}
                      </StyledCard>
                    </CardWrapper>
                    <div className="row">
                      <CardWrapper>
                          <StyledCard>
                              <div className="col" style={{ margin: '20px' }} >
                                  <h3>Sentiment Score On Day of Highest Close per Month</h3>
                                  <ScrollTable striped bordered hover>
                                      <thead>
                                          <tr>
                                              <th>Date</th>
                                              <th>Score</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {volume_table}
                                      </tbody>
                                  </ScrollTable>
                              </div>
                          </StyledCard>
                      </CardWrapper>
                  </div>
                  <div className="row">
                      <CardWrapper>
                          <StyledCard>
                              <div className="col" style={{ margin: '20px' }} >
                                  <h3>Worst Headline on Worst Day of Dow</h3>
                                  <Table striped bordered hover>
                                      <thead>
                                          <tr>
                                              <th>Date</th>
                                              <th>Headline</th>
                                              <th>Score</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {worst}
                                      </tbody>
                                  </Table>
                              </div>
                          </StyledCard>
                      </CardWrapper>
                  </div>
              </div>
            </div>
    
            </div>
        </Background>
*/
const Background = styled.div`
    padding-top: 150px;
    height: 100%;
    width: 100%;
`
const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1800px;
`

const ScrollTable = styled(Table)`
overflow-y: scroll !important;
height: 100px;
`

const StyledCard = styled(Card)`
    
    margin-bottom: 30px;
    
    width: 71vw;
    // height: 100vh;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-family: 'Roboto', sans-serif;
    `

export default (Statistics);

