const taskRouter = require("express").Router();

taskRouter.post("/", (req, res, next) => {
  res.json("Creates a new task");
});

module.exports = taskRouter;
