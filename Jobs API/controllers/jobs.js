const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt"); //get all jobs of that particular user
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  res.send("getJob");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; //we want the userId we got from token to be stored with the Job
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
  // res.json(req.user); //we are getting req.user from authentiaction middleware
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
