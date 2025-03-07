
# E-Library Management System

This is a RESTful API for managing an e-library system. It allows you to perform CRUD operations on books, manage users, and handle borrowing/returning transactions. The application can be used with or without a PostgreSQL database.

---

## Features

- **Book Management**:
  - Get all books
  - Get a book by ID
  - Add a new book
  - Update a book
  - Delete a book

- **User Management**:
  - Get all users
  - Get a user by ID
  - Add a new user
  - Update a user
  - Delete a user

- **Transaction Management**:
  - Borrow a book
  - Return a book
  - View all transactions

- **Database Integration** (Optional):
  - PostgreSQL integration for persistent data storage.

---

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL (optional, for database integration)

---

## Setup Instructions

### 1. Without Database (In-Memory Storage)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nour-awad/SWAPD-352.git
   cd SWAPD-352
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   node main.js
   ```

4. **Test the API**:
   - Use tools like [Postman](https://www.postman.com/) or `curl` to interact with the API.
   - Example:
     ```bash
     # Get all books
     curl http://localhost:3000/books
     ```

---

### 2. With Database (PostgreSQL)

1. **Install PostgreSQL**:
   - Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
   - Set a password for the `postgres` user during installation.

2. **Create a Database**:
   - Open `psql` or a GUI like pgAdmin.
   - Run the following SQL commands:
     ```sql
     CREATE DATABASE elibrary;
     \c elibrary;
     CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL,
       borrowed BOOLEAN DEFAULT false
     );
     ```

3. **Seed Initial Data** (Optional):
   ```sql
   INSERT INTO books (title, author) VALUES
     ('7assan w mor2os', 'Adel Imam'),
     ('el zooga 13', 'Shadia'),
     ('Let it happen', 'Tame Impala');
   ```

4. **Update Database Configuration**:
   - Open `books.js` and update the PostgreSQL connection configuration:
     ```javascript
     const client = new Client({
       user: 'postgres',
       host: 'localhost',
       database: 'elibrary',
       password: '123456', // Replace with your actual password
       port: 5432, // Replace with your port number
     });
     ```

5. **Run the Application**:
   ```bash
   node main.js
   ```

6. **Test the API**:
   - Use tools like Postman or `curl` to interact with the API.
   - Example:
     ```bash
     # Add a new book
     curl -X POST http://localhost:8080/books -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}'
     ```

---

## API Endpoints

### Books
- **GET `/books`**: Get all books.
- **GET `/books/:id`**: Get a book by ID.
- **POST `/books`**: Add a new book.
- **PUT `/books/:id`**: Update a book.
- **DELETE `/books/:id`**: Delete a book.

### Users
- **GET `/users`**: Get all users.
- **GET `/users/:id`**: Get a user by ID.
- **POST `/users`**: Add a new user.
- **PUT `/users/:id`**: Update a user.
- **DELETE `/users/:id`**: Delete a user.

### Transactions
- **GET `/transactions`**: Get all transactions.
- **POST `/transactions/borrow`**: Borrow a book.
- **PUT `/transactions/return/:id`**: Return a book.

---

## Example Requests

### Without Database
```bash
# Get all books
curl http://localhost:8080/books

# Add a new book
curl -X POST http://localhost:8080/books -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}'
```

### With Database
```bash
# Get all books
curl http://localhost:8080/books

# Borrow a book
curl -X POST http://localhost:8080/transactions/borrow -H "Content-Type: application/json" -d '{"userId": 1, "bookId": 1}'
```

---

## Folder Structure

```
e-library/
│
├── no_DB/
│   ├── books.js              # Book-related database queries
│   ├── book_main.js          # Book-related routes
│   ├── book_utils.js         # Book-related functions
│   ├── users.js              # User-related database queries
│   ├── user_main.js          # User-related routes
│   ├── user_utils.js         # User-related functions
│   ├── transactions.js       # Transaction-related database queries
│   ├── transaction_main.js   # Transaction-related routes
│   ├── transaction_utils.js  # Transaction-related functions
│   └── server.js             # Main server file
│
├── DB/
│   ├── books.js              # Book-related database queries
│   ├── users.js              # User-related database queries
│   └── main.js             # Main server file
├── README.md                 # Documentation
├── LICENSE                   # License
├── .gitignore                # Project dependencies
├── node_modules              # Project dependencies
├── package-lock.json         # Project dependencies
└── package.json              # Project dependencies
```

---

## Dependencies

- **Express.js**: Web framework for Node.js.
- **pg**: PostgreSQL client for Node.js.
- **Body-parser**: Middleware to parse request bodies.

Install all dependencies using:
```bash
npm install
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with ❤️ using Node.js, Express.js, and PostgreSQL.

---

Enjoy building and using your e-library management system! 🚀
