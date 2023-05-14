import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import data from "./data.json";
import Values from "./Values";
import Content from "./Content";
import Header from "./Header";
import Chart from "./Chart";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, diffClamp, add, sub, modulo, useCode, runOnJS, useDerivedValue } from "react-native-reanimated";
import Line from "./Line";
// import useValues from "../custom-hooks/useValues";

type ContextType = {
  translateX: number
  translateY: number
};


const { width: size } = Dimensions.get("window");
const candles = data.slice(0, 10);
const values = candles.map(candle => [candle.low, candle.high]).flat();
const domain: [number, number] = [Math.min(...values), Math.max(...values)];
// size of each candle
const caliber = size / candles.length;


export default () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
  PanGestureHandlerGestureEvent,
  ContextType 
>({
    onStart: (event, context) => {
      context.translateX = x.value;
      context.translateY = y.value;
    }, 
    onActive: (event, context) => {
      x.value = event.translationX;
      y.value = event.translationY;
    }, 
    onEnd: (event, context) => {},
  })
  

  const rVerticalStyle = useAnimatedStyle(() => {
    const translateY = y.value;  
    return {
      opacity: 1,
      transform: [{
        translateY
      }]
    }
  })

  const rHorizontalStyle = useAnimatedStyle(() => {
    let translateX = x.value;
    return {
      opacity: 1,
      transform: [{
        translateX
      }]
    }
  })
  return (
        <GestureHandlerRootView style={{ flex: 1}}>
    <View style={styles.container}>
      <View>
        <Header />
        <Animated.View style={{ opacity: 1 }}>
          <Values {...{ caliber, candles, candleIndex: x }} />
        </Animated.View>
      </View>
      <View>
        <Chart {...{ candles, size, caliber, domain }} />
        <PanGestureHandler minDist={0} onGestureEvent={gestureHandler}>
          <Animated.View style={[StyleSheet.absoluteFill]}>
            <Animated.View style={[StyleSheet.absoluteFillObject, rVerticalStyle]}>
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFillObject, rHorizontalStyle]}>
              <Line x={0} y={size} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Content />
    </View>
        </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  chartContainer: {
    backgroundColor: 'yellow'
  }
});
