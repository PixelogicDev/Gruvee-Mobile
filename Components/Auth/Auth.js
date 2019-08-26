import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import * as StyleConstants from '../../StyleConstants'
import SocialAuthButton from './SocialAuthButton'
import { SOCIAL_PLATFORMS } from '../../SocialConstants'

const fontColor = '#E5DADA'
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
    },
    sectionTitle: {
        fontSize: StyleConstants.LARGE_TITLE_SIZE_iOS,
        color: fontColor,
    },
    sectionDescription: {
        marginTop: 25,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: fontColor,
    },
})

export default class Auth extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.sectionTitle}>Let's Get Grüvee</Text>
                    <Text style={styles.sectionDescription}>
                        Let all of your wildest memes come true. Just sell your
                        soul below.
                    </Text>
                </View>
                <View style={styles.buttons}>
                    {SOCIAL_PLATFORMS.map((platform, index) => (
                        <SocialAuthButton key={index} platform={platform} />
                    ))}
                </View>
            </View>
        )
    }
}
