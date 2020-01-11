var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

const password = process.env.DB_PASS;

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
  var query = connection.query("select * from products", function(err, res) {
    if (err) throw err;
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
    console.table(values);
  });
  endConnection();
}
function endConnection() {
  connection.end();
}
