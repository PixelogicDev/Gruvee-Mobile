import React, { memo, useEffect } from 'react'

// Redux
import { connect } from 'react-redux'
import { FetchMembers } from 'Gruvee/redux/actions/members/MembersActions'
import { MapMembersFromPlaylist } from 'Gruvee/redux/selectors/MembersSelector'

import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'

// TheYagich01: "I am sure that I will make a joke that is relevant and will stay relevant to whenever you read this comment"
const MembersSideMenu = ({ members, currentPlaylistId }) => {
    useEffect(() => {
        // This is a tricky one, because we don't really need to fetch here
        // We need to fetch on the playlist
        // So I don't know what to put in here as we just need to watch currentPlaylistId
    }, [currentPlaylistId])

    // Actions
    const renderItem = ({ item }) => (
        <Text style={styles.Item} numberOfLines={1}>
            {item.username}
        </Text>
    )

    const keyExtractor = item => `${item.id}`

    return (
        <SafeAreaView style={styles.Container}>
            <Text style={styles.MembersTitle}>Members</Text>
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
    MembersTitle: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 55,
        paddingBottom: 15,
    },
    Item: {
        paddingTop: 5,
        paddingLeft: 20,
        textAlign: 'left',
        color: '#FFFFFF',
        fontSize: 18,
    },
})

// Redux Mappers
const mapStateToProps = state => {
    return {
        currentPlaylistId: state.PlaylistsDataReducer.currentPlaylistId,
        members: MapMembersFromPlaylist(state),
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMembers: playlistId => dispatch(FetchMembers(playlistId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(MembersSideMenu))
