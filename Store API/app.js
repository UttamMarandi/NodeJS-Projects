require("dotenv").config();
// async-errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="api/v1/products">products route</a>`);
});

//products route
app.use("/api/v1/products", productsRouter);

//global custom middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
//server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_STRING);
    console.log("db connected");
    app.listen(port, console.log("listening at 3000"));
  } catch (error) {}
};
start();
