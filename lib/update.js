const inquirer = require('inquirer');
const mysql = require("mysql");

module.exports = function (option) {
    const initiate = require('./initiate.js');

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sonic",
        database: "employeesdb"
    })

    if (option === "role") {
        let employeeName = "";
        let roleName = "";
        let roleResults = "";
        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee;", (error, results) => {
            if (error) throw error;
            employeeName = results.map(name => {
                const title = name.Name;
                return title;
            });
            inquirer.prompt([{
                    type: "list",
                    message: "Which Employee needs to be updated?",
                    name: "employeeName",
                    choices: employeeName
                }])
                .then(firstChoice => {
                    const fullEName = firstChoice.employeeName.split(" ");
                    connection.query("SELECT title AS Role FROM job;", (error, results) => {
                        if (error) throw error;
                        roleName = results.map(name => {
                            const title = name.Role;
                            return title;
                        });
                        inquirer.prompt([{
                                type: "list",
                                message: "To Which Role?",
                                name: "roleName",
                                choices: roleName
                            }])
                            .then(secondChoice => {
                                const fullRName = secondChoice.roleName;
                                connection.query(`
                                SELECT role_id
                                FROM job
                                WHERE title = "${fullRName}"
                        `, (error, results) => {
                                    roleResults = results.map(name => {
                                        const title = name.role_id;
                                        return title;
                                    });
                                    if (error) throw error;
                                    connection.query(`
                                    UPDATE employee
                                    SET role_id = ${roleResults[0]}
                                    WHERE first_name = "${fullEName[0]}" AND last_name = "${fullEName[1]}"
                                    `, (error, results) => {
                                        if (error) throw error;
                                        connection.end();
                                        initiate();
                                    })
                                })
                            })
                    })
                })
        })
    } else if (option === "manager") {
        let employeeName = "";
        let managerName = "";
        let managerResults = "";
        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee;", (error, results) => {
            if (error) throw error;
            employeeName = results.map(name => {
                const title = name.Name;
                return title;
            });
            inquirer.prompt([{
                    type: "list",
                    message: "Which Employee needs to be updated?",
                    name: "employeeName",
                    choices: employeeName
                }])
                .then(firstChoice => {
                    const fullEName = firstChoice.employeeName.split(" ");
                    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee WHERE role_id = 5;", (error, results) => {
                        if (error) throw error;
                        managerName = results.map(name => {
                            const title = name.Name;
                            return title;
                        });
                        inquirer.prompt([{
                                type: "list",
                                message: "To Which Manager?",
                                name: "managerName",
                                choices: managerName
                            }])
                            .then(secondChoice => {
                                const fullMName = secondChoice.managerName.split(" ");
                                connection.query(`
                                SELECT id
                                FROM employee
                                WHERE first_name = "${fullMName[0]}" AND last_name = "${fullMName[1]}"
                        `, (error, results) => {
                                    managerResults = results.map(name => {
                                        const title = name.id;
                                        return title;
                                    });
                                    if (error) throw error;
                                    connection.query(`
                                    UPDATE employee
                                    SET manager_id = ${managerResults[0]}
                                    WHERE first_name = "${fullEName[0]}" AND last_name = "${fullEName[1]}"
                                    `, (error, results) => {
                                        if (error) throw error;
                                        connection.end();
                                        initiate();
                                    })
                                })
                            })
                    })
                })
        })
    }
}