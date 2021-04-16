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
        let managers = "";
        let roles = "";
        let fName = "";
        let lName = "";
        let managerId = "";
        let roleId = "";

        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee WHERE role_id = 5;", (error, results) => {
            if (error) throw error;
            managers = results.map(name => {
                const title = name.Name;
                return title;
            });
            managers.unshift("None");
            connection.query("SELECT title AS Role FROM job;", (error, results) => {
                if (error) throw error;
                roles = results.map(name => {
                    const title = name.Role;
                    return title;
                });
                inquirer.prompt(
                        [{
                                type: "input",
                                message: "What is the employee's first name?",
                                name: "firstName"
                            },
                            {
                                type: "input",
                                message: "What is the employee's last name?",
                                name: "lastName"
                            },
                            {
                                type: "list",
                                message: "What is the employee's role?",
                                name: "roleType",
                                choices: roles
                            },
                            {
                                type: "list",
                                message: "Who is the employee's manager?",
                                name: "managerType",
                                choices: managers
                            }

                        ])
                    .then(data => {
                        fName = data.firstName;
                        lName = data.lastName;
                        roleT = data.roleType;
                        manaT = data.managerType;
                        connection.query(`
                        SELECT role_id
                        FROM job
                        WHERE title = "${roleT}"
                        `, (error, results) => {
                            roleId = results.map(name => {
                                const title = name.role_id;
                                return title;
                            });
                            if (error) throw error;
                            if (manaT === "None") {
                                connection.query(`
                                INSERT INTO employee(first_name, last_name, role_id)
                                VALUES("${fName}", "${lName}", ${roleId}});
                                `)
                                connection.end();
                                initiate();
                            } else {
                                manTArray = manaT.split(" ")
                                connection.query(`
                                SELECT id
                                FROM employee
                                WHERE first_name = "${manTArray[0]}" AND last_name = "${manTArray[1]}"
                                `, (error, results) => {
                                    managerId = results.map(name => {
                                        const title = name.id;
                                        return title;
                                    });
                                    if (error) throw error;
                                    connection.query(`
                                    INSERT INTO employee(first_name, last_name, role_id, manager_id)
                                    VALUES("${fName}", "${lName}", ${roleId}, ${managerId});
                                    `, (error, results) => {
                                        if (error) throw error;
                                        connection.end();
                                        initiate();
                                    })
                                })
                            }
                        })
                    })
            });
        });
    } else if (type === "role") {
        let dps = "";
        let depId = "";
        connection.query("SELECT department_name AS Department FROM department;", (error, results) => {
            if (error) throw error;
            dps = results.map(name => {
                const title = name.Department;
                return title;
            });
            inquirer.prompt(
                    [{
                            type: "input",
                            message: "What is the role's title?",
                            name: "roleName"
                        },
                        {
                            type: "input",
                            message: "What is the role's salary?",
                            name: "salary"
                        },
                        {
                            type: "list",
                            message: "What is the role's department?",
                            name: "depName",
                            choices: dps
                        }
                    ]
                )
                .then(data => {
                    const rName = data.roleName;
                    const rSalary = data.salary;
                    const fullDepName = data.depName
                    connection.query(`
                                SELECT department_id
                                FROM department
                                WHERE department_name = "${fullDepName}"
                        `, (error, results) => {
                        if (error) throw error;
                        depId = results.map(name => {
                            const title = name.department_id;
                            return title;
                        });
                        connection.query(`
                        INSERT INTO job(title, salary, department_id)
                        VALUES("${rName}", ${parseInt(rSalary)}, ${depId});
                        `, (error, results) => {
                            if (error) throw error;
                            connection.end();
                            initiate();
                        })
                    })
                });
        });
    } else if (type === "department") {
        inquirer.prompt(
                [{
                    type: "input",
                    message: "What is the department's name?",
                    name: "name"
                }]
            )
            .then(name => {
                const depName = name.name;
                connection.query(`
                INSERT INTO department(department_name)
                VALUES("${depName}");
                `, (error, results) => {
                    if (error) throw error;
                    connection.end();
                    initiate();
                })
            })
    }
}