/*
    id: String <Firebase provided UUID>
    username: if no username set email, 
                if no to both, generate uuid,
    email: Optional
    playlists: [], // PlaylistIds
    LiquoriceLion - "I LOVE LASAGNA" (02/20/20)
    preferredSocialPlatform: SocialPlatform where isPreferred === true
    socialPlatforms: [SocialPlatform objects],
}
*/
import { v4 as uuidv4 } from 'uuid'

export default class User {
    constructor(id, username, socialPlatform) {
        // Do username check based on socialPlatform
        if (socialPlatform.username !== null) {
            this.username = socialPlatform.username
        } else if (socialPlatform.email !== null) {
            this.username = socialPlatform.email
        } else {
            this.username = uuidv4()
        }

        this.id = id
        this.email = socialPlatform.email
        this.playlists = []
        this.preferredSocialPlatform = socialPlatform
        this.socialPlatforms = [socialPlatform]
    }
}
