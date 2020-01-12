// NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

// Password from .env file
const password = process.env.DB_PASS;

// Connect to MYSQL Database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "bamazon_db"
});

connection.connect((err) => {
  if (err) throw err;
  displayStore();
});
function displayStore() {
  // Get all Products
  var query = connection.query("select * from products", function(err, res) {
    if (err) throw err;
    // Place products into an array
    let values = [];
    for (var i = 0; i < res.length; i++) {
      values.push({
        ID: res[i].id,
        Product: res[i].product_name,
        Department: res[i].department_name,
        Price: res[i].price,
        Stock: res[i].stock_quantity
      });
    }
    // Display array in terminal using console.tables
    console.table(values);
    buyItems();
  });
}
function buyItems() {
  inquirer
    .prompt([
      // Here we give the user a list to choose from.
      {
        type: "input",
        message: "Enter the ID of the product you wish buy.",
        name: "productID"
      },
      {
        type: "input",
        message: "How many would you like to have?",
        name: "productCount"
      }
    ])
    .then(function(inquirerResponse) {
      console.log("You chose to : " + inquirerResponse.productID);
      console.log("You chose to : " + inquirerResponse.productCount);
      checkItem(inquirerResponse.productID, inquirerResponse.productCount);
    });
}
function checkItem(thisItem, thisMuch) {
  console.log(thisItem);
  var query = "SELECT stock_quantity FROM products WHERE id = ?";
  connection.query(query, thisItem, function(err, res) {
    if (err) throw err;
    // Place products into an array
    let inStock = res[0].stock_quantity;
    console.log(`This is how much their is: ${inStock}`);
    if (thisMuch < inStock) {
      console.log("There is enough");
      updateStock();
    } else {
      console.log("Insufficient quantity!");
      endConnection();
    }
  });
}
function updateStock() {
  endConnection();
}
function endConnection() {
  connection.end();
}
