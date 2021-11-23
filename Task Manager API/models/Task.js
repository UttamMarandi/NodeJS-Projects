const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  //defines structures for all the documents that need to be stored inside a collectoion in  db
  name: {
    type: String,
    required: [true, "must provide name"], //in view it shows custom message "must provide name " if name not provided
    trim: true, //trim spaces
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

//model is a reprsentation of collection in mongo db
//Instance of a model is called a document
//only the keys that is defined in schema is passed to db , others are discarder
//in this case it is "name" and "completed"
