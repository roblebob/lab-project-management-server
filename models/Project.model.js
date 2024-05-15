const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: String,
    desciption: String,
    task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
