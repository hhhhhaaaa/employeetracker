const inquirer = require('inquirer');
const mysql = require("mysql");
const cTable = require("console.table");

module.exports = function (type, option) {
    const initiate = require('./initiate.js');

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sonic",
        database: "employeesdb"
    })

    connection.connect();
    if (type === "employee") {
        if (option === "department") {
            let dep = "";
            connection.query("SELECT department_name AS Dep FROM department;", (error, results) => {
                if (error) throw error;
                dep = results.map(name => {
                    const title = name.Dep;
                    return title;
                });
                inquirer.prompt([{
                        type: "list",
                        message: "Which Department?",
                        name: "departmentName",
                        choices: dep
                    }])
                    .then(choice => {
                        connection.query(`
                    SELECT a.id, a.first_name, a.last_name, job.title, department.department_name AS department, job.salary, IFNULL(CONCAT(b.first_name, ' ', b.last_name), 'Top Boss') AS manager
                    FROM employee a
                    INNER JOIN job ON a.role_id = job.role_id
                    INNER JOIN department ON job.department_id = department.department_id
                    LEFT JOIN employee b ON a.manager_id = b.id
                    WHERE department.department_name = "${choice.departmentName}"
                    ORDER BY a.id ASC;
                    `, (error, results) => {
                            if (error) throw error;
                            console.table('\n',
                                results);
                            connection.end();
                            initiate();
                        })
                    })
            })
        } else if (option === "manager") {
            let name = "";
            connection.query("SELECT CONCAT(first_name, ' ', last_name) AS Name FROM employee WHERE role_id = 5;", (error, results) => {
                if (error) throw error;
                name = results.map(name => {
                    const title = name.Name;
                    return title;
                });
                inquirer.prompt([{
                        type: "list",
                        message: "Which Manager?",
                        name: "managerName",
                        choices: name
                    }])
                    .then(choice => {
                        const fullName = choice.managerName.split(" ");
                        connection.query(`
                        SELECT a.id, a.first_name, a.last_name, job.title, department.department_name AS department, job.salary, IFNULL(CONCAT(b.first_name, ' ', b.last_name), 'Top Boss') AS manager
                        FROM employee a
                        INNER JOIN job ON a.role_id = job.role_id
                        INNER JOIN department ON job.department_id = department.department_id
                        LEFT JOIN employee b ON a.manager_id = b.id
                        WHERE b.first_name = "${fullName[0]}" AND b.last_name = "${fullName[1]}"
                        ORDER BY a.id ASC;
                        `, (error, results) => {
                            if (error) throw error;
                            console.table('\n',
                                results);
                            connection.end();
                            initiate();
                        })
                    })
            })
        } else if (option === "all") {
            connection.query(`
            SELECT a.id, a.first_name, a.last_name, job.title, department.department_name AS department, job.salary, IFNULL(CONCAT(b.first_name, ' ', b.last_name), 'Top Boss') AS manager
            FROM employee a 
            INNER JOIN job ON a.role_id = job.role_id 
            INNER JOIN department ON job.department_id = department.department_id 
            LEFT JOIN employee b ON a.manager_id = b.id 
            ORDER BY a.id ASC;
                    `, (error, results) => {
                // id first last title department salary manager
                if (error) throw error;
                console.table('\n',
                    results);
                connection.end();
                initiate();
            });
        }

    } else if (type === "role") {
        connection.query("SELECT title AS Role FROM job;", (error, results) => {
            if (error) throw error;
            console.table('\n',
                results);
            connection.end();
            initiate();
        })
    } else if (type === "department") {
        connection.query("SELECT department_name AS Department FROM department;", (error, results) => {
            if (error) throw error;
            console.table('\n',
                results);
            connection.end();
            initiate();
        })
    }
}