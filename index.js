/**
 * @format
 */

import { Navigation } from 'react-native-navigation'
import App from './App'
import * as NavigationConstants from './NavigationConstants'

Navigation.registerComponent(NavigationConstants.ROOT_NAV_ID, () => App)

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: NavigationConstants.ROOT_NAV_ID,
            },
        },
    })
})
