/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
import App from './App'
import * as NavigationConstants from './NavigationConstants'
import OverlayTest from './Components/OverlayTest'

// Register navigation components
Navigation.registerComponent(NavigationConstants.ROOT_NAV_ID, () => App)
Navigation.registerComponent(
    NavigationConstants.SOCIAL_OVERLAY_ID,
    () => OverlayTest
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
                            name: NavigationConstants.SOCIAL_OVERLAY_ID,
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
