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
import classy from '../../icons/classy.svg'


import ApexChart from './ApexChart';

//misc
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


//styles
import styled from "styled-components"
import axios from '../../apis/api';
import { faFastForward, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

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
          background: '#201E4F',
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
          labels: {
                colors: '#fff'
          }
        },
        dataLabels: {
          enabled: false,
          show: true
        },
        markers: {
          size: 0,
          strokeColor: '#fff',
          fillColors: ['#fff']
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left',
          style: {
            fontSize:  '20px',
            fontWeight:  'bold',
            fontFamily:  undefined,
            color:  'white'
          }
        },
        yaxis: {
          labels: {
              style: {
                  colors: '#fff'
              },
              
            formatter: function (val) {
              return val
            },
          },
          title: {
            text: 'Price',
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  'white'
            }
            
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#fff'
            }
          }
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
    this.getIdx2()
  }

  async getIdx2() {
    console.log("ENTERED INDX 2 BOIZ")
    const self = this;
    this.state.current_idx =  'DJI';
    axios.get('/biggest_change?idx=DJI')
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
 
  async getIdx(idx) {
    console.log(idx)
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
    var worst = {};
    if(this.state.dow_worst.length > 0){
      const item2 = this.state.dow_worst[0];
      const date = item2.date;
      const headline = item2.headline;
      const sc = item2.sentiment_score;
      worst = {data:data, headline:headline, sc:sc}
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
      
      <Background>
        <Wrap3>
              <Wrap1>
              <StyledReactApexChart options={this.state.options1} series={this.state.series1} type="area" height={500} width = {800} />
                <StyledCard2>
                    <div className="col" style={{ margin: '20px' }} >
                        <StyledH32>Sentiment Score On Day of Highest Close per Month</StyledH32>
                        <StyledTable2 striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volume_table}
                            </tbody>
                        </StyledTable2>
                    </div>
                </StyledCard2>
              </Wrap1>
              <Wrap2>
              <StyledCard>
                  <DropDownWrapper>
                     
                          <Dropdown onSelect={i => this.getIdx(i)}>
                              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                  {this.state.current_idx}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                  {idx_items}
                              </Dropdown.Menu>
                          </Dropdown>
                  </DropDownWrapper>
                     

                  <br />
                  <br />

                  {this.state.current_idx !== "" &&
                    <div className="row">
                        <div className="col" style={{ margin: '5px' }}>
                            <StyledH3>Headlines On Day With Largest Change</StyledH3>
                              <StyledTable  variant="dark" striped bordered hover>
                                  <thead>
                                      <tr>
                                          <th>Date</th>
                                          <th>Headline</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {headline_table}
                                  </tbody>
                              </StyledTable>
                        </div>
                    </div>}
                </StyledCard>
                <StyledCard3>
                        <Wrap4 >
                            <StyledImg src = {classy}/>
                              <h5>The Worst Headline On The Worst Day of Dow </h5>
                            
                        </Wrap4>
                        <Wrap5>
                          <Sco>Score: {worst.sc}</Sco>
                          <Sco>{worst.headline}</Sco>
                        </Wrap5>
                </StyledCard3>
              </Wrap2> 
        </Wrap3>

                  
              

  </Background>
    )
  }
  
}
/*

*/

const Sco = styled.h6`
  margin-left: 38px;
`


const Wrap5 = styled.div`
  display: flex;
  margin-top: 20px;
`

const Wrap4 = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
  align-items: center;

`
const StyledDropdown = styled(Dropdown.Toggle)`
  color: white !important;
  border: 1px solid '#201E4F;
`

const StyledTable = styled(Table)`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`


const StyledTable2 = styled(Table)`
  margin-left: 70px;
  margin-right: auto;
  margin-top: 25px;
  width: 600px;
`

const Wrap3 = styled.div`
  display: flex;
  margin-top: 40px;
`

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`

const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left:50px;
`

const Background = styled.div`
  
background: url(images/Purple-Abstract.jpg) no-repeat center center fixed; 
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
padding-top: 130px;
height:100%;
padding-bottom: 100px;
`
const CardWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    
`

const ScrollTable = styled(Table)`
overflow-y: scroll !important;
height: 100px;
`

const StyledReactApexChart = styled(ReactApexChart)`
`

const ApexWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  background-color: white;
  width: 300px;
`

const StyledH3 = styled.h3`
  margin-left: 100px;
`
const StyledH32 = styled.h3`
  margin-left: 50px;
  
`

const StyledImg = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 30px;
`


const StyledCard3 = styled(Card)`
    background-color: #E91E63;
    color: white;
    margin-bottom: 30px;
    margin-left: 0px;
    overflow-y: scroll !important;
    height: 200px;
    width: 700px;
    box-shadow: 0 0 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05) !important;
    border-radius: 0.2rem !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    `

const StyledCard2 = styled(Card)`
    background-color: white;
    padding-top: 20px;
    margin-bottom: 30px;
    margin-top: 20px;
    overflow-y: scroll !important;
    height: 600px;
    width: 800px;
    box-shadow: 0 0 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05) !important;
    border-radius: 0.2rem !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-weight: bold;
    `


const StyledCard = styled(Card)`
    background-color: #040327;
    color: white;
    margin-bottom: 30px;
    margin-left: 0px;
    overflow-y: scroll !important;
    height: 900px;
    width: 700px;
    box-shadow: 0 0 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05) !important;
    border-radius: 0.2rem !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    `

const DropDownWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`
export default (Statistics);

