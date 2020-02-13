import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './ShowMembersAction.style'

const membersIcon = require('Gruvee/Assets/Icons/Members/members_icon.png')

const ShowMembersAction = ({ showMembersAction }) => {
    return (
        <TouchableOpacity onPress={showMembersAction}>
            <Image
                accessibilityRole="image"
                accessibilityLabel={'All members icon'}
                source={membersIcon}
                style={styles.ButtonImage}
            />
        </TouchableOpacity>
    )
}

export default ShowMembersAction
