import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    user: {
        type: String,
    },
    message: {
        type: String,
    }
})

const messageModel = model('Message', messageSchema)

export { messageModel }