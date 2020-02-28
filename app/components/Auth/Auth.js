/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as StyleConstants from 'Gruvee/config/styles'
import SOCIAL_PLATFORMS from 'Gruvee/config/social'

import SocialAuthButton from './components/SocialAuthButton'

const Auth = () => {
    return (
        <View style={styles.Container}>
            <View>
                <Text style={styles.SectionTitle}>Let's Get Grüvee</Text>
                <Text style={styles.SectionDetail}>
                    Let all of your wildest memes come true. Just sell your soul
                    below.
                </Text>
            </View>
            <View style={styles.ButtonContainer}>
                {SOCIAL_PLATFORMS.map(platform => (
                    <SocialAuthButton
                        key={`${platform.id}`}
                        platform={platform}
                    />
                ))}
            </View>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '20%',
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
    },
    SectionTitle: {
        fontSize: StyleConstants.LARGE_TITLE_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    SectionDetail: {
        marginTop: 25,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
})

export default Auth
