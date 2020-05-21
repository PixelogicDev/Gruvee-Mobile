// nfsdarkdevv - "DarkDevV_ is bae. Best web developer" (05/11/20)
// Isakfk1234: "Pixelogicdev mom was here" (05/20/20)
import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as StyleConstants from '@StyleConstants'

// Components
import Auth from 'Gruvee/components/Auth'
import PlaylistListView from 'Gruvee/components/PlaylistListView'
// W0lfDM: “WolfDM was here” - (05/20/20)
import SongList from 'Gruvee/components/SongList'
import MembersSideMenu from 'Gruvee/components/MembersSideMenu'
import ShowMembersAction from 'Gruvee/components/common/ShowMembersAction'

// Navigation IDs
export const STACK_ID = 'navigation.gruvee.stack.id'

export const ROOT_NAV_ID = 'navigation.gruvee.app.id'
export const ROOT_NAV_NAME = 'navigation.gruvee.app'

export const AUTH_NAV_ID = 'navigation.gruvee.auth.id'
const AUTH_NAV_NAME = 'Auth'

export const PLAYLIST_NAV_ID = 'navigation.gruvee.playlist.id'
const PLAYLIST_NAV_NAME = 'Playlists'

export const SONG_LIST_NAV_ID = 'navigation.gruvee.songList.id'
export const SONG_LIST_NAV_NAME = 'Songs'

export const COMMENTS_LIST_NAV_ID = 'navigation.gruvee.commentsList.id'
export const COMMENTS_LIST_NAV_NAME = 'navigation.gruvee.commentsList'

export const TOP_BAR_MEMBERS_ACTION_ID = 'navigation.gruvee.showMembersAction.id'
export const TOP_BAR_MEMBERS_ACTION_NAME = 'navigation.gruvee.showMembersAction'

export const SIDEMENU_ALL_MEMBERS_ID = 'navigation.gruvee.sideMenuAllMembers.id'
export const SIDEMENU_ALL_MEMBERS_NAME = 'Members'

export const USERNAME_INPUT_VIEW_ID = 'navigation.gruvee.usernameInputView.id'
export const USERNAME_INPUT_VIEW_NAME = 'navigation.gruvee.usernameInputView'

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
            options={({ navigation }) => ({
                headerRight: () => <ShowMembersAction navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
)

// Themes
export const BASE_THEME = {
    dark: true,
    colors: {
        background: StyleConstants.BASE_BACKGROUND_COLOR,
    },
}
