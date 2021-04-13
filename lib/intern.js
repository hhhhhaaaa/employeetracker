const Employee = require("./employee");

module.exports = class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school;
    }
    getGeneric() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
}