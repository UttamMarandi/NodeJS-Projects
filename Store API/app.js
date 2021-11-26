require("dotenv").config();
// async-errors

const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="api/v1/products">products route</a>`);
});

//products route

//global custom middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
//server
const start = async () => {
  try {
    //connect to db
    app.listen(port, console.log("listening at 3000"));
  } catch (error) {}
};
start();
