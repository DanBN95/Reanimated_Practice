import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Candle as CandleType } from './Model';
import { ScaleLinear } from 'd3-scale';
import { Line, Rect } from 'react-native-svg';

interface CandleProps {
    candle: CandleType,
    caliber: number,
    scaleY: ScaleLinear<number,number>,
    scaleBody: ScaleLinear<number,number>,
    index: number
};

const MARGIN = 4;

const Candle = ({ 
    candle: { 
        low, 
        high, 
        open, 
        close 
    }, 
    caliber, 
    scaleY, 
    scaleBody,
    index
}: CandleProps) => {
    // candle color
    const color = open > close ? "#4AFA9A" : "#E33F64";
    
    // indicates the x value of the Line location
    const x = caliber * index + 0.5 * caliber;
    const line_y1 = scaleY(high);
    const line_y2 = scaleY(low);

    const rectX = caliber * index + MARGIN;
    const rectY = scaleY(Math.max(open, close));
    const rectWidth = caliber - MARGIN;
    const rectHeight = scaleBody(Math.max(open, close) - Math.min(open, close))

  return (
    <>
        <Line 
            x1={x} 
            x2={x} 
            y1={line_y1} 
            y2={line_y2} 
            stroke={color} 
            strokeWidth={1} 
        />
        <Rect 
            x={rectX} 
            y={rectY} 
            width={rectWidth} 
            height={rectHeight}
            fill={color} 
        />
    </>
  )
}

export default Candle

const styles = StyleSheet.create({})