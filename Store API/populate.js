require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_STRING);
    await Product.deleteMany(); //delete all existing products
    await Product.create(jsonProducts); //this will pass all the array in jsonProducts as individual product to db through our model
    //easy way to dynamically get all products in db
    console.log("Data added to db");
    process.exit(0); //this will exit the process
  } catch (err) {
    console.log(err);
    process.exit(1); //this will exit the process with an error
  }
};

start();
