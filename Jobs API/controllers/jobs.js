const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("getJob");
};

const createJob = async (req, res) => {
  res.send("createJob");
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getJob,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
