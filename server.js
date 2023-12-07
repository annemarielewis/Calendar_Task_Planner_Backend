//purpose = make all of the info on our backend able to be easily processed/read by the front end/client side
//we will need express for this!
//In this file, we will create routes and perform CRUD

const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// require() imports here: importing the Task model
const { Task } = require("./models");
// const { User } = require("./models");
// const { Partner } = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();

//middleware:
app.use(logger("dev")); //morgan (logger) prints our requests in terminal)
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//middleware here ^//

//An index route (shows all tasks) for the user
//CRUD: READ
app.get("/tasks", async function (req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// find task by id:
app.get("/tasks/:id", async function (req, res) {
    const taskId = req.params.id;
    try {
      const task = await Task.findById(taskId);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//We will want to update our database to include a new task every time a task is added on the front end
//CRUD: CREATE
app.post("/newtask", async function createTask(req, res) {
  console.log(req.body);
  try {
    // formData from Main = what's in the body here
    const taskData = await new Task(req.body);
    await taskData.save();
    console.log(taskData);
    return res.status(201).json({ taskData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//CRUD: update
app.put("/updatetask/:id", async function updateTask(req, res) {
  const taskId = req.params.id;
  console.log(req.body);
  try {
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Update the task with the new data
    existingTask.set(req.body);
    await existingTask.save();
    console.log(existingTask);

    return res.status(200).json({ taskData: existingTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// CRUD: DELETE
// Route for deleting a task by ID
app.delete("/deletetask/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    // Use Mongoose to find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // If the task is successfully deleted, fetch and send the updated list of tasks
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
