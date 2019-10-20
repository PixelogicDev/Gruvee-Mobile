/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native'

import * as StyleConstants from 'lib/Helpers/StyleConstants'

import AuthScreen from 'Gruvee/src/screens/Auth'

const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
})

const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.body}>
                <View>
                    <AuthScreen />
                </View>
            </SafeAreaView>
        </>
    )
}

export default App
