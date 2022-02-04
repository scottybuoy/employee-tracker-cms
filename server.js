const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const menuPrompt = () => {
    inquirer.prompt(
        [{
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View all deptartments", "Add department", "View all roles", "Add role", "View all employees", "Add employee"]
        }]
    ).then((userResponse) => {
        if (userResponse.options === "View all departments") {
            console.log("view all departments");
        } else if(userResponse.options === "Add department") {
            console.log("Add department");
        } else if(userResponse.options === "Add role") {
            console.log("Add role");
        } else if(userResponse.options === "View all employees") {
            console.log("View all employees");
        } else if(userResponse.options === "Add employee") {
            console.log("Add employee");
        }
        menuPrompt();
    })
}



menuPrompt();
   



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})