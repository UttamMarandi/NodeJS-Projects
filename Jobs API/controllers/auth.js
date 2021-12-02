const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide email name and password");
  }
  //double checking
  const user = await User.create({ ...req.body });

  //jwt
  //in model logic
  const token = user.createJWT(); //we are not storing the token in db

  //in controller logic
  // const token = jwt.sign({ userId: user._id, name: user.name }, "jwt", {
  //   expiresIn: "30d",
  // });

  //Refactored
  // const salt = await bycrypt.genSalt(10);
  // const hashedPassword = await bycrypt.hash(password, salt);
  // const tempUser = { name: name, email, password: hashedPassword };

  // const user = await User.create({ ...tempUser });
  //passing create(req.body) and create({...req.body}) is the same thing, but in latter portion we can add additional content
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  //we can send the entire user too : not recommended , send only that you require
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email: email }); //check email in db to email from req.body

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (isPasswordCorrect === false) {
    throw new UnauthenticatedError("Invalid credentials : Password failed");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
