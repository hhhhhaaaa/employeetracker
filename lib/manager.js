const Employee = require("./employee");

module.exports = class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.generic = officeNumber;
    }
    getGeneric() {
        return this.generic;
    }
    getRole() {
        return "Manager";
    }
}