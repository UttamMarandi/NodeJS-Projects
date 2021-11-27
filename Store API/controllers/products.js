const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true })
    .sort("name price")
    .select("name price")
    .limit(4)
    .skip(1);
  //object takes the queries
  //.limit(number)limits the number of results. .limit() is chained to .find()
  //.sort(string) is chained to .limit .sort() takes paremeters based on which it will sort the results. "-name" means sorting the name from z to a. "price" means sorting the results from lowest to highest.
  //.select(string) only selets these two keys for the output
  //.skip(number) removes the number of first query results
  res.status(200).json({ products, nbHits: products.length });
  // throw new Error("testing async errors"); //this error is shown in postman
  // res.status(200).json({ msg: "products testing" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    //it works even if featured is set as false by default
    //if featured is undefinde/null , then this block will not get executed.
    //this prevents if no featured query params is provided
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; //regex is query operator for mongodb that allows us to search patterns instead of matching whole text. $options are options that we can provide to it. "i" means case insensitive. Other options include "m","x",and "s". More on documentation.
  }
  console.log(req.query);
  console.log(queryObject);
  // const products = await Product.find(queryObject); //req.query acts as filter: ;
  //we cannot use await with .sort() chained to .find() b.c then we will already have the list before sorting. so we need to remove await from .find() line
  let result = Product.find(queryObject); //If we use await this is the error "The comparison function must be either a function or undefined"
  //sort
  if (sort) {
    console.log("sort", sort);
    const sortList = sort.split(",").join(" "); //the syntax of .sort() takes parameters with space between them. so we split the sort string and join it with space between them
    //only if sort query exist we sort
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt"); //default search will sort based on createdAt
  }
  //select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  //pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10; //default limit

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  //logic:pagination
  //total items = 23
  //let's say limit = 7
  //so 4 pages with items : 7,7,7,2
  //if page = 2
  //skip(7) we skip 7 items
  //then show 7 items #2nd page
  //if page = 3
  //skip(14) we skip 14 items
  //then show 7 items #3rd page

  const products = await result; //this is where we will use await
  res.status(200).json({ products, nbhits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
