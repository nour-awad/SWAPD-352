# Blog System API

A simple RESTful API for managing blog posts and authors. This project uses **PostgreSQL** to store structured author data and **MongoDB** to store unstructured blog post data.

---

## Features

- **Authors**:

  - Create a new author.
  - Fetch all authors.

- **Posts**:
  - Create a new blog post.
  - Fetch all blog posts.
  - Update a blog post.
  - Delete a blog post.

---

## Technologies Used

- **Backend**: Node.js with Express.js
- **Databases**:
  - PostgreSQL (for authors)
  - MongoDB (for posts)
- **Dependencies**:
  - `express`: Web framework for Node.js
  - `pg`: PostgreSQL client for Node.js
  - `mongodb`: MongoDB client for Node.js

---

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js** (v14 or higher)
2. **PostgreSQL** (installed and running)
3. **MongoDB** (installed and running)

---

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nour-awad/SWAPD-352.git
   cd SWAPD-352
   git checkout task-3
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up PostgreSQL**:

   - Create a database named `postgres` (or update the connection string in `blogs.js`).
   - Create the `authors` table:
     ```sql
     CREATE TABLE authors (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL
     );
     ```

4. **Set up MongoDB**:

   - Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017`.
   - The `posts` collection will be created automatically when the first post is added.

5. **Update database credentials**:

   - Open `blogs.js` and update the PostgreSQL connection details if necessary:
     ```javascript
     const pgClient = new Client({
       user: "postgres", // Replace with your PostgreSQL username
       host: "localhost",
       database: "postgres", // Replace with your database name
       password: "123456", // Replace with your PostgreSQL password
       port: 5432,
     });
     ```

6. **Start the server**:

   ```bash
   node blogs.js
   ```

   The server will start on `http://localhost:3000`.

---

## API Endpoints

### Authors

- **Create an Author**:

  ```bash
  POST /authors
  ```

  **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- **Fetch All Authors**:
  ```bash
  GET /authors
  ```

---

### Posts

- **Create a Post**:

  ```bash
  POST /posts
  ```

  **Request Body**:

  ```json
  {
    "title": "My First Post",
    "content": "This is a blog post.",
    "authorId": 1
  }
  ```

- **Fetch All Posts**:

  ```bash
  GET /posts
  ```

- **Update a Post**:

  ```bash
  PUT /posts/:id
  ```

  **Request Body**:

  ```json
  {
    "title": "Updated Title",
    "content": "Updated content.",
    "authorId": 1
  }
  ```

- **Delete a Post**:
  ```bash
  DELETE /posts/:id
  ```

---

## Example Requests

### Create an Author

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Create a Post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "This is a blog post.", "authorId": 1}'
```

### Fetch All Posts

```bash
curl http://localhost:3000/posts
```

### Update a Post

```bash
curl -X PUT http://localhost:3000/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "Updated content.", "authorId": 1}'
```

### Delete a Post

```bash
curl -X DELETE http://localhost:3000/posts/1
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## Author

Nour Awad  
https://github.com/nour-awad  
nour.awad094@gmail.com
