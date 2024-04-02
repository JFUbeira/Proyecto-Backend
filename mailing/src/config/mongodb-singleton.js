import mongoose from 'mongoose'
import config from '../config/config.js'

export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getInstance() {
        if (this.#instance) {
            console.log('Ya existe una instancia de MongoSingleton')
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoURL)
            console.log('MongoDB connected successfully')
        } catch (err) {
            console.error('Could not connect to MongoDB', err)
            process.exit()
        }
    }
}