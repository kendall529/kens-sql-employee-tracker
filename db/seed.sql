INSERT INTO departments (name)
VALUES
    ('Web Development'),
    ('Sales'),
    ('Warehouse'),
    ('Finance'),
    ('Human Resources')
    ('IT');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Warehouse Associate', 35000, 3),
    ('Warehouse Manager', 55000, 3),
    ('CPA', 120000, 4),
    ('HR Associate', 55000, 5),
    ('HR Manager', 80000, 5),
    ('Computer Guy', 55000, 6),
    ('Sales Guy', 80000, 2),
    ('Head Sales Guy', 120000, 2),
    ('Junior Developer', 55000, 1),
    ('Senior Developer', 125000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Tim', 'Orsk', 1, NULL),
    ('Sarah', 'Tisk', 2, 2),
    ('Paul', 'Schaffer', 3, NULL),
    ('Jim', 'Fallen', 4, NULL),
    ('Jack', 'Steele', 5, 5),
    ('Reagon', 'Adler', 6, NULL),
    ('Jay', 'Mink', 7, NULL),
    ('Jason', 'Taylor', 8, 8),
    ('Sam', 'Smith', 9, NULL),
    ('Bill', 'Homertrout', 10, 10),