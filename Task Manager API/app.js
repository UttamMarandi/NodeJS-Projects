const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
//middleware
app.use(express.static("./public")); //to serve static files
app.use(express.json());

// //route
// app.get("/", (req, res) => {
//   res.send("Task Manager App");
// });

app.use("/api/v1/tasks", tasks);

// app.get("/api/v1/tasks"); //get all the tasks
// app.post("/api/v1/tasks"); //create a new task
// app.get("/api/v1/tasks/:id"); //get single task
// app.patch("/api/v1/tasks/:id"); //update task
// app.delete("/api/v1/tasks/:id"); //delete task

const start = async () => {
  try {
    connectDB(process.env.MONGO_STRING);
    console.log("db connect");
    app.listen(3000, console.log(`Server is listening on port 3000`));
  } catch (err) {
    console.log(err);
  }
};

start();
//first we connect to db , then we start the server

//Rest stands for representational state transfer
