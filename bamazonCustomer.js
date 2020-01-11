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
  console.log("Connected as id: " + connection.threadId);
  inquirer
    .prompt([
      // Here we give the user a list to choose from.
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "See songs by an artist?",
          "See repeated artists?",
          "See all songs between two dates?",
          "Find a specific song?"
        ],
        name: "toDo"
      }
    ])
    .then(function(inquirerResponse) {
      console.log("You chose to : " + inquirerResponse.toDo);
    });
});
