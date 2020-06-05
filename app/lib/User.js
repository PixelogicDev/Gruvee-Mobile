/*
    id: String <Firebase provided UUID>
    username: if no username set email, 
                if no to both, generate uuid,
    displayName: This will be the friendly name that can be changed
    email: Optional
    playlists: [], // PlaylistIds
    LiquoriceLion - "I LOVE LASAGNA" (02/20/20)
    preferredSocialPlatform: SocialPlatform where isPreferred === true
    socialPlatforms: [SocialPlatform objects],
}
*/
import { v4 as uuidv4 } from 'uuid'

export default class User {
    constructor(id, displayName, socialPlatform) {
        // This fallback should stay here until we get the change username setup for Spotify
        if (socialPlatform.displayName !== null) {
            this.displayName = socialPlatform.displayName
        } else if (socialPlatform.email !== null) {
            this.displayName = socialPlatform.email
        } else {
            this.displayName = uuidv4()
        }
        this.username = displayName.toLowerCase()
        this.id = id
        this.email = socialPlatform.email
        this.playlists = []
        this.preferredSocialPlatform = socialPlatform
        this.socialPlatforms = [socialPlatform]
    }
}
