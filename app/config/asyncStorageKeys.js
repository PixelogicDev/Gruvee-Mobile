// These are the list of AsyncStorage keys we are using throughout the app
import AsyncStorage from '@react-native-community/async-storage'

export const APPLE_MUSIC_PLAYLIST_TITLE = '@Apple_Music_Playlist_Title'
export const DEEP_LINK_IN_PROGRESS_FLAG = '@Deep_Link_In_Progress'
export const PRESENTED_APPLE_MUSIC_PROMPT = '@Presented_Apple_Music_Prompt'

// Helpers
export const ClearAllKeyData = async () => {
    try {
        await AsyncStorage.multiRemove([
            APPLE_MUSIC_PLAYLIST_TITLE,
            DEEP_LINK_IN_PROGRESS_FLAG,
            PRESENTED_APPLE_MUSIC_PROMPT,
        ])

        console.log('All asyncStorage removed.')
    } catch (error) {
        console.warn(error)
    }
}
