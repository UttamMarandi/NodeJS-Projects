const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again UT" }); //this error is shown in terminal
};

module.exports = errorHandlerMiddleware;
