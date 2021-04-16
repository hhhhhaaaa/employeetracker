const inquirer = require('inquirer');
const mysql = require("mysql");

module.exports = function (type) {
    const initiate = require('./initiate.js');

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sonic",
        database: "employeesdb"
    })

    if (type === "employee") {
        let employeeName = "";
        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee;", (error, results) => {
            if (error) throw error;
            employeeName = results.map(name => {
                const title = name.Name;
                return title;
            })
            inquirer.prompt([{
                    type: "list",
                    message: "Which Employee needs to be removed?",
                    name: "employeeName",
                    choices: employeeName
                }])
                .then(choice => {
                    const fullEName = choice.employeeName.split(" ");
                    connection.query(`
                    DELETE FROM employee
                    WHERE first_name = "${fullEName[0]}" AND last_name = "${fullEName[1]}"
                    `, (error, results) => {
                        if (error) throw error;
                        connection.end();
                        initiate();
                    })
                })
        });
    } else if (type === "role") {
        let roleName = "";
        connection.query("SELECT title AS Role FROM job;", (error, results) => {
            if (error) throw error;
            roleName = results.map(name => {
                const title = name.Role;
                return title;
            })
            inquirer.prompt([{
                    type: "list",
                    message: "Which Role needs to be removed?",
                    name: "roleName",
                    choices: roleName
                }])
                .then(choice => {
                    const fullRName = choice.roleName;
                    connection.query(`
                    DELETE FROM job
                    WHERE title = "${fullRName}"
                    `, (error, results) => {
                        if (error) throw error;
                        connection.end();
                        initiate();
                    })
                })
        });
    } else if (type === "department") {
        let depName = "";
        connection.query("SELECT department_name AS Department FROM department;", (error, results) => {
            if (error) throw error;
            depName = results.map(name => {
                const title = name.Department;
                return title;
            })
            inquirer.prompt([{
                    type: "list",
                    message: "Which Department needs to be removed?",
                    name: "depName",
                    choices: depName
                }])
                .then(choice => {
                    const depName = choice.depName;
                    connection.query(`
                    DELETE FROM department
                    WHERE department_name = "${depName}"
                    `, (error, results) => {
                        if (error) throw error;
                        connection.end();
                        initiate();
                    })
                })
        });
    }
}