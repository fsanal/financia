import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientPinkBlue, GradientLightgreenGreen, GradientTealBlue, GradientPurpleTeal} from '@vx/gradient';
import { genDateValue } from '@vx/mock-data';
import { AxisLeft, AxisRight, AxisBottom } from '@vx/axis';
import { Area, LinePath, Line } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';
//styles
import styled from "styled-components"

const data = genDateValue(20);

// accessors
const x = d => d.date;
const y = d => d.value;

// responsive utils for axis ticks
function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

export default ({ width, height, margin }) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
    nice: true
  });

  return (
    <StyledSVG width={width} height={height}>
      <GradientPinkBlue id="linear" vertical={false} fromOpacity={1} toOpacity={0.4} />
      <StyledRect x={0} y={0} width={width} height={height} fill="white" rx={5} />
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#635ED0" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#24D2F9" stopOpacity={0.2} />
            </linearGradient>
        </defs>
      <Group top={margin.top} left={margin.left}>
        <Area
          data={data}
          x={d => xScale(x(d))}
          y0={d => yScale.range()[0]}
          y1={d => yScale(y(d))}
          strokeWidth={2}
          stroke={'transparent'}
          fill={'url(#linear)'}
          curve={curveBasis}
        />
        <LinePath
          data={data}
          x={d => xScale(x(d))}
          y={d => yScale(y(d))}
          stroke={"url('#linear')"}
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top}
          left={0}
          scale={yScale}
          hideZero
          numTicks={numTicksForHeight(height)}
          label="Axis Left Label"
          labelProps={{
            fill: 'white',
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: 'Arial'
          }}
          stroke="white"
          tickStroke="white"
          tickLabelProps={(value, index) => ({
            fill: 'white',
            textAnchor: 'end',
            fontSize: 10,
            fontFamily: 'Arial',
            dx: '-0.25em',
            dy: '0.25em'
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        />
    
        <AxisBottom
          top={height - margin.bottom}
          left={0}
          scale={xScale}
          hideZero
          numTicks={numTicksForWidth(width)}
          label="TIME"
          labelProps={{
            fill: 'white',
            textAnchor: 'middle',
            fontSize: 20,
            fontFamily: 'Arial'
          }}
          stroke="white"
          tickLabelProps={(value, index) => ({
            fill: 'white',
            textAnchor: 'end',
            fontSize: 17,
            fontFamily: 'Arial',
            dx: '-0.25em',
            dy: '0.25em'
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        >
          
        </AxisBottom>
      </Group>
    </StyledSVG>
  );
};

/*

 <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke="rgba(142, 32, 95, 0.9)"
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />

*/

const StyledSVG = styled.svg`
    margin-top: 400px !important;
    margin-left: 100px;
`

const StyledRect = styled.rect`
    background-color: white;
`

/*
axis => {
            const tickLabelSize = 10;
            const tickRotate = 45;
            const tickColor = 'white';
            const axisCenter = (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
            return (
              <g className="my-custom-bottom-axis">
                {axis.ticks.map((tick, i) => {
                  const tickX = tick.to.x;
                  const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                  return (
                    <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                      <Line from={tick.from} to={tick.to} stroke={tickColor} />
                      <text
                        transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                        fontSize={tickLabelSize}
                        textAnchor="middle"
                        fill={tickColor}
                      >
                        {tick.formattedValue}
                      </text>
                    </Group>
                  );
                })}
                <text textAnchor="middle" transform={`translate(${axisCenter}, 50)`} fontSize="8">
                  {axis.label}
                </text>
              </g>
            );
          }}
          */