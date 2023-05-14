import { StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
    translateX: number
    translateY: number
};

const SquareInsideCircle = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    console.log('here')

    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType 
    >(
    {
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        }, // Handle when we touch for the first time the squre
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        }, // When we drag the square along the view
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
            
            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
            {
                translateY: translateY.value,
            },
        ]
    }))



  return (
      <View style={styles.container}>
        <View style={styles.circle}>
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.square, rStyle]} />
            </PanGestureHandler>
    </GestureHandlerRootView>
        </View>
    </View>
  )
}

export default SquareInsideCircle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'blue',
        opacity: 0.5,
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 1,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    }
})