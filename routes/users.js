const router = require('express').Router();

const {
  getUsers,
  getUser,
  getUserId,
  // createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', getUserId);
// router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
