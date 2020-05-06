// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
// sillyonly - "aaah some said JS or TS would be nice! but you know what! I think if you wrote it in C you would've made perfection!" (02/18/20)
// BackeyM - "pee pee poo poo" (02/18/20)
// dra031cko - "android > ios" (02/19/20)
// sillyonly - "SOOOOOO what happens when silly have 1800?!" (02/19/20)
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as StyleConstants from '@StyleConstants'
import Buttons from './components/Buttons'

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
    },
    Container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    SectionTitle: {
        fontSize: StyleConstants.MEDIUM_TITLE_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    SectionDetail: {
        marginTop: 25,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    TextContainer: {
        justifyContent: 'center',
    },
})

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = () => {
    return (
        <View style={styles.Container}>
            <Text style={styles.SectionTitle}>Welcome to Grüvee Beta!</Text>
            <View style={styles.TextContainer}>
                <Text style={styles.SectionDetail}>
                    Thanks for taking part in Grüvee Beta for iOS and Android!
                </Text>
                <Text style={styles.SectionDetail}>
                    It's pretty simple, to get started all you need to do is press the "Login With
                    Spotify" button.
                </Text>
                <Text style={styles.SectionDetail}>
                    This will give you all the fanciness Grüvee has to offer. Please reach out on
                    the Discord for any feedback and or questions!
                </Text>
            </View>
            <View style={styles.ButtonContainer}>{Buttons}</View>
        </View>
    )
}

// sillyonly "110 to Get this! I DEMAND A DISCOUNT SINCE I AM A LOYAL CUSTOMER" (02/17/20)
export default memo(Auth)
