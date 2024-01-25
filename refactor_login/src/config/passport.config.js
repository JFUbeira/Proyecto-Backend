import passport from 'passport'
import passportLocal from 'passport-local'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'

const LocalStrategy = passportLocal.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                const exist = await userModel.findOne({ email })
                if (exist) {
                    console.log('User already exists')
                    done(null, false)
                }

                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role: 'user'
                }

                const result = await userModel.create(user)
                return done(null, result)

            } catch (error) {
                return done('An error ocurred while registering user: ' + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    console.log('Check your credentials')
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.log('Check your credentials')
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done('An error ocurred while loggin in: ' + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id)
            return done(null, user)
        } catch (error) {
            console.log(error)
        }
    })
}

export default initializePassport