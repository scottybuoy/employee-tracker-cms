// const inquirer = require("inquirer");
// const mysql = require("mysql2");
// const { menuPrompt } = require("./server");
// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: process.env.DB_PASSWORD,
//         database: "company_db"
//     }
// );


// //------- Display all departments -------

// const showDepartments = () => {
    
//     const sql =`SELECT department.id AS id, department.name AS department FROM department`;

//     db.promise().query(sql, (err, data) => {
//         if (err) throw (err);
//         console.log("\n\nShowing all departments...\n");
//         console.table(data);
        
//     }).then(() => {
//         menuPrompt();
//     }).catch(err => console.error(err));
// };


// //------- Add a department -------

// const addDepartment = () => {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "addDepartment",
//             message: "What department would you like to add?",
//             validate: addDepartment => {
//                 if (addDepartment) {
//                     return true;
//                 }
//                 console.log("Please enter a department");
//                 return false;
//             }
//         }
//     ]).then((userResponse) => {
//         const sql =`INSERT INTO department (name)
//                     VALUES (?)`;
//         db.query(sql, userResponse.addDepartment, (err, res) => {
//             if (err) throw (err);
//             console.log(`${userResponse.addDepartment} added to departments`)

//             showDepartments();
//         }) 
//     })  
// };


// //------- Display all roles -------

// const showRoles = () => {

//     const sql =`SELECT role.id, role.title, department.name AS department, role.salary
//                 FROM role
//                 INNER JOIN department ON role.department_id = department.id`;

//     db.query(sql, (err, rows) => {
//         if (err) throw (err);
//         console.log("\n\nShowing all departments...\n");
//         console.table(rows);
//     }) 
// };


// //------- Add a role -------

// const addRole = () => {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "role",
//             message: "What role would you like to add?",
//             validate: (addRole) => {
//                 if (addRole) {
//                     return true;
//                 }
//                 console.log("Please enter a role");
//                 return false;
//             }
//         },
//         {
//             type: "input", 
//             name: "salary",
//             message: "What is the salary of this role?",
//             validate: salary => {
//               if (salary) {
//                   return true;
//               } else {
//                   console.log("Please enter a valid salary");
//                   return false;
//               }
//             }
//         },
//         {
//             type: "list",
//             name: "department",
//             message: "What department does this role belong to?",
//             choices: ["1", "2", "3", "4"],
//             validate: (choices) => {
//                 if (!choices) {
//                     console.log("Please select a department");
//                 }
//                 return true;
//             }
            
//         }
//     ]).then((userResponse) => {
//         const params = [userResponse.role, userResponse.salary, userResponse.department];
//         const sql =`INSERT INTO role (title, salary, department_id)
//                     VALUES (?, ?, ?)`;
//         db.query(sql, params, (err, res) => {
//             if (err) throw (err);
//             console.log(`${userResponse.role} added to roles`)

//             showRoles();
//         }) 
//     })  
// };


// //------- Display all employees -------

// const showEmployees = () => {
    
//     const sql =`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department,
//                 role.salary AS salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
//                 FROM employee
//                 LEFT JOIN role ON employee.role_id = role.id
//                 LEFT JOIN department ON role.department_id = department.id
//                 LEFT JOIN employee manager ON employee.manager_id = manager.id`;

//     db.query(sql, (err, rows) => {
//         if (err) throw (err);
//         console.log("\n\nShowing all employees...\n");
//         console.table(rows);
//     }) 
// };


// // ------- Add an employee -------

// const addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "firstName",
//             message: "What is the employee's first name?",
//             validate: (firstName) => {
//                 if (firstName) {
//                     return true;
//                 }
//                 console.log("Please enter a first name for the employee")
//                 return false;
//             }
//         },
//         {
//             type: "input",
//             name: "lastName",
//             message: "What is the employee's last name?",
//             validate: (lastName) => {
//                 if (lastName) {
//                     return true;
//                 }
//                 console.log("Please enter a last name for the employee")
//                 return false;
//             }
//         },
//         {
//             type: "list",
//             name: "role",
//             message: "What is the employee's role?",
//             choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant",
//                       "Legal Team Lead", "Lawyer"],
//             validate: (role) => {
//                 if (role) {
//                     return true;
//                 }
//                 console.log("Please enter a role for the employee")
//                 return false;
//             }
//         },
//         {
//             type: "list",
//             name: "manager",
//             message: "Who is this employee's manager?",
//             choices: ["1", "3", "5", "7"],
//             validate: (manager) => {
//                 if (manager) {
//                     return true;
//                 }
//                 console.log("Please enter a manager for the employee")
//                 return false;
//             }
//         }
//     ]).then((userResponse) => {
//         let empRole;
        
//         if (userResponse.role === "Sales Lead") {
//            empRole = 1;
//         } else if (userResponse.role === "Salesperson") {
//             empRole = 2;
//         } else if (userResponse.role === "Lead Engineer") {
//             empRole = 3;
//         } else if (userResponse.role === "Software Engineer") {
//             empRole = 4;
//         } else if (userResponse.role === "Account Manager") {
//             empRole = 5;
//         } else if (userResponse.role === "Accountant") {
//             empRole = 6;
//         } else if (userResponse.role === "Legal Team Lead") {
//             empRole = 7;
//         } else if (userResponse.role === "Lawyer") {
//             empRole = 8;
//         }
//         const params = [userResponse.firstName, userResponse.lastName, empRole, userResponse.manager];
//         const sql =`INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                     VALUES (?, ?, ?, ?)`;
//         db.query(sql, params, (err, res) => {
//             if (err) throw (err);
//             console.log(`${userResponse.firstName} ${userResponse.lastName} added to employees`)

//             showEmployees();
//         }) 
//     })  
// };


// // ------- Update an Employee -------

// const updateEmployee = () => {
//     const sql = `SELECT * FROM employee`;
//     db.query(sql, (err, data) => {
//         if (err) throw (err);
//         const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

//         inquirer.prompt([
//             {
//                 type: "list",
//                 name: "name",
//                 message: "Which employee would you like to update?",
//                 choices: employees
//             }
//         ]).then((userResponse) => {
//             console.log(`You have selected ${userResponse.name} to update`);
//         })
//     })
// };

// module.exports = { showDepartments, addDepartment, showRoles, addRole, showEmployees, addEmployee, updateEmployee }

