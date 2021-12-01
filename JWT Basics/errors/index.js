const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
};
//THis is important b.c while importing we don't need to know which file contains the required errror. we just import this index.file.
