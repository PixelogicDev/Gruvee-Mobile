// pheonix_d123 "Hey! Who turned out the lights?" (02/24/20)
// Kendaryth - "I can't wait to use Grüvee on my windows phone" (02/18/20)
// pheonix_d123 - "Inflation is Undeniable" app.js (02/17/20)
// ohmyshell - "Embedded custom comments are 1200 pixels refer to this in case of inflation" (02/13/20)
// evjand - "Embedded custom comments are 2000 pixels refer to this in case of inflation" (02/13/20)
// TheYagich01 - "Как я тут оказался блять? Что происходит?" (02/15/20)
// syszen - "firestore beaten! YEAYEA wins" (02/21/20)
// WinterLoreGames - "Array starts at 1, change my mind." (01/22/20)

/**
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
