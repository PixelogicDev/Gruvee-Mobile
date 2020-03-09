/*
    id: String,
    timestamp: Date Object,
    message: String,
    sender: User (for now lets just use a string...)
*/
export default class SongComment {
    constructor(message, sender) {
        this.id = `${message.replace(/\s/g, '')}-${sender.replace(/\s/g, '')}`
        this.timestamp = new Date()
        this.message = message
        this.sender = sender
    }
}
