// TheDkbay - "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off" (03/04/20)
// pheonix_d123 - "the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow,"(03/04/20)
// giusdp - "black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? Barry?" (03/04/20)
// boki996 - "Adam? Oan you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those. S" (03/05/20)
// pheonix_d123 - "orry. I'm excited. Here's the graduate. We're very proud of you, son. A perfect report card, all B's. Very proud. Ma! I got a thing going he" (03/05/20)
// boki996 - "re. You got lint on your fuzz. Ow! That's me! Wave to us! We'll be in row 118,000. Bye! Barry, I told you, stop flying in the house! Hey, Ad" (03/05/20)
import * as StyleConstants from '@StyleConstants'

export const STACK_ID = 'navigation.gruvee.stack.id'

export const ROOT_NAV_ID = 'navigation.gruvee.app.id'
export const ROOT_NAV_NAME = 'navigation.gruvee.app'

export const AUTH_NAV_ID = 'navigation.gruvee.auth.id'
export const AUTH_NAV_NAME = 'navigation.gruvee.auth'

export const PLAYLIST_NAV_ID = 'navigation.gruvee.playlist.id'
export const PLAYLIST_NAV_NAME = 'navigation.gruvee.playlist'

export const ADD_PLAYLIST_MODAL_NAV_ID = 'navigation.gruvee.addPlaylistModal.id'
export const ADD_PLAYLIST_MODAL_NAV_NAME = 'navigation.gruvee.addPlaylistModal'

export const ADD_SONG_MODAL_NAV_ID = 'navigation.gruvee.addSongModal.id'
export const ADD_SONG_MODAL_NAV_NAME = 'navigation.gruvee.addSongModal'

export const SONG_LIST_NAV_ID = 'navigation.gruvee.songList.id'
export const SONG_LIST_NAV_NAME = 'navigation.gruvee.songList'

export const COMMENTS_LIST_NAV_ID = 'navigation.gruvee.commentsList.id'
export const COMMENTS_LIST_NAV_NAME = 'navigation.gruvee.commentsList'

export const TOP_BAR_MEMBERS_ACTION_ID =
    'navigation.gruvee.showMembersAction.id'
export const TOP_BAR_MEMBERS_ACTION_NAME = 'navigation.gruvee.showMembersAction'

export const SIDEMENU_ALL_MEMBERS_ID = 'navigation.gruvee.sideMenuAllMembers.id'
export const SIDEMENU_ALL_MEMBERS_NAME = 'navigation.gruvee.sideMenuAllMembers'

// Navigation objects
export const AUTH_VIEW_ROOT = {
    component: {
        id: AUTH_NAV_ID,
        name: AUTH_NAV_NAME,
        options: {
            topBar: {
                visible: false,
            },
        },
    },
}

export const PLAYLIST_VIEW_ROOT = {
    component: {
        name: PLAYLIST_NAV_NAME,
        options: {
            topBar: {
                visible: true,
                barStyle: 'default',
                // Since this is the root view after auth, hide back button
                // What we should be doing is setting this as the root if signed in
                backButton: {
                    visible: false,
                },
                background: {
                    color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
                    blur: false,
                },
                title: {
                    text: 'Playlists',
                    fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
                    color: StyleConstants.TOP_BAR_TEXT_COLOR,
                    // iOS Only
                    fontWeight: 'medium',
                },
            },
        },
    },
}
