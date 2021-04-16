const inquirer = require('inquirer');

const viewSql = require("./view.js");
const addSql = require("./add.js");
const updateSql = require("./update.js");
const removeSql = require("./remove.js");

module.exports = function () {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department"
            ],
        }])
        .then(res => {
            const choice = res.choice;
            if (choice === "View All Employees") {
                viewSql("employee", "all");
                return;
            } else if (choice === "View All Employees By Department") {
                viewSql("employee", "department");
                return;
            } else if (choice === "View All Employees By Manager") {
                viewSql("employee", "manager");
                return;
            } else if (choice === "Add Employee") {
                addSql("employee");
                return;
            } else if (choice === "Remove Employee") {
                removeSql("employee");
                return;
            } else if (choice === "Update Employee Role") {
                updateSql("role");
                return;
            } else if (choice === "Update Employee Manager") {
                updateSql("manager");
                return;
            } else if (choice === "View All Roles") {
                viewSql("role");
                return;
            } else if (choice === "Add Role") {
                addSql("role");
                return;
            } else if (choice === "Remove Role") {
                removeSql("role");
                return;
            } else if (choice === "View All Departments") {
                viewSql("department");
                return;
            } else if (choice === "Add Department") {
                addSql("department");
                return;
            } else if (choice === "Remove Department") {
                removeSql("department");
                return;
            }
        })
        .catch(error => {
            throw error;
        })
}