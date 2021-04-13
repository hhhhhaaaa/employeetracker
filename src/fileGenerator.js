function fileGenerator(title, managerArray, engineerArray, internArray) {
    const managerMarkdown = [];
    const engineerMarkdown = [];
    const internMarkdown = [];

    managerArray.forEach(item => {
        managerMarkdown.push(`
    <div class="card col-4 text-center">
        <h2 class="card-header">${item.getName()}</h2>
        <h3>${item.getRole()}</h3>

        <div class="card-body">
        <p>ID: ${item.getId()}</p>
        <p>Email: <a href="${item.getEmail()}">${item.getEmail()}</a></p>
        <p>Office Number: ${item.getGeneric()}</p>
        </div>
    </div>`);
    })

    engineerArray.forEach(item => {
        engineerMarkdown.push(`
    <div class="card col-4 text-center">
        <h2 class="card-header">${item.getName()}</h2>
        <h3>${item.getRole()}</h3>

        <div class="card-body">
        <p>ID: ${item.getId()}</p>
        <p>Email: <a href="${item.getEmail()}">${item.getEmail()}</a></p>
        <p>Github: <a href="https://www.github.com/${item.getGeneric()}">${item.getGeneric()}</a></p>
        </div>
    </div>`);
    })

    internArray.forEach(item => {
        internMarkdown.push(`
    <div class="card col-4 text-center">
        <h2 class="card-header">${item.getName()}</h2>
        <h3>${item.getRole()}</h3>

        <div class="card-body">
        <p>ID: ${item.getId()}</p>
        <p>Email: <a href="${item.getEmail()}">${item.getEmail()}</a></p>
        <p> School: ${item.getGeneric()} </p>
        </div>
    </div>`);
    })

    let markdown = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</head>
<body>
<h1 class="nav justify-content-center py-5 bg-warning"> ${title} </h1>
<div class="col-12 row">
${managerMarkdown}
${engineerMarkdown}
${internMarkdown}
</div>

</body>

</html>
`;

    return markdown;
}

module.exports = fileGenerator;