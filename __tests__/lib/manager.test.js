const Manager = require("../../lib/manager.js");

it("Check method", () =>{
    const newManager = new Manager("John Madden", 1, "johnmaddens@aeiou.com", 123);

    expect(newManager.getName()).toBe("John Madden");
    expect(newManager.getId()).toBe(1);
    expect(newManager.getEmail()).toBe("johnmaddens@aeiou.com");
    expect(newManager.getGeneric()).toBe(123);

})