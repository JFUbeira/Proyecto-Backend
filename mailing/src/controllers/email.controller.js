import nodemailer from 'nodemailer'
import config from '../config/config.js'
import __dirname from '../utils/utils.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})

transporter.verify((err, success) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server is ready to take our messages')
    }
})

const mailOptions = {
    from: config.gmailAccount,
    to: config.gmailAccount,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: []
}

const mailOptionsWithAttachments = {
    from: config.gmailAccount,
    to: config.gmailAccount,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: [
        {
            filename: 'test',
            path: __dirname + '/public/images/test.png',
            cid: 'testImage'
        }
    ]
}

export const sendEmail = async (req, res) => {
    try {
        let result = transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                res.status(500).send({ error: err })
            } else {
                console.log('Message sent: ' + info.messageId)
                res.status(200).send({ message: 'Email sent: ' + info })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error })
    }
}

export const sendEmailWithAttachments = async (req, res) => {
    try {
        let result = transporter.sendMail(mailOptionsWithAttachments, (err, info) => {
            if (err) {
                console.log(err)
                res.status(500).send({ error: err })
            } else {
                console.log('Message sent: ' + info.messageId)
                res.status(200).send({ message: 'Email sent: ', payload: info })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error })
    }
}