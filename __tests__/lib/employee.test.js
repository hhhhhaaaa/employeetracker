const Employee = require("../../lib/employee.js");

it("Check method", () =>{
    const newEmployee = new Employee("John Madden", 1, "johnmaddens@aeiou.com");

    expect(newEmployee.getName() === "John Madden").toBe(true);
    expect(newEmployee.getId() === 1).toBe(true);
    expect(newEmployee.getEmail() === "johnmaddens@aeiou.com").toBe(true);

})