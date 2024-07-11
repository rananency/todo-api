---

# TODO API

A simple TODO API using Node.js, Express, and MySQL.

## Features

- CRUD Operations (Create, Read, Update, Delete) for TODO items.
- Pagination for listing TODO items.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MySQL Server

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/rananency/todo-api.git
   cd todo-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure MySQL:
   
   - Create a MySQL database (e.g., `todo_db`).
   - Update MySQL configuration in `config/database.js` with your credentials.

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3000`.

## API Endpoints

- **POST /api/todos**: Create a new TODO item.
- **GET /api/todos**: Retrieve TODO items with pagination.
- **PUT /api/todos/:id**: Update a TODO item by ID.
- **DELETE /api/todos/:id**: Delete a TODO item by ID.
