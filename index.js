/**
 * pahnev: "Fighting bugs? Bob Marley - Everything's Gonne Be Alright" (02/13/20)
 * BackeyM - "Author: @backey Copyright© 2020" (02/13/20)
 * syszen - "inflation will occur - pixelogicdev" (02/13/20)
 * syszen - "for future proof reference 10000 active users = gruvee tattoo" (02/13/20)
 * TheDkbay - "Gib name" (1/22/2020)
 * Stacking - "He had no arms or legs. He couldn't see, hear, or speak. This is how he led a nation." (01/27/20)
 * sillyonly - "this is still high! I would love to get a discount on this object! please!" (02/15/20)
 * @format
 */

import { Navigation } from 'react-native-navigation'
import ReduxProvider from 'Gruvee/components/ReduxProvider'
import SongList from 'Gruvee/components/SongList'
import CommentsList from 'Gruvee/components/CommentsList'
import ShowMembersAction from 'Gruvee/components/common/ShowMembersAction'
import MembersSideMenu from 'Gruvee/components/MembersSideMenu'
import * as NavigationConstants from 'Gruvee/config/navigation'
import App from 'Gruvee/App'

// Register navigation components
Navigation.registerComponent(NavigationConstants.ROOT_NAV_NAME, () => ReduxProvider(App))
Navigation.registerComponent(NavigationConstants.SONG_LIST_NAV_NAME, () => ReduxProvider(SongList))
Navigation.registerComponent(NavigationConstants.COMMENTS_LIST_NAV_NAME, () =>
    ReduxProvider(CommentsList)
)

// TopBar components
Navigation.registerComponent(NavigationConstants.TOP_BAR_MEMBERS_ACTION_NAME, () =>
    ReduxProvider(ShowMembersAction)
)

// SideMenu components
Navigation.registerComponent(NavigationConstants.SIDEMENU_ALL_MEMBERS_NAME, () =>
    ReduxProvider(MembersSideMenu)
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
