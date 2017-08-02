var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port:3306,

  user:"root",

  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err){
  if (err) throw err;
  start();
});
//START FUNCTION, dipslays all products
function start() {
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    //console.log(results);
    console.log("WELCOME TO BAMAZON---This is our product list");
    console.log("");

    for(var i = 0; i<results.length; i++){
      console.log("ID:" + results[i].item_id + "  " + "| Product: " + results[i].product_name + "| Department: " + results[i].department_name + "| Price: " + results[i].price + "| Stock: " + results[i].stock_quantity);
    }
    console.log("");
    buy();
    //connection.end();
  });
}

function buy() {
  //console.log("this works");
  connection.query("SELECT * FROM products", function(err, results){
    //if (err) throw(err);
    inquirer.prompt([{
          name: "item_id",
          type: "input",
          message: "What item would you like to buy? (ID number)",
          validate: function(value){
            if (isNaN(value)==false && value <= results.length) {
              return true;
              console.log("that's a number");
            } else {
              return false;
            }
          }
        },{
          name:"quantity",
          type:"input",
          message:"How many would you like to buy?",
          validate: function(value){
            if(isNaN(value)==false){
              return true;
            } else {
              return false;
            }
          }
        }]).then(function(value){
          connection.query("SELECT")
        })
    });
}
/*
  inquirer.prompt([
  {
    name: "item",
    type: "input",
    message: "What would you like to buy?"
  },
  {
    name: "quantity",
    type: "input",
    message: "How many would you like to buy?"
  }
  ])
  .then(function(answer){
    var
  })
}
*/
