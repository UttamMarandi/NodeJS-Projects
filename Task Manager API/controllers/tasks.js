//controllers : business logic

const getAllTasks = async (req, res) => {
  res.send("all items");
};

const createTask = async (req, res) => {
  res.status(201).json(req.body);
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
