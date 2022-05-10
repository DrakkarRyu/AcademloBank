const express = require('express');
const { body } = require('express-validator');

//importing Middleware
const { userExists } = require('../middlewares/users.middlewares');
//importing validation middleware
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//controllers
const {
  getUserById,
  updateUser,
  signup,
  login,
} = require('../controllers/users.controllers');

const router = express.Router();

router.post('/signup', signup);
//router.post('/signup', signup);
router.post('/login', login);

router.route('/:id').get(userExists, getUserById).patch(userExists, updateUser);

module.exports = { usersRouter: router };
