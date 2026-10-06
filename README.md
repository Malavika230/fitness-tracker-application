# Fitness Tracker Application

A personal full-stack learning project built with **Go, Fiber, React, and MySQL**.

The Fitness Tracker application allows users to create an account, log in, view and update their profile, record workout activities, and navigate through dashboard-style pages for home, goals, achievements, and activity tracking.

> **Project status:** Learning project. Some features, including Goals and Achievements, are currently UI/demo implementations without backend persistence.

---

## Features

### Authentication & User Management

* User registration with fullname, email, and password
* Password hashing using bcrypt
* User login with JWT authentication
* JWT stored in an HTTP-only cookie
* Authenticated user lookup
* User logout
* User fullname update
* Frontend form validation

### Activity Tracking

* Add workout/activity entries
* Retrieve activities for a user
* Display activity history
* Add activities through a modal form

### Dashboard

* Home page with logged-in user information
* Activity tracking page
* Goals page
* Achievements page
* Profile page
* Shared navigation bar
* Logout functionality

> **Note:** Goals and Achievements are currently static/demo screens and do not yet have corresponding backend APIs or database persistence.

---

## Tech Stack

### Backend

* **Go 1.22.3**
* **Fiber v2** — HTTP framework
* **GORM** — ORM
* **MySQL** — Database
* **JWT** — Authentication
* **bcrypt** — Password hashing
* **godotenv** — Environment variable loading

### Frontend

* **React 18**
* **React Router DOM**
* **Axios**
* **Bootstrap**
* **React Bootstrap**
* **Validator.js**
* **date-fns**
* **react-icons**

---

## Architecture

The application is split into two main parts:

```text
┌──────────────────────┐
│    React Frontend    │
│   localhost:3000     │
└──────────┬───────────┘
           │
           │ HTTP / Axios
           ▼
┌──────────────────────┐
│    Go + Fiber API    │
│   localhost:8000     │
└──────────┬───────────┘
           │
           │ GORM
           ▼
┌──────────────────────┐
│    MySQL Database    │
│      fitnessdb       │
└──────────────────────┘
```

The frontend communicates with the backend through HTTP requests using Axios.

Authenticated requests use the JWT stored in the `jwt` HTTP-only cookie.

---

## Backend

The backend is located in the [`backend`](backend) directory.

### Main Files

* [`backend/main.go`](backend/main.go) — Creates and starts the Fiber application, configures CORS, and listens on port `8000`.
* [`backend/routes/routes.go`](backend/routes/routes.go) — Defines API routes for authentication and activity management.
* [`backend/controllers/authController.go`](backend/controllers/authController.go) — Handles signup, login, user lookup, logout, and user updates.
* [`backend/controllers/activityController.go`](backend/controllers/activityController.go) — Handles creating and retrieving activity records.
* [`backend/models/user.go`](backend/models/user.go) — Defines the User and Activity data models.
* [`backend/database/connection.go`](backend/database/connection.go) — Loads environment variables and establishes the MySQL connection using GORM.

---

## Frontend

The frontend is located in the [`frontend`](frontend) directory.

### Main Components

* [`frontend/src/App.js`](frontend/src/App.js) — Defines the application's routes.
* [`frontend/src/components/Login/Login.js`](frontend/src/components/Login/Login.js) — Login form with email and password validation.
* [`frontend/src/components/Signup/Signup.js`](frontend/src/components/Signup/Signup.js) — Registration form with fullname, email, password, and confirmation validation.
* [`frontend/src/components/Home/Home.js`](frontend/src/components/Home/Home.js) — Displays a welcome message for the logged-in user.
* [`frontend/src/components/Activity/Activity.js`](frontend/src/components/Activity/Activity.js) — Fetches and displays user activities and allows new activities to be added.
* [`frontend/src/components/Goals/Goals.js`](frontend/src/components/Goals/Goals.js) — Goal-setting UI with a modal form and sample goal content.
* [`frontend/src/components/Achievements/Achievements.js`](frontend/src/components/Achievements/Achievements.js) — Displays achievement information using static/demo content.
* [`frontend/src/components/Profile/Profiles.js`](frontend/src/components/Profile/Profiles.js) — Displays user details and provides fullname update functionality.
* [`frontend/src/components/Navbar/Navbar.js`](frontend/src/components/Navbar/Navbar.js) — Shared navigation and logout functionality.

---

## API Endpoints

### Authentication & User Management

| Method | Endpoint              | Description                                    |
| ------ | --------------------- | ---------------------------------------------- |
| `POST` | `/api/signup`         | Creates a new user and hashes the password     |
| `POST` | `/api/login`          | Validates credentials and creates a JWT cookie |
| `GET`  | `/api/user`           | Returns the currently authenticated user       |
| `POST` | `/api/logout`         | Clears the JWT cookie                          |
| `PUT`  | `/api/updateUser/:id` | Updates the user's fullname                    |

### Activity Tracking

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| `POST` | `/api/addActivity`     | Creates a new activity record   |
| `GET`  | `/api/getActivity/:id` | Retrieves activities for a user |

---

## Prerequisites

Before running the application, make sure you have the following installed:

* [Go](https://go.dev/) 1.22 or later
* [Node.js](https://nodejs.org/) and npm
* [MySQL](https://www.mysql.com/)
* Git

---

## Environment Variables

The backend uses environment variables for database and JWT configuration.

Create a `.env` file inside the [`backend`](backend) directory.

A template is provided in [`backend/.env.example`](backend/.env.example):

```env
DB_USER=root
DB_PASSWORD=your_password_here
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=fitnessdb
JWT_SECRET=your_long_random_secret_here
```

### Environment Variable Reference

| Variable      | Description                    |
| ------------- | ------------------------------ |
| `DB_USER`     | MySQL username                 |
| `DB_PASSWORD` | MySQL password                 |
| `DB_HOST`     | MySQL host                     |
| `DB_PORT`     | MySQL port                     |
| `DB_NAME`     | MySQL database name            |
| `JWT_SECRET`  | Secret used to sign JWT tokens |

> **Security:** Never commit your `.env` file or real credentials to Git. Make sure `.env` is included in `.gitignore`.

---

## Database Setup

The application uses MySQL with GORM.

Create the database before starting the backend:

```sql
CREATE DATABASE fitnessdb;
```

The database connection is configured in [`backend/database/connection.go`](backend/database/connection.go).

The connection string follows this format:

```text
%s:%s@tcp(%s:%s)/%s?parseTime=true
```

The values are populated from the environment variables defined in `.env`.

---

## Running the Project

### 1. Start MySQL

Make sure your MySQL server is running and that the `fitnessdb` database exists.

---

### 2. Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Download the Go dependencies:

```bash
go mod download
```

Start the backend:

```bash
go run main.go
```

The backend API will be available at:

```text
http://localhost:8000
```

---

### 3. Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Authentication

Authentication uses **JWT (JSON Web Tokens)** stored in an HTTP-only cookie named `jwt`.

The login flow works as follows:

```text
User
 │
 │ Email + Password
 ▼
React Frontend
 │
 │ POST /api/login
 ▼
Go/Fiber Backend
 │
 │ Validate credentials
 │
 │ Generate JWT
 ▼
HTTP-only Cookie
 │
 │ Authenticated requests
 ▼
Backend API
```

The JWT signing secret is loaded from the `JWT_SECRET` environment variable.

The frontend uses Axios with credentials enabled for authenticated requests.

For example:

```javascript
axios.get("http://localhost:8000/api/user", {
  withCredentials: true
});
```

---

## CORS Configuration

The backend is configured to accept requests from the local React frontend:

```go
app.Use(cors.New(cors.Config{
    AllowOrigins:     "http://localhost:3000",
    AllowCredentials: true,
}))
```

This allows the frontend running on port `3000` to communicate with the backend running on port `8000`.

---

## Project Structure

```text
fitness-tracker-application/
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── controllers/
│   │   ├── activityController.go
│   │   └── authController.go
│   ├── database/
│   │   └── connection.go
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   ├── models/
│   │   └── user.go
│   └── routes/
│       └── routes.go
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js
        ├── App.css
        ├── components/
        │   ├── Activity/
        │   ├── Achievements/
        │   ├── Goals/
        │   ├── Home/
        │   ├── Login/
        │   ├── Navbar/
        │   ├── Profile/
        │   └── Signup/
        ├── index.css
        └── index.js
```

> If your actual folder is still named `Achivements` instead of `Achievements`, keep the README path consistent with the current project until you rename the component.

---

## Current Limitations

This project is primarily intended for learning and currently has some limitations:

* Goals are currently UI/demo functionality and are not persisted in the database.
* Achievements are currently static/demo content.
* There are no dedicated backend APIs for goals or achievements.
* The application currently expects the backend and MySQL database to run locally.
* CORS is currently configured only for `http://localhost:3000`.
* Production deployment configuration has not been added.
* Error handling and validation can be improved further.
* The application does not currently include automated tests.

---

## Future Improvements

Potential improvements include:

* Add persistent goal management.
* Add an achievements system based on user activity.
* Add activity editing and deletion.
* Add activity categories and workout types.
* Add dashboard statistics and charts.
* Add pagination for activity history.
* Improve loading and error states.
* Add protected frontend routes.
* Improve authentication and authorization.
* Add automated backend and frontend tests.
* Add API documentation.
* Add Docker support.
* Add production deployment configuration.

---

## Learning Objectives

This project was created as a personal learning project on **June 24, 2024**.

The main goals were to practice:

* Go backend development
* Fiber
* REST APIs
* GORM
* MySQL
* JWT authentication
* Password hashing
* React
* React Router
* Axios
* Frontend/backend integration
* Authentication flows
* CRUD-style application development

---

## License

This project is a personal learning project.

A license can be added if the project is later intended for reuse, modification, or distribution.
