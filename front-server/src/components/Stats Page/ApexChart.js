import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
        zoom: {
            enabled: false
        }
          
        },
        colors: ['#7C72DD'],
        title: {
            colors: ['#77B6EA', '#545454'],
            text: 'Stock Analysis (2009 - 2016)',
            align: 'left',
            offsetX: 110,
            style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                color:  'white'
            },
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
            title: {
                text: 'Temperature'
            },
        },
        fill: {
            colors: ['#7C72DD'],
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.4,
                opacityTo: 0.6,
                stops: [0, 50, 100],
                colorStops: []
            }
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;