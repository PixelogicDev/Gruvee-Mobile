// nfsdarkdevv - "DarkDevV_ is bae. Best web developer" (05/11/20)
import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import * as StyleConstants from '@StyleConstants'

// Components
import Auth from 'Gruvee/components/Auth'
import PlaylistListView from 'Gruvee/components/PlaylistListView'

// Navigation IDs
export const STACK_ID = 'navigation.gruvee.stack.id'

export const ROOT_NAV_ID = 'navigation.gruvee.app.id'
export const ROOT_NAV_NAME = 'navigation.gruvee.app'

export const AUTH_NAV_ID = 'navigation.gruvee.auth.id'
const AUTH_NAV_NAME = 'Auth'

export const PLAYLIST_NAV_ID = 'navigation.gruvee.playlist.id'
const PLAYLIST_NAV_NAME = 'Playlists'

export const SONG_LIST_NAV_ID = 'navigation.gruvee.songList.id'
export const SONG_LIST_NAV_NAME = 'navigation.gruvee.songList'

export const COMMENTS_LIST_NAV_ID = 'navigation.gruvee.commentsList.id'
export const COMMENTS_LIST_NAV_NAME = 'navigation.gruvee.commentsList'

export const TOP_BAR_MEMBERS_ACTION_ID = 'navigation.gruvee.showMembersAction.id'
export const TOP_BAR_MEMBERS_ACTION_NAME = 'navigation.gruvee.showMembersAction'

export const SIDEMENU_ALL_MEMBERS_ID = 'navigation.gruvee.sideMenuAllMembers.id'
export const SIDEMENU_ALL_MEMBERS_NAME = 'navigation.gruvee.sideMenuAllMembers'

export const USERNAME_INPUT_VIEW_ID = 'navigation.gruvee.usernameInputView.id'
export const USERNAME_INPUT_VIEW_NAME = 'navigation.gruvee.usernameInputView'

// Stack Navigators
const Stack = createNativeStackNavigator()
export const AUTH_NAVIGATOR = (
    <Stack.Navigator>
        <Stack.Screen name={AUTH_NAV_NAME} component={Auth} options={{ headerShown: false }} />
    </Stack.Navigator>
)
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
    </Stack.Navigator>
)

// Themes
export const BASE_THEME = {
    dark: true,
    colors: {
        background: StyleConstants.BASE_BACKGROUND_COLOR,
    },
}
