const router = require("express").Router();
const mongoose = require("mongoose");

const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

router.post("/projects", (req, res, next) => {
  const { title, description } = req.body;
  console.log("-->", req.body);
  console.log("---->", title, description);

  Project.create({ title, description, tasks: [] })
    .then((project) => res.status(200).json(project))
    .catch((err) => {
      console.error("Error while creating the project", err);
      res.status(500).json({ message: "Error while creating the project" });
    });
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((projects) => res.status(200).json(projects))
    .catch((err) => {
      console.error("Error while getting the projects", err);
      res.status(500).json({ message: "Error while getting the projects" });
    });
});

router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Invalid project id" });
    return;
  }

  Project.findById(projectId)
    .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((err) => {
      console.error("Error while getting the project", err);
      res.status(500).json({ message: "Error while getting the project" });
    });
});

router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Invalid project id" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((project) => res.status(200).json(project))
    .catch((err) => {
      console.error("Error while updating the project", err);
      res.status(500).json({ message: "Error while updating the project" });
    });
});

router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Invalid project id" });
    return;
  }

  Project.findByIdAndDelete(projectId)
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.error("Error while deleting the project", err);
      res.status(500).json({ message: "Error while deleting the project" });
    });
});

module.exports = router;
