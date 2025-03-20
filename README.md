# Task Management API

This is a RESTful API for managing tasks, built with Express.js and Sequelize ORM, using PostgreSQL as the database.

## Features
- Create a task
- Retrieve all tasks
- Retrieve a specific task by ID
- Update a task
- Delete a task

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nour-awad/SWAPD-352.git
   cd SWAPD-352
   git checkout task-4
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the database**:
   - Ensure PostgreSQL is installed and running.
   - Update the database credentials in `app.js`.

4. **Run the server**:
   ```bash
   node app.js
   ```

5. **Test the API**:
   - Use a tool like Postman to test the API endpoints.

## API Endpoints

- **POST** `/tasks`: Create a new task.
- **GET** `/tasks`: Retrieve all tasks.
- **GET** `/tasks/:id`: Retrieve a specific task by ID.
- **PUT** `/tasks/:id`: Update a task.
- **DELETE** `/tasks/:id`: Delete a task.

## License
This project is licensed under the MIT License.
