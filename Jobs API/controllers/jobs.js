const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt"); //get all jobs of that particular user
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req; //nester destructuring
  //same as
  // const { userId } = req.user;
  // const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; //we want the userId we got from token to be stored with the Job,
  req.body.createByName = req.user.name;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
  // res.json(req.user); //we are getting req.user from authentiaction middleware
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
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
