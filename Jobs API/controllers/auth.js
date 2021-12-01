const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bycrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide email name and password");
  }
  //double checking
  const user = await User.create({ ...req.body });

  //Refactored
  // const salt = await bycrypt.genSalt(10);
  // const hashedPassword = await bycrypt.hash(password, salt);
  // const tempUser = { name: name, email, password: hashedPassword };

  // const user = await User.create({ ...tempUser });
  //passing create(req.body) and create({...req.body}) is the same thing, but in latter portion we can add additional content
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
