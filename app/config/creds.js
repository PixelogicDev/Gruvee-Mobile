import {
    ALGOLIA_APP_ID,
    ALGOLIA_DEV_INDEX_NAME,
    ALGOLIA_APP_KEY,
    ENVIRONMENT,
    SPOTIFY_CLIENTID,
    SPOTIFY_CLIENTSECRET,
    SPOTIFY_REDIRECTURI,
} from 'react-native-dotenv'

export default {
    Spotify: {
        clientId: SPOTIFY_CLIENTID,
        clientSecret: SPOTIFY_CLIENTSECRET,
        redirectUri: SPOTIFY_REDIRECTURI,
    },
    Apple: {},
    Youtube: {},
    Algolia: {
        appId: ALGOLIA_APP_ID,
        appKey: ALGOLIA_APP_KEY,
        indexName: ENVIRONMENT === 'DEV' ? ALGOLIA_DEV_INDEX_NAME : '',
    },
}
