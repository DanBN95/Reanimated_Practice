import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Candle as CandleType } from './Model';
import { Svg } from 'react-native-svg';
import Candle from './Candle';

// its a function that accepts a domain with range of values
// and transform it to an other function. 
// ex: domain [0,100] --- > [0,200] range
// input: 50 will turn into output 100
import { scaleLinear } from "d3-scale";


interface ChartProps {
    candles: CandleType[],
    size: number,
    caliber: number,
    domain: [number, number]
};

const Chart = ({ candles, size, caliber, domain }: ChartProps) => {
    const scaleY = scaleLinear()
    .domain(domain)
    .range([size, 0]);
    
    const scaleBody = scaleLinear()
    .domain([0, domain[1] - domain[0]])
    .range([0, size]);

  return (
    <Svg width={size} height={size}>
        {
            candles.map((candle, index) => (
                <Candle 
                    key={index} 
                    {...{ candle, caliber, scaleY, scaleBody, index }} 
                />
            ))
        }
    </Svg>
  )
}

export default Chart

const styles = StyleSheet.create({})