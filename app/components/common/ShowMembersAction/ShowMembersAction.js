import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import styles from './ShowMembersAction.style'

const membersIcon = require('Gruvee/assets/icons/members/members_icon.png')

const ShowMembersAction = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={toggleDrawer(navigation)}>
            <Image
                accessibilityRole="image"
                accessibilityLabel="All members icon"
                source={membersIcon ?? null}
                style={styles.ButtonImage}
            />
        </TouchableOpacity>
    )
}

// Actions
const toggleDrawer = navigation => () => {
    navigation.dispatch(DrawerActions.toggleDrawer())
}

export default ShowMembersAction
