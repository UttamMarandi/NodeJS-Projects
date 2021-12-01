require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //jwt.sign() takes three parameters. 1. payload 2.jwt secret 3.options object
  //the payload is specific to the current user. Meaning only the token user can access it
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // console.log(req.headers);
  console.log("req.user", req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msj: `Hello , ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

//First interaction
//Login Request ===> Response + Signed JWT

//store the token locally or in db

//Rest Interaction : To access restricter route
//Request + Signed JWT = Response + data
