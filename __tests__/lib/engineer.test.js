const Engineer = require("../../lib/engineer.js");

it("Check method", () =>{
    const newEngineer = new Engineer("John Madden", 1, "johnmaddens@aeiou.com", "Github");

    expect(newEngineer.getName()).toBe("John Madden");
    expect(newEngineer.getId()).toBe(1);
    expect(newEngineer.getEmail()).toBe("johnmaddens@aeiou.com");
    expect(newEngineer.getGeneric()).toBe("Github");

});