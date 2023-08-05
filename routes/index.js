const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const signupRouter = require('./signup');
const signinRouter = require('./singnin');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

module.exports = router;
