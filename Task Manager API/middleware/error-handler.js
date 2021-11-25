//Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next).
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("Error", err);
  return res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
