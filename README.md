# E-Library Management System

This is a RESTful API for managing an e-library system. It allows you to perform CRUD operations on books. The application can be used with or without a **MongoDB** database.

---

## Features

- **Book Management**:
  - Get all books
  - Get a book by ID
  - Add a new book
  - Update a book
  - Delete a book

- **Database Integration** (Optional):
  - MongoDB integration for persistent data storage.

---

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (optional, for database integration)

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
     curl http://localhost:3000/book
     ```

---

### 2. With Database (MongoDB)

1. **Install MongoDB**:
   - Download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
   - Start the MongoDB server (e.g., using `mongod`).

2. **Create a Database**:
   - Open the MongoDB shell or a GUI like MongoDB Compass.
   - Create a new database called `elibrary`:
     ```bash
     use elibrary
     ```

3. **Update Database Configuration**:
   - Open `books.js` and update the MongoDB connection configuration:
     ```javascript
     const { MongoClient } = require('mongodb');

     const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

     let db;

     const connectDB = async () => {
       try {
         await client.connect();
         db = client.db('elibrary');
         console.log('Connected to MongoDB');
       } catch (err) {
         console.error('Error connecting to MongoDB:', err);
       }
     };

     connectDB();
     ```

4. **Run the Application**:
   ```bash
   node main.js
   ```

5. **Test the API**:
   - Use tools like Postman or `curl` to interact with the API.
   - Example:
     ```bash
     # Add a new book
     curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}'
     ```

---

## API Endpoints

### Books
- **GET `/books`**: Get all books.
- **GET `/books/:id`**: Get a book by ID.
- **POST `/books`**: Add a new book.
- **PUT `/books/:id`**: Update a book.
- **DELETE `/books/:id`**: Delete a book.

---

## Example Requests

### Without Database
```bash
# Get all books
curl http://localhost:3000/book

# Add a new book
curl -X POST http://localhost:3000/book -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}'
```

### With Database
```bash
# Get all books
curl http://localhost:3000/books

# Add a new book
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}'
```

---

## Folder Structure

```
e-library/
│
├── no_DB/
│   ├── book.js               # Book-related in-memory operations
│   ├── utils.js              # Book-related functions
│   └── main.js               # Main server file
│
├── DB/
│   ├── books.js              # Book-related MongoDB queries
│   └── main.js               # Main server file
│
├── README.md                 # Documentation
├── LICENSE                   # License
├── .gitignore                # Git ignore file
├── node_modules              # Project dependencies
├── package-lock.json         # Dependency lock file
└── package.json              # Project dependencies
```

---

## Dependencies

- **Express.js**: Web framework for Node.js.
- **MongoDB**: MongoDB client for Node.js.
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

- Built with ❤️ using Node.js, Express.js, and MongoDB.

---

Enjoy building and using your e-library management system! 🚀
