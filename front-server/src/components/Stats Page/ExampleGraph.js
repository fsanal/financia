import React from 'react';

import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { AreaClosed, Line, Bar } from '@vx/shape';

//styles
import styled from "styled-components"

class ExampleGraph extends React.Component {
    render(){
        const data = appleStock;
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
        data.map(y);
        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(data, x)
        });
        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [0, max(data, y)],
        });
        return (
        <Background>
        <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#FFFFFF"/>
        <Group top={margin.top} left={margin.left}>
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
            <AreaClosed
               data={data}
               xScale={xScale}
               yScale={yScale}
               x={x}
               y={y}
               fill={"red"}
             />
        </Group>
     </svg>
     </Background>
     )
    }
}

export default ExampleGraph

const Background = styled.div`
    padding-top: 150px;
    height: 100%;
    width: 100%;
    background-color: white;
`