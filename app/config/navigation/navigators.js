// nfsdarkdevv - "DarkDevV_ is bae. Best web developer" (05/11/20)
// Isakfk1234: "Pixelogicdev mom was here" (05/20/20)
import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Components
import Auth from 'Gruvee/components/Auth'
import PlaylistListView from 'Gruvee/components/PlaylistListView'
// W0lfDM: “WolfDM was here” - (05/20/20)
import SongList from 'Gruvee/components/SongList'
import CommentsList from 'Gruvee/components/CommentsList'
import MembersSideMenu from 'Gruvee/components/MembersSideMenu'
import ShowMembersAction from 'Gruvee/components/common/ShowMembersAction'

import {
    AUTH_NAV_NAME,
    COMMENTS_LIST_NAV_NAME,
    PLAYLIST_NAV_NAME,
    SONG_LIST_NAV_NAME,
} from './constants'

// Stack Navigators
const Stack = createNativeStackNavigator()

// Auth Navigator
export const AUTH_NAVIGATOR = (
    <Stack.Navigator>
        <Stack.Screen name={AUTH_NAV_NAME} component={Auth} options={{ headerShown: false }} />
    </Stack.Navigator>
)

// Members Drawer Navigator
const Drawer = createDrawerNavigator()
const MEMBERS_LIST_DRAWER_NAVIGATOR = () => {
    return (
        <Drawer.Navigator
            initialRouteName={SONG_LIST_NAV_NAME}
            drawerPosition="right"
            drawerContent={() => <MembersSideMenu />}
        >
            <Drawer.Screen name={SONG_LIST_NAV_NAME} component={SongList} />
        </Drawer.Navigator>
    )
}

// Signed In Navigator
export const SIGNED_IN_NAVIGATOR = signOutButton => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#1D1D1D' },
            headerTitleStyle: { color: 'white' },
            headerTranslucent: true,
            headerTintColor: 'white',
        }}
    >
        <Stack.Screen
            name={PLAYLIST_NAV_NAME}
            component={PlaylistListView}
            options={{
                headerRight: () => signOutButton,
            }}
        />
        <Stack.Screen
            name={SONG_LIST_NAV_NAME}
            component={MEMBERS_LIST_DRAWER_NAVIGATOR}
            options={({ navigation, route }) => ({
                title: route.params.playlistName,
                headerRight: () => <ShowMembersAction navigation={navigation} />,
            })}
        />
        <Stack.Screen
            name={COMMENTS_LIST_NAV_NAME}
            component={CommentsList}
            // eslint-disable-next-line no-unused-vars
            options={({ navigation, route }) => ({
                title: route.params.songName,
            })}
        />
    </Stack.Navigator>
)
