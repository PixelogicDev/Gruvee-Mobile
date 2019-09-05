/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
import App from './App'
import * as NavigationConstants from './NavigationConstants'

// Components
import Playlist from './Components/Playlist/PlaylistListView'

// Register navigation components
Navigation.registerComponent(NavigationConstants.ROOT_NAV_ID, () => App)
Navigation.registerComponent(
    NavigationConstants.PLAYLIST_NAV_ID,
    () => Playlist
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
                            name: NavigationConstants.PLAYLIST_NAV_ID,
                        },
                    },
                    {
                        component: {
                            name: NavigationConstants.ROOT_NAV_ID,
                        },
                    },
                ],
            },
        },
    })
})
