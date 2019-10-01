/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
import App from './App'
import * as NavigationConstants from './NavigationConstants'

// Components
import Playlist from './Components/Playlist/PlaylistListView'
import AddPlaylistModal from './Components/Playlist/AddPlaylistModal'
import SongList from './Components/SongList/SongListView'

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
    NavigationConstants.SONG_LIST_NAV_NAME,
    () => SongList
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
