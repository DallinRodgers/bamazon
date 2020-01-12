// NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

// Password from .env file
const password = process.env.DB_PASS;
let thisItem;
let thisMuch;

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
        Price: res[i].price.toFixed(2),
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
      thisItem = inquirerResponse.productID;
      thisMuch = inquirerResponse.productCount;
      checkItem(thisItem, thisMuch);
    });
}
function checkItem(thisItem, thisMuch) {
  var query = "SELECT stock_quantity FROM products WHERE id = ?";
  connection.query(query, thisItem, function(err, res) {
    if (err) throw err;
    // Store stock count from database
    let inStock = res[0].stock_quantity;
    // Check for enough stock
    if (thisMuch < inStock) {
      const newStockCount = inStock - thisMuch;
      updateStock(thisItem, newStockCount);
    } else {
      console.log("Insufficient quantity!");
      endConnection();
    }
  });
}
function updateStock(thisItemUpdate, thisMuchUpdate) {
  var query = "UPDATE products SET stock_quantity = ? WHERE id = ?";
  connection.query(query, [thisMuchUpdate, thisItemUpdate], function(err, res) {
    if (err) throw err;
    showCost();
  });
}
function showCost() {
  var query = "SELECT price FROM products WHERE id = ?";
  connection.query(query, thisItem, function(err, res) {
    if (err) throw err;
    // Store price from database
    const price = res[0].price;
    // Get total cost
    const cost = price * thisMuch;
    console.log(`Your total is: $${cost.toFixed(2)}`);
    endConnection();
  });
}
function endConnection() {
  connection.end();
}
