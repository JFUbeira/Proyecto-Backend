import UserService from '../services/dao/mongoManagers/MDBusers.dao.js'
import passport from 'passport'

const userService = new UserService()

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const exist = await userService.findUserByEmail(email)
        if (exist) {
            return res.status(400).send({ status: 'error', message: 'User already exists' })
        }

        const user = await userService.createUser({ first_name, last_name, email, age, password })

        res.status(201).send({ status: 'success', message: 'User created successfully' })
    } catch (error) {
        console.log('There was an error registering the user', error)
        res.status(500).send({ error: error })
    }
}

export const loginUser = async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                return res.status(401).send({ error: 'Failed to process login!' })
            }

            req.login(user, async (err) => {
                if (err) {
                    return next(err)
                }

                req.session.user = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    role: user.role
                }

                res.send({
                    status: 'success',
                    payload: req.session.user,
                    message: 'Logged in for the first time successfully'
                })
            })
        } catch (error) {
            console.log('There was an error logging in', error)
            res.status(500).send({ error: error })
        }
    })(req, res, next)
}

export const logoutUser = async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                return res.json({ status: 'error', message: 'Logout error' })
            }

            res.send({ status: 'success', message: 'Logged out successfully' })
        })
    } catch (error) {
        console.log('There was an error logging out', error)
        res.status(500).send({ error: error })
    }
}

export const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const githubAuthCallback = passport.authenticate('github', { failureRedirect: '/github/error' });

export const githubAuthCallbackHandler = async (req, res) => {
    try {
        const user = req.user;
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
        };
        req.session.admin = true;
        res.redirect('/api/products');
    } catch (error) {
        console.log('There was an error with GitHub OAuth callback', error);
        res.status(500).send({ error: error });
    }
};

