const router = require('express').Router();

const authService = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../constants');
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async(req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword
    }

    const user = await authService.createUser(newUser);

    const token = await authService.createToken(user);

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true
    });

    res.redirect('/')
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    const user = await authService.loginUser(email, password);

    if(!user) {
        res.redirect('/404');
    }

    const token = await authService.createToken(user);

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true
    });

    res.redirect('/')
});

module.exports = router;