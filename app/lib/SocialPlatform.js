/*    
    platformName: ie: Spotify
    id: ID for Authed User
    username: If username is provided, add here, else add email if provied
    profileImage: If there is one
    email: If there is one
    apiToken
    refreshToken
    isPreferred: this is the preferred streaming service
    isPremium: Will tell if the user is on the free tier or paid tier
*/

export default class SocialPlatform {
    constructor(
        platformName,
        id,
        username = null,
        profileImage = null,
        email = null,
        apiToken,
        refreshToken,
        isPreferredService = false,
        isPremium = false
    ) {
        this.platformName = platformName
        this.id = id
        this.username = username
        this.profileImage = profileImage
        this.email = email
        this.apiToken = apiToken
        this.refreshToken = refreshToken
        this.isPreferredService = isPreferredService
        this.isPremium = isPremium
    }
}
