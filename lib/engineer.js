const Employee = require("./employee");

module.exports = class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github;
    }
    getGeneric() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}