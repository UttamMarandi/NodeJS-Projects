//Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next).
const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  //   console.log("Error", err);
  //err.message contains the custom error message that we created.
  if (err instanceof CustomAPIError) {
    //createCustomError creates a new instance of CustomAPIError, so whenever createCustomError is invoked , below code is run
    return res.status(err.statusCode).json({ msj: err.message });
  }
  return res.status(500).json({ msg: `Something went wrong` });
};

module.exports = errorHandlerMiddleware;
