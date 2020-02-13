/**
 * pahnev: "Fighting bugs? Bob Marley - Everything's Gonne Be Alright" (02/13/20)
 * BackeyM - "Author: @backey Copyright© 2020" (02/13/20)
 * syszen - "inflation will occur - pixelogicdev" (02/13/20)
 * syszen - "for future proof reference 10000 active users = gruvee tattoo" (02/13/20)
 * @format
 TheDkbay - "Gib name" (1/22/2020)
 Stacking - "He had no arms or legs. He couldn't see, hear, or speak. This is how he led a nation." (01/27/20)
 */

import { Navigation } from 'react-native-navigation'
import ReduxProvider from 'Gruvee/Redux/Components/ReduxProvider'
import AddPlaylistModal from 'Gruvee/Components/Playlist/components/AddPlaylistModal/AddPlaylistModal'
import Playlist from 'Gruvee/Components/Playlist/PlaylistListView'
import SongList from 'Gruvee/Components/SongList/SongListView'
import AddSongModal from 'Gruvee/Components/SongList/components/AddSongModal/AddSongModal'
import CommentsList from 'Gruvee/Components/CommentsList/CommentsListView'
import ShowMembersAction from 'Gruvee/Components/Common/TopBar/Actions/ShowMembersAction/ShowMembersAction'
import MembersSideMenu from 'Gruvee/Components/MembersSideMenu/MembersSideMenu'
import * as NavigationConstants from '@NavigationConstants'
import App from './App'

// Register navigation components
Navigation.registerComponent(NavigationConstants.ROOT_NAV_NAME, () =>
    ReduxProvider(App)
)
Navigation.registerComponent(NavigationConstants.PLAYLIST_NAV_NAME, () =>
    ReduxProvider(Playlist)
)
Navigation.registerComponent(
    NavigationConstants.ADD_PLAYLIST_MODAL_NAV_NAME,
    () => ReduxProvider(AddPlaylistModal)
)
Navigation.registerComponent(NavigationConstants.ADD_SONG_MODAL_NAV_NAME, () =>
    ReduxProvider(AddSongModal)
)
Navigation.registerComponent(NavigationConstants.SONG_LIST_NAV_NAME, () =>
    ReduxProvider(SongList)
)
Navigation.registerComponent(NavigationConstants.COMMENTS_LIST_NAV_NAME, () =>
    ReduxProvider(CommentsList)
)

// TopBar components
Navigation.registerComponent(
    NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME,
    () => ReduxProvider(ShowMembersAction)
)

// SideMenu components
Navigation.registerComponent(
    NavigationConstants.SIDEMENU_ALL_MEMBERS_NAME,
    () => ReduxProvider(MembersSideMenu)
)

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            sideMenu: {
                center: {
                    stack: {
                        id: NavigationConstants.STACK_ID,
                        children: [
                            {
                                component: {
                                    id: NavigationConstants.ROOT_NAV_ID,
                                    name: NavigationConstants.ROOT_NAV_NAME,
                                    options: {
                                        topBar: {
                                            visible: false,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
                right: {
                    component: {
                        name: NavigationConstants.SIDEMENU_ALL_MEMBERS_NAME,
                    },
                },
                options: {
                    sideMenu: {
                        // -- MAD PROPZ thoasty -- //
                        openGestureMode: 'bezel',
                        right: {
                            width: 200,
                            shouldStretchDrawer: false,
                            enabled: false,
                        },
                    },
                },
            },
        },
    })
})
