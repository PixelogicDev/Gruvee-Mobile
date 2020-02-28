// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
/**
 * WinterLoreGames - "Array starts at 1, change my mind." (01/22/20)
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native'
import Auth from 'Gruvee/components/Auth'
import * as StyleConstants from 'Gruvee/config/styles'

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
                    <Auth />
                </View>
            </SafeAreaView>
        </>
    )
}

export default App
