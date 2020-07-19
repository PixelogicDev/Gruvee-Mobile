/* eslint-disable camelcase */
// nfsdarkdevv - "MAPPLES IS A SUPERIOR ♥" (05/26/20)
// 404_mr_robot - "WATCH MR. ROBOT" (05/26/20)
import React, { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {
    ALPHA_40,
    BASE_BUTTON_BACKGROUND_DARK_COLOR,
    BASE_FONT_COLOR,
    BUTTON_TEXT_SIZE_iOS,
    HEADLINE_SIZE_iOS,
    LARGE_TITLE_SIZE_iOS,
} from '@StyleConstants'
import { IsUsernameAvailable } from 'Gruvee/firestore/userActions'
import {
    CreateDocumentAndSignInRequest,
    CreateProviderUserRequest,
} from 'Gruvee/components/Auth/components/Buttons/actions/SharedActions'
import { connect } from 'react-redux'
import { UserSignInCompleteSelector } from 'Gruvee/redux/selectors/UserSelector'

import ValidUsername from './components/ValidUsername'

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 150,
    },
    ButtonText: {
        fontSize: BUTTON_TEXT_SIZE_iOS,
        textAlign: 'center',
    },
    ButtonTextDisabled: {
        color: '#9A9A9A',
    },
    ButtonTextEnabled: {
        color: 'white',
    },
    Container: {
        marginHorizontal: 20,
    },
    GetStartedButton: {
        minHeight: 44,
        width: '50%',
        justifyContent: 'center',
        backgroundColor: BASE_BUTTON_BACKGROUND_DARK_COLOR + ALPHA_40,
        borderWidth: 1,
        borderRadius: 5,
    },
    GetStartedButtonEnabled: {
        borderColor: '#C3EF87',
    },
    GetStartedDisabled: {
        borderColor: '#FEAF68',
    },
    Header: {
        color: BASE_FONT_COLOR,
        fontSize: LARGE_TITLE_SIZE_iOS,
        paddingTop: 30,
        paddingBottom: 25,
    },
    Headline: {
        color: BASE_FONT_COLOR,
        fontSize: HEADLINE_SIZE_iOS,
    },
    InputContainer: {
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 125,
        paddingHorizontal: 5,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#424242',
    },
    Input: {
        color: 'white',
        fontSize: 12,
        paddingLeft: 5,
    },
    ValidUsernameContainer: {
        paddingTop: 5,
    },
})

const USERNAME_MIN_LEN = 3

const AddUsername = ({ navigation, route, userSignInComplete }) => {
    const [username, setUsername] = useState('')
    const [usernameAvailable, setUsernameAvailable] = useState(null)
    const [isTyping, setIsTyping] = useState(false)

    // Route Params
    const { appleCredential, applePlatform } = route.params

    // Way to add username that is being searched for
    const [, cancel] = useDebounce(
        async () => {
            if (username.length) {
                if (username.length >= USERNAME_MIN_LEN) {
                    // toLower username value to check for proper username in DB
                    const result = await IsUsernameAvailable(username.toLowerCase())
                    setUsernameAvailable(result)
                } else {
                    setUsernameAvailable(false)
                }

                setIsTyping(false)
            }
        },
        450,
        [username]
    )

    return (
        <SafeAreaView style={styles.Container}>
            <Text style={styles.Header}>Choose your username</Text>
            <Text style={styles.Headline}>
                This will be the name all your friends see when inviting you to a playlist. Make it
                count!
            </Text>
            <View style={styles.InputContainer}>
                <TextInput
                    // clearButtonMode="always"
                    onKeyPress={() => setIsTyping(true)}
                    onChangeText={value => setUsername(value.replace(/\s/g, ''))}
                    placeholder="Enter username"
                    placeholderTextColor={BASE_FONT_COLOR}
                    style={styles.Input}
                    value={username}
                />
            </View>
            <ValidUsername
                containerStyle={styles.ValidUsernameContainer}
                isTyping={isTyping}
                username={username}
                usernameAvailable={usernameAvailable}
            />
            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={mergeGetButtonStyles(usernameAvailable, isTyping, username)}
                    onPress={getStartedAction(
                        username,
                        appleCredential,
                        applePlatform,
                        navigation,
                        cancel,
                        userSignInComplete
                    )}
                    disabled={!isEnabled(usernameAvailable, isTyping, username)}
                >
                    <Text style={mergeGetButtonTextStyles(usernameAvailable, isTyping, username)}>
                        {"Let's"} Get Grüvee
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

// Helpers
const isEnabled = (usernameIsAvaiable, isTyping, username) => {
    return !isTyping && username.length >= USERNAME_MIN_LEN && usernameIsAvaiable
}

const mergeGetButtonStyles = (usernameIsAvaiable, isTyping, username) => {
    const mergeStyle = isEnabled(usernameIsAvaiable, isTyping, username)
        ? styles.GetStartedButtonEnabled
        : styles.GetStartedDisabled
    return { ...styles.GetStartedButton, ...mergeStyle }
}

const mergeGetButtonTextStyles = (usernameIsAvaiable, isTyping, username) => {
    const mergeStyle = isEnabled(usernameIsAvaiable, isTyping, username)
        ? styles.ButtonTextEnabled
        : styles.ButtonTextDisabled
    return { ...styles.ButtonText, ...mergeStyle }
}

const getStartedAction = (
    username,
    appleCreds,
    platform,
    navigation,
    cancelDebounce,
    userSignInComplete
) => async () => {
    cancelDebounce()

    try {
        const user = await CreateDocumentAndSignInRequest(username, appleCreds, platform)

        // For Apple add document to provider_users
        if (platform.platformName === 'apple') {
            console.log('Writing Apple user to provider_users collection')

            await CreateProviderUserRequest(user.uid, `${platform.platformName}:${platform.id}`)

            // In case user wasn't signed in because the process above was taking too long, reload user
            if (!userSignInComplete) {
                console.log('User sign in did not complete, reloading user.')
                user.reload()
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Redux Mappers
const mapStateToProps = state => {
    return {
        userSignInComplete: UserSignInCompleteSelector(state),
    }
}

export default connect(mapStateToProps, null)(AddUsername)
