import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Debug variable', false)
    .option('-p', 'Port variable', 9090)
    .option('--mode <mode>', 'Work mode', 'dev')
program.parse()

console.log('Mode options: ', program.opts().mode)

const environment = program.opts().mode

dotenv.config(
    {
        path: environment === 'prod' ? './src/config/.env.production' : './src/config/.env.development'
    }
)

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD
}