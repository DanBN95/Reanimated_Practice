import { Dimensions, StyleSheet, Switch, Text } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8'
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E'
  }
}

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)'
}

const SIZE = Dimensions.get('window').width * 0.7;

type Theme = 'light' | 'dark';

const ThemeChanger = () => {

  const [theme, setTheme] = useState<Theme>('light');

  /* 
    useDerivedValue
    This hook allows for creating shared value reference that can change 
    in response to updating of one or more other shared values.
  */
  const progress = useDerivedValue(() => theme === 'light' ? withTiming(0) : withTiming(1));

  const rStyle = useAnimatedStyle(() => {
    /* 
      interpolateColor
      gets a shared value, inputRange array, and outputRange array
      Thared value displays is by input[i] ==> output[i]
      in this example: 0 ==> light_bg, 1 ==> dark_bg 
    */
    const backgroundColor = interpolateColor(
      progress.value, 
      [0,1], 
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    }
  })
  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value, 
      [0,1], 
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor,
    }
  })
  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value, 
      [0,1], 
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color,
    }
  })

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch 
          value={theme === 'dark'}
          onValueChange={(toggled) => setTheme(toggled ? 'dark' : 'light')}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor='violet'
        />
      </Animated.View>
    </Animated.View>
  )
}

export default ThemeChanger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 20,
      height: 20
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8
  },
  text: {
    fontSize: 50,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 25,
  }
})