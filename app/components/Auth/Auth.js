// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
// sillyonly - "aaah some said JS or TS would be nice! but you know what! I think if you wrote it in C you would've made perfection!" (02/18/20)
// BackeyM - "pee pee poo poo" (02/18/20)
// dra031cko - "android > ios" (02/19/20)
// sillyonly - "SOOOOOO what happens when silly have 1800?!" (02/19/20)
import React, { memo } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import {
    BASE_BACKGROUND_COLOR,
    BASE_BUTTON_HEIGHT,
    BASE_BUTTON_SPACING,
    BASE_FONT_COLOR,
    // eslint-disable-next-line camelcase
    HEADLINE_SIZE_iOS,
    // eslint-disable-next-line camelcase
    MEDIUM_TITLE_SIZE_iOS,
    SEMIBOLD_WEIGHT,
} from '@StyleConstants'
import Buttons from './components/Buttons'

const platformFriendlyName = Platform.select({ ios: 'iOS', android: 'Android' })

// Styles
const styles = StyleSheet.create({
    ButtonContainer: numItems => ({
        justifyContent: 'space-between',
        alignItems: 'center',
        // This gives us the proper height and spacing we want for our auth buttons
        height: BASE_BUTTON_HEIGHT * numItems + BASE_BUTTON_SPACING * (numItems - 1),
    }),
    Container: {
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: BASE_BACKGROUND_COLOR,
    },
    SectionTitle: {
        fontSize: MEDIUM_TITLE_SIZE_iOS,
        color: BASE_FONT_COLOR,
    },
    SectionDetail: {
        marginTop: 25,
        fontSize: HEADLINE_SIZE_iOS,
        fontWeight: SEMIBOLD_WEIGHT,
        color: BASE_FONT_COLOR,
    },
    TextContainer: {
        justifyContent: 'center',
    },
})

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = () => {
    return (
        <View style={styles.Container}>
            <Text style={styles.SectionTitle}>Welcome to Grüvee Alpha!</Text>
            <View style={styles.TextContainer}>
                <Text style={styles.SectionDetail}>
                    Thanks for taking part in Grüvee Alpha for {platformFriendlyName}!
                </Text>
                <Text style={styles.SectionDetail}>
                    {"It's"} pretty simple, to get started select one of the providers below.
                </Text>
                <Text style={styles.SectionDetail}>
                    This will give you all the fanciness Grüvee has to offer. Please reach out on
                    the Discord for any feedback and or questions!
                </Text>
            </View>
            <View style={styles.ButtonContainer(Buttons.length)}>{Buttons}</View>
        </View>
    )
}

// sillyonly "110 to Get this! I DEMAND A DISCOUNT SINCE I AM A LOYAL CUSTOMER" (02/17/20)
export default memo(Auth)
