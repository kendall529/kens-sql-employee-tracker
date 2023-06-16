const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = require('./db/connection');

// const consTable = require('console.table');

const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select one of the categories',
                name: 'start',
                choices: [
                    'View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update an employee role',
                ]
            }
        ])
        .then(res => {
            switch (res.start) {
                case 'View all departments': viewDepartments();
                    break;
                case 'View all roles': viewRoles();
                    break;
                case 'View all employees': viewEmployees();
                    break;
                case 'Add a department': insertDepartment();
                    break;
                case 'Add a role': insertRole();
                    break;
                case 'Add an employee': insertEmployee();
                    break;
                case 'Update an employee role': updateEmployeeRole();
                    break;
                default: console.log("Invalid choice");
                    break;
            }
        })
        .catch(err => console.error(err));
}

init();

const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, results) => {
        if(err) {

            throw err;
        } else {

            console.table(results);
            init();
        }

    });
};

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        if(err) throw err;

        console.table(results);
        init();
    });
};

const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, results) => {
        if(err) throw err;

        console.table(results);
        init();
    });
};

const insertDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the name of the department.',
                name: 'addDepartment',
            }
        ])
        .then(res => {
            db.query(`INSERT INTO departments(name)
                      VALUES(?)`, res.addDepartment, (err, results) => {
                        if(err) throw err;

                        db.query(`SELECT * FROM departments`, (err, results) => {
                            if(err) throw err;
                            init();
                        })
                      })
        })
};

const insertRole = () => {
    const departmentChoices = () => {
        db.promise()
        .query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);

            return arrNames;
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter the name of the job title.',
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: 'Enter the salary.',
                    name: 'roleSalary',
                },
                {
                    type: 'list',
                    message: 'Select the department this role belongs to.',
                    name: 'roleDepartment',
                    choices: departmentChoices,
                }
            ])
            .then(res => {
                db.promise()
                .query(`SELECT id FROM department WHERE name = ?`, res.ad)
                .then(response => {
                    let arrID = response[0].map(obj => obj.id);

                    return arrID[0];
                })
                .then(arrID => {
                    db.promise()
                    .query(`INSERT INTO roles(title, salary, department_id)
                            VALUES(?, ?, ?)`, [res.roleTitle, res.roleSalary, res.roleDepartment]);
                    init();
                });
            });
    };
};

const insertEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: `Enter employee's first name.`,
                name: 'firstName',
            },
            {
                type: 'input',
                message: `Enter employee's last name.`,
                name: 'lastName',
            },
        ])
        .then(res => {
            db.query(`INSERT INTO employees(first_name, last_name)
                      VALUES(?, ?)`, [res.firstName, res.lastName], (err, results) => {
                        if(err) throw err;

                        db.query(`SELECT * FROM employees`, (err, results) => {
                            if(err) throw err;

                            console.table(results);
                            init();
                        });
                      });
        });
};