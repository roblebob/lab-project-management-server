const projectsRouter = require("express").Router();

projectsRouter.post("/", (req, res, next) => {
  res.json("Creates a new project");
});

projectsRouter.get("/", (req, res, next) => {
  res.json("Returns all the projects");
});

projectsRouter.get("/:id", (req, res, next) => {
  res.json("Returns the specified project");
});

projectsRouter.put("/:id", (req, res, next) => {
  res.json("Edits the specified project");
});

projectsRouter.delete("/:id", (req, res, next) => {
  res.json("Deletes the specified project");
});

module.exports = projectsRouter;