const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    //we have access to req, res and next b.c asyncwrapper is function and we are returning another function
    try {
      await fn(req, res, next); //here the contoller function will get resolved/executed.
    } catch (error) {
      next(error); //passing to another middleware named error
    }
  };
};

module.exports = asyncWrapper;
