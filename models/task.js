//purpose = create schemas (set of rules) for task collection

const { Schema } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = TaskSchema;
