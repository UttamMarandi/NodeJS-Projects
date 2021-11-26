const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};
const getAllProductsStatic = async (req, res) => {
  throw new Error("testing async errors"); //this error is shown in postman
  res.status(200).json({ msg: "products testing" });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
