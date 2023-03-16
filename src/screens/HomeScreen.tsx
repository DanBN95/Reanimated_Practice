import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { screensEnabled } from 'react-native-screens';

const HomeScreen = () => {

    const navigation = useNavigation();

    const screenSettings = [
        {
            name: 'Go to Simple Rotate Square',
            onClick: () => navigation.navigate('SimpleRotateSquare')
        },
        {
            name: 'Go to Square Inside Circle',
            onClick: () => navigation.navigate('SquareInsideCircle')
        },
        {
            name: 'Go to Interpolate with ScrollView',
            onClick: () => navigation.navigate('InterpolateWithScrollView')
        },
        {
            name: 'Go to Theme Changer Screen',
            onClick: () => navigation.navigate('ThemeChanger')
        },
    ]

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <Text style={styles.headerText}>HomeScreen</Text>
        </View>
        <View style={styles.buttonsContainer}>
            {screenSettings.map((screen, index) => (
                <Button 
                key={`${screen.name}#${index}`}
                title={screen.name} 
                onPress={screen.onClick} 
                />
            ))}
        </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 20,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 21
    }
    
})