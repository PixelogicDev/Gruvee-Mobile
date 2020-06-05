import React from 'react'
import { Text, View } from 'react-native'
import Styles from './TagInputItem.styles'

const TagInputItem = ({ isHighlighted, user }) => {
    return (
        <View style={[Styles.Container, isHighlighted ? Styles.Highlighted : {}]}>
            <Text key={user.objectID} style={Styles.Item}>
                {user.displayName}
            </Text>
        </View>
    )
}

export default TagInputItem
