import BusinessService from "../services/dao/mongoManagers/business.dao.js"
import config from '../config/config.js'
import twilio from 'twilio'

const twilioClient = twilio(config.twilioAccountSid, config.twilioAuthToken)
const twilioSMSOptions = {
    body: 'Hi',
    from: config.twilioSmsNumber,
    to: config.twilioSmsNumber
}

export const sendSMS = async (req, res) => {
    try {
        console.log('Sending SMS via Twilio')
        console.log(twilioClient)
        const result = await twilioClient.messages.create(twilioSMSOptions)
        res.send({ message: 'Success', payload: result })
    } catch {
        console.log('Error sending SMS via Twilio')
        res.status(500).send({ error: 'Error sending SMS via Twilio' })
    }
}