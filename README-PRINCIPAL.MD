# 🗃️ Task Manager API

Este proyecto implementa una **API REST completa para la gestión de tareas**, desarrollada con **NestJS**, **TypeORM** y **JWT**.
Incluye autenticación segura, paginación, validaciones, interceptores globales y control de acceso por usuario.

---

## 📂 Estructura del Proyecto

El repositorio está organizado en dos directorios principales:

* **`Sprint-1/`**: Contiene toda la **documentación, planificación y archivos de configuración de ejemplo** utilizados durante el primer *sprint* de desarrollo. Aquí encontrarás información detallada sobre el entorno de desarrollo, variables de ejemplo, y la guía de contribución.
* **`task-manager-api/`**: Contiene el **código fuente completo** del proyecto Task Manager API.

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalados:
* **Node.js** (versión 18 o superior)
* **npm o yarn** (gestor de paquetes)
* **PostgreSQL** (o la base de datos que configures)
* **Postman** (opcional, para probar los endpoints)

---

## 🚀 Instalación y Ejecución

1.  Clona el repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd task-manager-api
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura el archivo `.env` en la raíz del proyecto (utiliza el archivo de ejemplo proporcionado en `Sprint-1/`):
    ```env
    PORT=3000
    JWT_SECRET=supersecretkey123
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=1234
    DB_NAME=taskdb
    ```

4.  Ejecuta la aplicación:
    ```bash
    npm run start:dev
    ```

---

## 🧩 Autenticación y Autorización (JWT)

La API utiliza autenticación **JWT (JSON Web Token)**. Para acceder a las rutas protegidas, el usuario debe autenticarse primero con `POST /auth/login` y luego enviar el token en cada petición.

### Endpoints de Autenticación

| Función | Método | Endpoint |
| :--- | :--- | :--- |
| **Registro** | `POST` | `/auth/register` |
| **Login** | `POST` | `/auth/login` |

**Uso del Token en Headers:**

---

## ✅ Historias de Usuario Implementadas

Todas las historias requieren autenticación JWT.

| HU | Descripción | Endpoint | Método |
| :--- | :--- | :--- | :--- |
| **HU-1** | Listar tareas paginadas | `/tasks?page=1&limit=10` | `GET` |
| **HU-2** | Crear tarea | `/tasks` | `POST` |
| **HU-3** | Actualizar tarea | `/tasks/:id` | `PUT` |
| **HU-4** | Cambiar estado (toggle) | `/tasks/:id/toggle` | `PATCH` |
| **HU-5** | Eliminar tarea | `/tasks/:id` | `DELETE` |

---

## 🧠 Flujo Completo de Uso

El flujo general para interactuar con la API es siempre: **1. Registrar, 2. Loguearse, 3. Usar el Token.**

### 1. Registrar Usuario

* **Endpoint:** `POST /auth/register`
* **Body (JSON):**
    ```json
    {
      "name": "Andrés Restrepo",
      "email": "andres@test.com",
      "password": "123456"
    }
    ```

### 2. Iniciar Sesión (Obtener Token)

* **Endpoint:** `POST /auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "andres@test.com",
      "password": "123456"
    }
    ```
* **Respuesta Esperada:**
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." 
    }
    ```

### 3. Ejemplo: Crear una Nueva Tarea (HU-2)

Una vez autenticado, el usuario puede registrar una nueva tarea.

* **Endpoint:** `POST /tasks`
* **Headers:** `Authorization: Bearer <access_token>`
* **Body (JSON):**
    ```json
    {
      "title": "Diseñar interfaz del panel de control",
      "description": "Definir layout y componentes principales"
    }
    ```
* **Ejemplo con `curl`:**
    ```bash
    curl -X POST http://localhost:3000/tasks \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Diseñar interfaz del panel de control",
      "description": "Definir layout y componentes principales"
    }'
    ```

---

## 🧪 Pruebas en Postman (Recomendado)

Para automatizar la autenticación, sigue estos pasos:

1.  Abre Postman e importa la colección de *endpoints*.
2.  En la pestaña **“Tests”** del *endpoint* `POST /auth/login`, agrega el siguiente código para guardar el token automáticamente:
    ```js
    pm.environment.set("token", pm.response.json().access_token);
    ```
3.  En los *headers* de las peticiones protegidas (rutas `/tasks`), usa la variable de entorno:
    ```
    Authorization: Bearer {{token}}
    ```
Esto te permitirá ejecutar todas las HU en orden sin copiar y pegar el token manualmente.

---

## 🧠 Resumen Técnico

| Tecnología | Uso |
| :--- | :--- |
| **NestJS** | Framework principal |
| **TypeORM** | ORM y manejo de entidades |
| **PostgreSQL** | Base de datos |
| **JWT + Passport** | Autenticación y protección de rutas |
| **Class-Validator** | Validación de DTOs |
| **Interceptors** | Estandarización de respuestas |
| **Guards** | Control de acceso por token |
| **ConfigModule** | Manejo de variables de entorno |

> 🎉 Proyecto 100% funcional, seguro y listo para producción o despliegue.

---

## 🤝 Contribución

Para información detallada sobre cómo contribuir al proyecto, configurar el entorno de desarrollo y seguir las convenciones de código, consulta la documentación en la carpeta 

**`Sprint-1/`**.