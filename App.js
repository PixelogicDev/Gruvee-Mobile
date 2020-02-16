// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
// TheYagich01 - "Как я тут оказался блять? Что происходит?" (02/15/20)
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
import * as StyleConstants from '@StyleConstants'
import Auth from './Components/Auth/Auth'

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
