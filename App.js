/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native'
import { Header, Colors } from 'react-native/Libraries/NewAppScreen'
import Auth from './Components/Auth/Auth'

const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: '#2E282A',
    },
})

// Thinking this will just be our container
const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.body}>
                <View>
                    <Auth />
                </View>
            </SafeAreaView>
        </>
    )
}

export default App
