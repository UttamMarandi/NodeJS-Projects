//controllers : business logic
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //both with {tasks} and tasks will get a response. with {tasks} we also get the collection name , but with tasks only we get an array of objects
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body); //.create() passes the req.body down the task model to create new document in db
  res.status(201).json({ task });
};
const updateTask = async (req, res) => {
  res.status(200).send("Update Task");
};
const getTask = async (req, res) => {
  res.status(200).json({ req: req.params.id });
};

const deleteTask = async (req, res) => {
  res.status(200).send("Delete Task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
