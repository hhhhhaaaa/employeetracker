const initialQuestions = [
    {
    type: "input",
    message: "What is your Team's Name?",
    name: "title",
},
{
    type: "input",
    message: "Please enter the Team Manager's Name.",
    name: "name",
},
{
    type: "number",
    message: "Please enter the Team Manager's Employee ID.",
    name: "id",
},
{
    type: "input",
    message: "Please enter the Team Manager's Email Address.",
    name: "email",
},
{
    type: "number",
    message: "Please enter the Team Manager's Office Number.",
    name: "generic",
},
{
    type: "list",
    message: "Please Select An Option",
    name: "choice",
    choices: [
        "Add A New Engineer",
        "Add A New Intern",
        "Finish And Generate Files"
    ],
}
];

const engineerQuestions = [
{
    type: "input",
    message: "Please enter the Team Engineer's Name.",
    name: "name",
},
{
    type: "number",
    message: "Please enter the Team Engineer's Employee ID.",
    name: "id",
},
{
    type: "input",
    message: "Please enter the Team Engineer's Email Address.",
    name: "email",
},
{
    type: "input",
    message: "Please enter the Team Engineer's Github.",
    name: "generic",
},
{
    type: "list",
    message: "Please Select An Option",
    name: "choice",
    choices: [
        "Add A New Engineer",
        "Add A New Intern",
        "Finish And Generate Files"
    ],
}
];

const internQuestions = [
{
    type: "input",
    message: "Please enter the Team Intern's Name.",
    name: "name",
},
{
    type: "number",
    message: "Please enter the Team Intern's Employee ID.",
    name: "id",
},
{
    type: "input",
    message: "Please enter the Team Intern's Email Address.",
    name: "email",
},
{
    type: "input",
    message: "Please enter the Team Intern's School.",
    name: "generic",
},
{
    type: "list",
    message: "Please Select An Option",
    name: "choice",
    choices: [
        "Add A New Engineer",
        "Add A New Intern",
        "Finish And Generate Files"
    ],
}
];

module.exports = {
    initialQuestions,
    engineerQuestions,
    internQuestions
}