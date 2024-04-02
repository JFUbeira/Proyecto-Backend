import { Router } from 'express';
import { registerUser, loginUser, logoutUser, githubAuth, githubAuthCallbackHandler } from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/github', githubAuth);
router.get('/githubcallback', githubAuthCallbackHandler);

router.get('/fail-register', (req, res) => {
    res.status(401).send({ error: 'Failed to process register!' });
});
router.get('/fail-login', (req, res) => {
    res.status(401).send({ error: 'Failed to process login!' });
});

export default router;

