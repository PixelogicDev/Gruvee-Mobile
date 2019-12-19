/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
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
Navigation.registerComponent(NavigationConstants.ROOT_NAV_NAME, () => App)
Navigation.registerComponent(
    NavigationConstants.PLAYLIST_NAV_NAME,
    () => Playlist
)
Navigation.registerComponent(
    NavigationConstants.ADD_PLAYLIST_MODAL_NAV_NAME,
    () => AddPlaylistModal
)
Navigation.registerComponent(
    NavigationConstants.ADD_SONG_MODAL_NAV_NAME,
    () => AddSongModal
)
Navigation.registerComponent(
    NavigationConstants.SONG_LIST_NAV_NAME,
    () => SongList
)
Navigation.registerComponent(
    NavigationConstants.COMMENTS_LIST_NAV_NAME,
    () => CommentsList
)

// TopBar components
Navigation.registerComponent(
    NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME,
    () => ShowMembersAction
)

// SideMenu components
Navigation.registerComponent(
    NavigationConstants.SIDEMENU_ALL_MEMBERS_NAME,
    () => MembersSideMenu
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
                        right: {
                            width: 200,
                        },
                    },
                },
            },
        },
    })
})
