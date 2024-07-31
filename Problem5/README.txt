### Task Management API
## Overview
This project is a Task Management API built using Express.js, TypeScript, and Sequelize. It supports CRUD operations for tasks with status management.

## Technologies Used
+ Node.js: JavaScript runtime for building scalable network applications.
+ Express.js: Web framework for Node.js.
TypeScript: Superset of JavaScript for static typing.
Sequelize: ORM for Node.js to interact with SQL databases.
MySQL: Relational database management system.
express-validator: Middleware for validating and sanitizing request data.

## Project Setup
# 1. Clone the Repository
`git clone <repository-url>
cd <project-directory>`

# 2. Install Dependencies
`yarn install`

# 3. Setup Environment Variables
Create a .env file in the root directory with the following content:

`DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=task_management
PORT=3000`

# 4. Run docker composer
Start docker: `docker-compose up -d`
Stop docker: `docker-compose stop`

# 5. Run Migrations
Initialize your database schema:
`yarn sequelize db:migrate``

# 6. Start the Application
`yarn start`

### API Endpoints
## 1. Create a Task
+ Endpoint: POST /tasks
+ Request Body:
`{
  "title": "Task title",
  "description": "Task description",
  "status": "pending" // Options: 'pending', 'In-Progress', 'completed'
}`
# Response:
+ 201 Created: Task created successfully.
+ 400 Bad Request: Validation errors.

# 2. Get All Tasks
+ Endpoint: GET /tasks

+ Query Parameters:

- title (optional): Filter tasks by title.
- description (optional): Filter tasks by description.
# Response:
+ 200 OK: List of tasks.

# 3. Get a Task by ID
+ Endpoint: GET /tasks/:id
+ URL Parameters:

- id: ID of the task.
# Response:
+ 200 OK: Task details.
+ 404 Not Found: Task not found.


# 4. Update a Task
+ Endpoint: PUT /tasks/:id
+ URL Parameters:
- id: ID of the task.
# Request Body:
`{
  "title": "Updated title",
  "description": "Updated description",
  "status": "In-Progress" // Options: 'pending', 'In-Progress', 'completed'
}`

# Response:
+ 200 OK: Task updated successfully.
+ 404 Not Found: Task not found.
+ 400 Bad Request: Validation errors.

# 5. Delete a Task
+ Endpoint: DELETE /tasks/:id
+ URL Parameters:
- id: ID of the task.

# Response:
+ 204 No Content: Task deleted successfully.
+ 404 Not Found: Task not found.

# Validation
The API uses express-validator to validate:

- Create Task: Validates title, description, and status.
- Update Task: Validates title, description, and status if provided.
- ID Validation: Ensures id is a positive integer.
- Filters Validation: Validates title and description for GET requests.

# Database Schema
Tasks Table
+ id: INT, Primary Key, Auto Increment
+ title: VARCHAR(255), Not Null
+ description: TEXT
+ status: ENUM('pending', 'In-Progress', 'completed'), Not Null

# Error Handling
+ 400 Bad Request: Validation errors.
+ 404 Not Found: Resource not found.
+ 500 Internal Server Error: Server errors.

# Development Scripts
Start Application: yarn start
- Run Tests: yarn test
- Run Migrations: yarn sequelize db:migrate
- Seed Database: yarn sequelize db:seed:all

# Contribution
Contributions are welcome! Please fork the repository and submit a pull request. Follow the coding style and include tests for any new features.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

