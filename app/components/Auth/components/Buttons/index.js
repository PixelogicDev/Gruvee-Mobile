import React from 'react'
import { Platform } from 'react-native'
import AppleAuthButton from './AppleAuthButton'
import SpotifyAuthButton from './SpotifyAuthButton'

const iosButtons = [
    <AppleAuthButton key="apple-auth-button" />,
    <SpotifyAuthButton key="spotify-auth-button" />,
]
const androidButtons = [<SpotifyAuthButton key="spotify-auth-button" />]

export default Platform.select({ ios: iosButtons, android: androidButtons })
