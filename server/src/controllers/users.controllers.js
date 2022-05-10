const bcrypt = require('bcryptjs');
//importing model
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');

//importing utils
const { catchAsync } = require('../utils/catchAsync');

//making the functions

const signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const accountNumber = Math.ceil(Math.random() * 1000000);
  //constants for bcrypt
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  //creating the new user
  const newUser = await User.create({
    name,
    password: hashPassword,
    accountNumber,
  });

  //removing the password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: { accountNumber, status: 'active' },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError('Invalide password or account number or both', 400)
    );
  }
  res.status(201).json({ status: 'Success' });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { amount } = req.body;
  await user.update({ amount });
  res.status(200).json({ status: 'success' });
});

module.exports = {
  getUserById,
  updateUser,
  signup,
  login,
};
