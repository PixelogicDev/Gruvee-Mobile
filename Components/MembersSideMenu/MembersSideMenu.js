import React from 'react'
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import * as StyleConstants from '@StyleConstants'

const members = ['Alec', 'YaBoi', 'Banks']

// TheYagich01: "I am sure that I will make a joke that is relevant and will stay relevant to whenever you read this comment"
const MembersSideMenu = () => {
    // Actions
    const renderItem = ({ item }) => <Text style={styles.Item}>{item}</Text>

    const keyExtractor = item => `${item.id}`

    return (
        <SafeAreaView style={styles.Container}>
            <FlatList
                data={members}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#171616',
    },
    Item: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16,
    },
})

export default MembersSideMenu
