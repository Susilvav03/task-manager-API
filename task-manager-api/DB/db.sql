CREATE DATABASE my_sprint_1;

SELECT * FROM users;
SELECT * FROM tasks;

-- Usuario 1: Administrador
INSERT INTO users (name, email, password, role)
VALUES (
    'Jefe Supremo',
    'admin@app.com',
    '123456', 
    'admin' 
);

-- Usuario 2: Estándar
INSERT INTO users (name, email, password, role)
VALUES (
    'María Estándar',
    'maria@app.com',
    '123456', 
    'user'
);


-- Tarea 1 (Asignada a Admin, ID=1)
INSERT INTO tasks (title, description, is_completed, user_id)
VALUES (
    'Configurar Entorno de Producción',
    'Asegurar el pipeline de CI/CD y las variables de entorno de Azure/AWS.',
    FALSE,
    1 -- ID del 'Jefe Supremo'
);

-- Tarea 2 (Asignada a Usuario Estándar, ID=2)
INSERT INTO tasks (title, description, is_completed, user_id)
VALUES (
    'Reporte de errores de la versión beta',
    NULL, -- La descripción puede ser NULL
    FALSE,
    2 -- ID de 'María Estándar'
);

-- Tarea 3 (Asignada a Admin, ID=1)
INSERT INTO tasks (title, description, is_completed, user_id)
VALUES (
    'Revisar código de autenticación',
    'Verificar la implementación de JWT y el manejo de tokens.',
    TRUE, -- Tarea completada
    1
);

