//purpose = fill database collection with actual task data
//Use Mongo shell (mongosh), or a query.js file, to read the data BECAUSE: -->
//This data is being stored on the server, we cannot access it online (yet) or directly in our terminal.
//our terminal is for what's being stored on our computer
//OR console.log (what I'm doig)

const db = require("../db");

//searching for relevant variables (and importing)within the models folder:
const { Task } = require("../models");
// const { Partner } = require("../models");
// const { User } = require("../models");

//connecting to the db / giving us an error if anything goes wrong
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//because we are taking a quick detour out of JS and into Mongo, we need to make sure these are all async functions.
//That way, even if it only takes .01 seconds, code-lines won't get thrown out of order:
const main = async () => {
  const tasks = [];
  //   ^^tasks is empty at the moment because we will be creating this data within our calendar app by pushing data to our database
  await Task.deleteMany();
  //   --> clearing Task model so that if we seed again we don't get repeat entries, only new entries
  let createTask = await Task.insertMany(tasks);
  console.log(createTask);
  console.log("Created tasks!");
  console.log(tasks);
};

//we keep these functions seperate so they can each run independently (atomically) and perform their necessary roles -->
//(it will prevent potential errors)
const run = async () => {
  //runs our main function and awaits for the data to populate:
  await main();

  //closes our db after its run so things don't break
  db.close();
};

run();
