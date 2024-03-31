import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Debug variable', false)
    .option('-p', 'Port variable', 9090)
    .option('--mode <mode>', 'Work mode', 'dev')
program.parse()

console.log('Mode options: ', program.opt().mode)

dotenv.config()