//controllers : business logic
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //both with {tasks} and tasks will get a response. with {tasks} we also get the collection name , but with tasks without curly braces we get an array of objects only.
  //{tasks} is good for getting data using destruturing in front end
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body); //.create() passes the req.body down the task model to create new document in db
  res.status(201).json({ task });
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params; //taskID is the alias name
  const task = await Task.findOne({ _id: taskID }); //check if _id in db is same as the taskID we send

  if (!task) {
    return res.status(404).json({ msg: `No task  with the id: ${taskID}` }); //if id syntax right , then 404 error
    //if id syntax wrong meaning no. of charecters in id more or less than required values, then generic 500 error
    //_id contains 24 characters
  }
  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task  with the id: ${taskID}` }); //if id syntax right , then 404 error
  }
  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  //findOneAndUpdate takes 3 parameters. { _id: taskID } checks for the document that needs to be deleted. req.body contains the data which should be updataed. third parameter takes an object which if new sets to true than updated data will be send as response. if runValidators set to true , than validators applied in Task Model will get applied.
  if (!task) {
    return res.status(404).json({ msg: `No task  with the id: ${taskID}` }); //if id syntax right , then 404 error
  }
  res.status(200).json({ task }); //we need req.body b.c we want to send the updated data to client
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
