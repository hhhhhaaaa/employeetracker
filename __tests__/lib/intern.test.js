const Intern = require("../../lib/intern.js");

it("Check method", () =>{
    const newIntern = new Intern("John Madden", 1, "johnmaddens@aeiou.com", "School");

    expect(newIntern.getName()).toBe("John Madden");
    expect(newIntern.getId()).toBe(1);
    expect(newIntern.getEmail()).toBe("johnmaddens@aeiou.com");
    expect(newIntern.getGeneric()).toBe("School");

})