import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    user: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

const messageModel = model('Message', messageSchema)

export { messageModel }
