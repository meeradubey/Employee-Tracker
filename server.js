var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "meeradubey23",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
  addRole();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "MainChoices",
      type: "list",
      message: "Welcome to Employee Tracker, what would you like to do?",
      choices: ["ADD", "VIEW", "UPDATE"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "ADD") {
        ADD();
      }
      else if(answer.postOrBid === "VIEW") {
        VIEW();
      } else{
        connection.end();
      }
    });
}

// function to handle posting new items 
  // prompt for info about the item 

  function addRole() {
    inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is their salary?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is their department?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!");
                }
            );
        });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: "employees",
                  type: "list",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].last_name);
                      }
                      return choiceArray;
                  },
                  message: "What employee would you like to update?"
              }
          ])
          .then(function (answer) {
              console.log(answer.employees)
              updateEmployee(answer.employees)
          })
  })
}
function updateEmployee(lastName) {
  inquirer
      .prompt([
          {
              name: "first_name",
              type: "input",
              message: "What is their First Name?"
          },
          {
              name: "last_name",
              type: "input",
              message: "What is their Last Name?"
          },
          {
              name: "role_id",
              type: "input",
              message: "What is their role?"
          },
          {
              name: "manager_id",
              type: "input",
              message: "Who is their Manager"
          },
      ]).then(function (answer) {
          connection.query(
              "UPDATE employee SET ?,?,?,? WHERE ?",
              [
                  {
                      first_name: answer.first_name
                  },
                  {
                      last_name: answer.last_name
                  },
                  {
                      role_id: answer.role_id
                  },
                  {
                      manager_id: answer.manager_id
                  },
                  {
                      last_name: lastName
                  }
              ],
              function (error) {
                  if (error) throw err;
                  console.log("Employee updated successfully!");
                  start();
              }
          );
      })
}




