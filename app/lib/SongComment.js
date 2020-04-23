import { v4 as uuidv4 } from 'uuid'

export default class SongComment {
    constructor(message, sender) {
        this.id = uuidv4()
        this.timestamp = new Date()
        this.message = message
        this.sender = sender
    }
}
