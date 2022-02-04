// require  dependencies
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");
require('dotenv').config()

// import functions for specific db queries
const { showDepartments } = require("./dbQueries");
const { addDepartment } = require("./dbQueries");
const { showRoles } = require("./dbQueries");
const { addRole } = require("./dbQueries");
const { showEmployees } = require("./dbQueries");
const { addEmployee } = require("./dbQueries");

// variable for port, create instance of express, and middleware
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "company_db"
    },
    console.log("Connected to company_db database")
);




const menuPrompt = () => {
    inquirer.prompt(
        [{
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add Role", "Add employee", "Update employee role"]
        }]
    ).then((userResponse) => {
        if (userResponse.options === "View all departments") {
            showDepartments();
           
        } else if (userResponse.options === "View all roles") {
            showRoles();
           
        } else if (userResponse.options === "View all employees") {
            showEmployees();

        } else if (userResponse.options === "Add department") {
            addDepartment();
            
        } else if (userResponse.options === "Add Role") {
            addRole();
    
        } else if (userResponse.options === "Add employee") {
            addEmployee();
            
        } else if (userResponse.options === "Update employee role") {
            updateEmployee();
        }
        menuPrompt();
    })
}



menuPrompt();
   



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
