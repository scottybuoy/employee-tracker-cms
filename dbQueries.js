const mysql = require("mysql2");
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "company_db"
    }
);


// Display all departments
const showDepartments = () => {
    
    const sql =`SELECT department.id AS id, department.name AS department FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.log("\n\nShowing all departments...\n");
        console.table(rows);
    })
};


// Add a department
const addDepartment = () => {
    console.log("testing for add department");
};


// Display all roles
const showRoles = () => {

    const sql =`SELECT role.id, role.title, department.name AS department, role.salary
                FROM role
                INNER JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.log("\n\nShowing all departments...\n");
        console.table(rows);
    }) 
};

const addRole = () => {
    
    const sql = ``
};


// Display all employees
const showEmployees = () => {
    
    const sql =`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department,
                role.salary AS salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.query(sql, (err, rows) => {
        if (err) throw (err);
        console.log("\n\nShowing all employees...\n");
        console.table(rows);
    }) 
};

const addEmployee = () => {
    
    const sql = ``
};

const updateEmployee = () => {
    
    const sql = ``
};

module.exports = { showDepartments, addDepartment, showRoles, addRole, showEmployees, addEmployee, updateEmployee }

