# 🗃️ Task Manager API

Este repositorio contiene la solución completa de una API para la gestión de tareas, desarrollada bajo el *framework* NestJS.

---

## 📂 Estructura del Proyecto

El repositorio está organizado en dos directorios principales:

* **`Sprint-1/`**: Contiene toda la **documentación, planificación y archivos de configuración de ejemplo** utilizados durante el primer *sprint* de desarrollo. Aquí encontrarás información detallada sobre el entorno de desarrollo, variables de ejemplo, y la guía de contribución.
* **`task-manager-api/`**: Contiene el **código fuente completo** del proyecto Task Manager API.

---

## 🚀 Puesta en Marcha y Uso

### Requisitos Previos

Asegúrate de tener instalados los siguientes componentes:
* Node.js (LTS recomendado)
* Un gestor de paquetes (npm o yarn)
* Una base de datos (PostgreSQL, MySQL, etc., según la configuración del proyecto)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd task-manager-api
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o yarn install
    ```
3.  Configura las variables de entorno utilizando el archivo de ejemplo proporcionado en `Sprint-1`.
4.  Ejecuta la aplicación:
    ```bash
    npm run start:dev
    ```

---

## 🎯 Caso de Uso Principal: Listar Tareas (H-1)

El primer hito de la API es la funcionalidad de listar tareas, la cual requiere **autenticación JWT**.

**Endpoint:** `GET /tasks?page=1&limit=10`

### 🧠 Flujo de Uso Paso a Paso

Para poder acceder a este *endpoint* y a cualquier otra ruta protegida, es necesario obtener un *token* de acceso.

#### 1. Registrar Usuario

Se crea una nueva cuenta de usuario para poder iniciar sesión.

* **Endpoint:** `POST /auth/register`
* **Body (JSON):**
    ```json
    {
      "name": "Andrés Restrepo",
      "email": "andres@test.com",
      "password": "123456"
    }
    ```

#### 2. Iniciar Sesión

Una vez registrado, se solicita el *token* de acceso enviando las credenciales.

* **Endpoint:** `POST /auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "andres@test.com",
      "password": "123456"
    }
    ```
* **Respuesta Esperada (Formato JSON):**
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." 
    }
    ```

#### 3. Consultar las Tareas (Autenticado)

Finalmente, se utiliza el *token* de la respuesta anterior para acceder al *endpoint* protegido.

* **Endpoint:** `GET /tasks?page=1&limit=10`
* **Headers:**
    ```
    Authorization: Bearer <access_token>
    ```

---

## 🎯 Caso de Uso Secundario: Crear Tarea (HU-2)

El segundo hito de la API corresponde a la creación de tareas.  
Esta funcionalidad permite a los usuarios autenticados registrar nuevas tareas con un título y una descripción, asociadas automáticamente a su cuenta.

**Endpoint:** `POST /tasks`  
**Requiere autenticación JWT**

---

### 🧠 Flujo de Uso Paso a Paso

#### 1. Iniciar Sesión (Obtener Token)

Para poder crear tareas, el usuario debe haber iniciado sesión previamente y disponer de un *token* de acceso válido.

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

---

#### 2. Crear una Nueva Tarea

Una vez autenticado, el usuario puede registrar una nueva tarea enviando los datos necesarios.  
El sistema asociará automáticamente la tarea al usuario autenticado.

* **Endpoint:** `POST /tasks`
* **Headers:**
    ```
    Authorization: Bearer <access_token>
    Content-Type: application/json
    ```
* **Body (JSON):**
    ```json
    {
      "title": "Diseñar interfaz del panel de control",
      "description": "Definir layout y componentes principales"
    }
    ```

* **Respuesta Esperada (Formato JSON):**
    ```json
    {
      "success": true,
      "message": "✅ Registro creado correctamente",
      "data": {
        "id": 12,
        "title": "Diseñar interfaz del panel de control",
        "description": "Definir layout y componentes principales",
        "isCompleted": false,
        "userId": 1,
        "createdAt": "2025-11-04T18:40:00.000Z"
      }
    }
    ```

---

### 📘 Ejemplo con `curl`

```bash
curl -X POST http://localhost:3000/tasks \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
-H "Content-Type: application/json" \
-d '{
  "title": "Diseñar interfaz del panel de control",
  "description": "Definir layout y componentes principales"
}'


## 🤝 Contribución

Para información detallada sobre cómo contribuir al proyecto, configurar el entorno de desarrollo y seguir las convenciones de código, consulta la documentación en la carpeta 

**`Sprint-1/`**.