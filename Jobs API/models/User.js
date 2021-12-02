const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

//Pre middleware functions are executed one after another, when each middleware calls next. Pre middleware are run before the hooked method.

UserSchema.pre("save", async function (next) {
  //we are using funciton keyword instead of arrow funciton b.c we want to access the this keyword. this keyword will represent the current document.
  //this.pasword will represnt the password in schema
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();

  //the above code runs just before the "create" functionality of mongoose. so we are sending req.body through our model to save in db. but in model we run a pre function which fetched the current password , hashed it and then store it as password.
  //then the hooked method User.create() runs saving the data to db.
});

UserSchema.methods.getName = function () {
  return this.name;
};
//this is one of the way to keep the logic in model. just invoke the getName() in controller and we will get the user name
//not used in current project

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (passByUser) {
  const isMatch = await bycrypt.compare(passByUser, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
