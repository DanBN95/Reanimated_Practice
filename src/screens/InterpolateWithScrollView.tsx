import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Page from './Page';

const WORDS = ["What's", "up", "mobile", "devs?"];

const InterpolateWithScrollView = () => {

    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    })

  return (
    <Animated.ScrollView 
        pagingEnabled
        horizontal 
        style={styles.container}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
    >
        {WORDS.map((word, index) => (
            <Page 
                key={index.toString()} 
                title={word} 
                index={index} 
                translateX={translateX}    
            />
        ))}
    </Animated.ScrollView>
  )
}

export default InterpolateWithScrollView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})