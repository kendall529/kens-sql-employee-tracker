const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = require('./db/connection');

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
            }
        })
        .catch(err => console.error(err));
}

init();

const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, results) => {
        if(err) throw err;

        console.table(results);
        init();
    });
};

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) => {
        if(err) throw err;

        console.table(results);
        init();
    });
}