const router = require("express").Router();

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

router.post("/tasks", (req, res, next) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then((task) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: task._id },
      });
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      console.error("Error while creating the task", err);
      res.status(500).json({ message: "Error while creating the task" });
    });
});

module.exports = router;
