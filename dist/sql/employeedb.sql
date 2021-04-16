-- DROP DATABASE IF EXISTS employeesdb;

-- CREATE DATABASE employeesdb;

-- USE employeesdb;

-- CREATE TABLE department (
--  department_id MEDIUMINT NOT NULL AUTO_INCREMENT UNIQUE,
--  department_name VARCHAR(30) NOT NULL,
--  primary key (department_id)
-- );

-- CREATE TABLE job (
--  role_id MEDIUMINT NOT NULL AUTO_INCREMENT UNIQUE,
--  title VARCHAR(30) NOT NULL,
--  salary DECIMAL NOT NULL,
--  department_id MEDIUMINT NOT NULL,
--  primary key (role_id)
-- );

-- CREATE TABLE employee (
--  id MEDIUMINT NOT NULL AUTO_INCREMENT UNIQUE,
--  first_name VARCHAR(30) NOT NULL,
--  last_name VARCHAR(30) NOT NULL,
--  role_id MEDIUMINT NOT NULL,
--  manager_id MEDIUMINT,
--  primary key (id)
-- );

-- ALTER TABLE job
-- ADD FOREIGN KEY (department_id) REFERENCES department(department_id);

-- ALTER TABLE employee
-- ADD FOREIGN KEY (role_id) REFERENCES job(role_id);

-- ALTER TABLE employee
-- ADD FOREIGN KEY (manager_id) REFERENCES employee(id);

-- INSERT INTO department (department_name)
-- VALUES ("Management");

-- INSERT INTO department (department_name)
-- VALUES ("Sales");

-- INSERT INTO department (department_name)
-- VALUES ("HR");

-- INSERT INTO department (department_name)
-- VALUES ("Marketing");

-- INSERT INTO job (title, salary, department_id)
-- VALUES ("Salesman", 20000, 2);

-- INSERT INTO job (title, salary, department_id)
-- VALUES ("Advertiser", 10000, 4);

-- INSERT INTO job (title, salary, department_id)
-- VALUES ("HR", 10000, 3);

-- INSERT INTO job (title, salary, department_id)
-- VALUES ("Junior HR", 10000, 3);

-- INSERT INTO job (title, salary, department_id)
-- VALUES ("Manager", 50000, 1);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Ted", "Schmosby", 5);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Skeletor", "TheGreat", 5);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Lizard", "Man", 2, 1);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Lizard", "Fellow", 3, 2);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Lizard", "Dude", 4, 1);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Lizard", "Guy", 1, 2);

-- SELECT a.id, a.first_name, a.last_name, job.title, department.department_name AS department, job.salary, IFNULL(CONCAT(b.first_name, ' ', b.last_name), 'Top Boss') AS manager
-- FROM employee a
-- INNER JOIN job ON a.role_id = job.role_id
-- INNER JOIN department ON job.department_id = department.department_id
-- LEFT JOIN employee b ON a.manager_id = b.id
-- WHERE b.first_name = "Ted" AND b.last_name = "Schmosby"
-- ORDER BY a.id ASC;

USE employeesdb;

-- UPDATE employee
-- SET manager_id = 1
-- WHERE first_name = "Lizard" AND last_name = "Guy";

SELECT role_id FROM job WHERE title = "HR";