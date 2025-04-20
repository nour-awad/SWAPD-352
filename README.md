# Authentication API with Express.js

![Node.js](https://img.shields.io/badge/Node.js-18.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightblue)
![JWT](https://img.shields.io/badge/JWT-Authentication-pink)

A secure authentication and authorization system built with Express.js featuring JWT authentication, role-based access control (RBAC), and password reset functionality.

## Features

- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ JWT authentication with access and refresh tokens
- ✅ Role-based access control (user, moderator, admin)
- ✅ Protected and public routes
- ✅ User profile management
- ✅ Password reset flow
- ✅ Rate limiting for auth routes
- ✅ Persistent storage with lowdb

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Security](#security)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nour-awad/SWAPD-352.git
cd SWAPD-352
git checkout task-6
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables (see [Configuration](#configuration)).

4. Start the server:

```bash
npm start
```

## Configuration

Create a `.env` file with the following variables:

```
JWT_SECRET=your_strong_jwt_secret_here
REFRESH_SECRET=your_strong_refresh_secret_here
PORT=3000
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

**Note:** For Gmail, you may need to:

- Use an App Password if you have 2FA enabled
- Allow less secure apps (not recommended for production)

## API Endpoints

### Authentication

| Endpoint                      | Method | Description              | Access                 |
| ----------------------------- | ------ | ------------------------ | ---------------------- |
| `/api/register`               | POST   | Register a new user      | Public                 |
| `/api/login`                  | POST   | Login with credentials   | Public                 |
| `/api/token`                  | POST   | Refresh access token     | Requires refresh token |
| `/api/logout`                 | DELETE | Invalidate refresh token | Requires refresh token |
| `/api/password-reset/request` | POST   | Request password reset   | Public                 |
| `/api/password-reset/confirm` | POST   | Confirm password reset   | Public                 |

### User Management

| Endpoint                    | Method | Description         | Access        |
| --------------------------- | ------ | ------------------- | ------------- |
| `/api/users/profile`        | GET    | Get user profile    | Authenticated |
| `/api/users/profile`        | PUT    | Update user profile | Authenticated |
| `/api/users/:username/role` | PUT    | Update user role    | Admin only    |

### Protected Routes

| Endpoint         | Method | Description        | Access        |
| ---------------- | ------ | ------------------ | ------------- |
| `/api/public`    | GET    | Public endpoint    | Public        |
| `/api/protected` | GET    | Protected endpoint | Authenticated |
| `/api/moderator` | GET    | Moderator endpoint | Moderator+    |
| `/api/admin`     | GET    | Admin endpoint     | Admin only    |

## Testing

You can test the API using Postman, cURL, or any HTTP client.

### Example Requests

**Register a new user:**

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password1!",
    "role": "user"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Password1!"
  }'
```

**Access protected route:**

```bash
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Project Structure

```
src/
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middlewares/          # Express middlewares
├── models/               # Database models
├── routes/               # Route definitions
├── services/             # Business logic services
├── utils/                # Utility functions
├── app.js                # Express application
├── server.js             # Server entry point
├── db.json               # Database file (auto-generated)
└── .env                  # Environment variables
```

## Security

This implementation includes several security measures:

- Password hashing with bcrypt
- JWT with short-lived access tokens
- Secure HTTP headers
- Rate limiting on auth endpoints
- Input validation
- Secure error handling
- Refresh token rotation
- Password reset tokens with expiration

For production use, consider adding:

- HTTPS
- CORS restrictions
- More advanced rate limiting
- Logging and monitoring
- Regular security audits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
