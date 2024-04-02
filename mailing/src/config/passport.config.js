import passport from 'passport'
import passportLocal from 'passport-local'
import GitHubStrategy from 'passport-github2'
import userModel from '../services/models/user.model.js'
import { createHash, isValidPassword } from '../utils/bcrypt.js'

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

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.ad1fe23dda1dc7bf',
            clientSecret: 'b95d1c846479cbf5d3d3d99c2ece4c982df35174',
            callbackUrl: 'http://localhost:9090/api/sessions/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Obtained profile from GitHub:");
            console.log(profile);
            try {
                const user = await userModel.findOne({ email: profile._json.email });
                console.log("Found user:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exist with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 99,
                        email: profile._json.email,
                        password: '',
                        role: 'user',
                        loggedBy: "GitHub"
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result)
                } else {
                    return done(null, user)
                }

            } catch (error) {
                return done(error)
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