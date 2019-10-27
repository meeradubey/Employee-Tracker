DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUE ("Instructors"), ("Management"), ("Graphic Art"), ("Business Revenue"); 

INSERT INTO roles (title, salary, department_id)
VALUE ("Yoga teacher", 100000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUE ("Graphic Designer", 50000.00, 2);

INSERT INTO roles (title, salary, department_id)   
VALUE ("Manager", 150000.00, 3);

INSERT INTO roles (title, salary, department_id)   
Value ("Business Manager", 75000.00, 4);   

INSERT INTO employees(first_name, last_name, role_id, manager_id)    
Value   ("Meera", "Dubey", 1, 3), ("Lawrence", "Rush", 1, 1), ("Carla", "Manosa", 1, 4), ("Dillon", "Couchois", 1, 2)                                                                                                                                                                       

