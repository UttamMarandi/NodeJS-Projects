class CustomAPIError extends Error {
  //extends Error class
  constructor(message, statusCode) {
    super(message); //super method calls the method of parent class in which it is defined
    //here super method calls the constructor() of Error class which is the parent class
    this.statusCode = statusCode; //we can override the properties of prenet class here Error class
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
