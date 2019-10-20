/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
import AddPlaylistModal from 'Gruvee/src/screens/PlaylistList/AddPlaylistModal'
import PlaylistScreen from 'Gruvee/src/screens/PlaylistList'
import SongListScreen from 'Gruvee/src/screens/SongList'
import AddSongModal from 'Gruvee/src/screens/SongList/AddSongModal'
import * as NavigationConstants from 'lib/Helpers/NavigationConstants'
import App from './App'

// Register navigation components
Navigation.registerComponent(NavigationConstants.ROOT_NAV_NAME, () => App)
Navigation.registerComponent(
    NavigationConstants.PLAYLIST_NAV_NAME,
    () => PlaylistScreen
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
    () => SongListScreen
)

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: NavigationConstants.STACK_ID,
                options: {
                    topBar: {
                        visible: false,
                    },
                },
                children: [
                    {
                        component: {
                            id: NavigationConstants.PLAYLIST_NAV_ID,
                            name: NavigationConstants.PLAYLIST_NAV_NAME,
                        },
                    },
                    {
                        component: {
                            id: NavigationConstants.ROOT_NAV_ID,
                            name: NavigationConstants.ROOT_NAV_NAME,
                        },
                    },
                ],
            },
        },
    })
})
