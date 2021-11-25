const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

//middleware
app.use(express.static("./public")); //to serve static files
app.use(express.json());

// //route
// app.get("/", (req, res) => {
//   res.send("Task Manager App");
// });

app.use("/api/v1/tasks", tasks);

//order of app.use matters
//app.use("/api/v1/tasks", tasks) must be defined above of <code>app.use(notFound); </code>.
//so custom 404 gets applied to all the routes except for routes defined above it.
//in that case 404 should be inserted at the bottom of the file.
//custom 404
app.use(notFound);
app.use(errorHandlerMiddleware);
//no path is mentioned , so middleware gets applied to all the routes.

// app.get("/api/v1/tasks"); //get all the tasks
// app.post("/api/v1/tasks"); //create a new task
// app.get("/api/v1/tasks/:id"); //get single task
// app.patch("/api/v1/tasks/:id"); //update task
// app.delete("/api/v1/tasks/:id"); //delete task

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    connectDB(process.env.MONGO_STRING);
    console.log("db connect");
    app.listen(port, console.log(`Server is listening on port 3000`));
  } catch (err) {
    console.log(err);
  }
};

start();
//first we connect to db , then we start the server

//Rest stands for representational state transfer
