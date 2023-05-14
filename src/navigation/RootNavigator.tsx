import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SimpleRotateSquare from '../screens/SimpleRotateSquare';
import HomeScreen from '../screens/HomeScreen';
import SquareInsideCircle from '../screens/SquareInsideCircle';
import InterpolateWithScrollView from '../screens/InterpolateWithScrollView';
import ThemeChanger from '../screens/ThemeChanger';
import CoinbasePro from '../CoinbasePro/CoinbasePro';

const RootNavigator = () => {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='SimpleRotateSquare' component={SimpleRotateSquare} />
        <Stack.Screen name='SquareInsideCircle' component={SquareInsideCircle} />
        <Stack.Screen name='InterpolateWithScrollView' component={InterpolateWithScrollView} />
        <Stack.Screen name='ThemeChanger' component={ThemeChanger} />
        <Stack.Screen name='CoinsbasePro' component={CoinbasePro} />
    </Stack.Navigator>
  )
}

export default RootNavigator
