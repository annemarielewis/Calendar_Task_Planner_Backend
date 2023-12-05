//purpose = export all of the backend schemas into a mongoose model -->
//the collections will be added to this model (when seeded) -->
//We have task, partner, and user schemas. These will be seeded and referred to as Task, Partner, and User collections

const mongoose = require("mongoose");

//accessing the info from the other files in the models folder:
const TaskSchema = require("./task");
const PartnerSchema = require("./partner");
const UserSchema = require("./user");

//The mongoose.model method is used to define a model. It takes two arguments:
//The first argument specifies the name of the MongoDB collection where documents with this schema will be stored.
//The second argument is the schema that defines the structure and validation rules for documents in the collection.
const Task = mongoose.model("Task", TaskSchema);
// const Partner = mongoose.model("Partner", PartnerSchema);
// const User = mongoose.model("User", UserSchema);

// This exports the Mongoose models you've created, allowing use in other parts of Node.js application:
module.exports = {
  Task,
  //   Partner,
  //   User,
};
