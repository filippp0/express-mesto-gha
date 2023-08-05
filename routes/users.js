const router = require('express').Router();
const {
  getUsers, getUserById, editUserData, editUserAvatar, getMeUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeUser);
router.get('/:userId', getUserById);
// router.post('/', addUser);
// router.post('/signin', login);

router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
