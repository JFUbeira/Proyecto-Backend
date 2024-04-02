import nodemailer from 'nodemailer'
import config from '../config/config.js'
import __dirname from '../utils.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})