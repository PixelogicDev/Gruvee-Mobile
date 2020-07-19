import React from 'react'
import { Platform } from 'react-native'
import AppleAuthButton from './AppleAuthButton'
import SpotifyAuthButton from './SpotifyAuthButton'

// Apple Auth is only supported on iOS 13 and up
// We will be hiding the button if device is not on iOS 13
const iOSMajorVersion = parseInt(Platform.Version, 10)
const iosButtons =
    iOSMajorVersion >= 13
        ? [
              <AppleAuthButton key="apple-auth-button" />,
              <SpotifyAuthButton key="spotify-auth-button" />,
          ]
        : [<SpotifyAuthButton key="spotify-auth-button" />]
const androidButtons = [<SpotifyAuthButton key="spotify-auth-button" />]

export default Platform.select({ ios: iosButtons, android: androidButtons })
