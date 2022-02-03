const inquirer = require("inquirer");
const express = require("express");

const manageEmployeeData = () => {
    inquirer.prompt(
        [{
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View all deptartments", "Add department", "View all roles", "Add role", "View all employees", "Add employee"]
        }]
    )
}

manageEmployeeData();