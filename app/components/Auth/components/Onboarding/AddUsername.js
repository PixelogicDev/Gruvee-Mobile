// nfsdarkdevv - "MAPPLES IS A SUPERIOR ♥" (05/26/20)
// 404_mr_robot - "WATCH MR. ROBOT" (05/26/20)
import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { BASE_FONT_COLOR, HEADLINE_SIZE_iOS, LARGE_TITLE_SIZE_iOS } from '@StyleConstants'
import { IsUsernamAvailable } from 'Gruvee/firestore/userActions'

import ValidUsername from './components/ValidUsername'

// Styles
const styles = StyleSheet.create({
    Container: {
        marginHorizontal: 20,
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
})

const AddUsername = ({ user }) => {
    const [username, setUsername] = useState('')
    const [usernameAvailable, setUsernameAvailable] = useState(null)

    useEffect(() => {
        console.log(username)
        if (username.length) {
            ;(async () => {
                // YaBoiApple
                //
                const isAvailable = await isUsernameAvailable(username)
                setUsernameAvailable(isAvailable)
            })()
        } else {
            setUsernameAvailable(null)
        }
    }, [username])

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
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor={BASE_FONT_COLOR}
                    style={styles.Input}
                    value={username}
                />
            </View>
            <ValidUsername
                containerStyle={{ paddingTop: 5 }}
                username={username}
                usernameAvailable={usernameAvailable}
            />
        </SafeAreaView>
    )
}

// Actions
const isUsernameAvailable = debounce(username => {
    console.log(`Checking DB for ${username}`)
    return IsUsernamAvailable(username)
}, 400)

export default AddUsername
