# Fitness Tracker Application

Personal learning project created on 2024-06-24.

A full-stack fitness tracker with a Go Fiber backend and a React frontend. The application allows users to sign up, log in, view their profile, add workout activity entries, and navigate through dashboard-style pages for home, goals, achievements, and activity tracking.

## Overview

This project is split into two main parts:

- Backend: Go API using Fiber, GORM, MySQL, JWT authentication, and bcrypt password hashing
- Frontend: React app using React Router and Bootstrap styling

The frontend communicates with the backend on localhost:8000, while the app itself is served from localhost:3000.

## Architecture

### Backend

The backend is located in the [backend](backend) directory and is built around a simple layered structure:

- [main.go](backend/main.go): Starts the Fiber app, enables CORS for http://localhost:3000, and listens on port 8000.
- [routes/routes.go](backend/routes/routes.go): Defines API endpoints for authentication and activity management.
- [controllers/authController.go](backend/controllers/authController.go): Handles signup, login, user lookup, logout, and user update flows.
- [controllers/activityController.go](backend/controllers/activityController.go): Handles adding activities and fetching activities by user.
- [models/user.go](backend/models/user.go): Defines the User and Activity data models.
- [database/connection.go](backend/database/connection.go): Loads environment variables and opens a MySQL connection using GORM.

### Frontend

The frontend is located in the [frontend](frontend) directory and uses a React/React Router layout:

- [frontend/src/App.js](frontend/src/App.js): Sets up all application routes.
- [frontend/src/components/Login/Login.js](frontend/src/components/Login/Login.js): Login page with email/password validation.
- [frontend/src/components/Signup/Signup.js](frontend/src/components/Signup/Signup.js): Registration form with validation.
- [frontend/src/components/Home/Home.js](frontend/src/components/Home/Home.js): Displays a welcome message with the currently logged-in user.
- [frontend/src/components/Activity/Activity.js](frontend/src/components/Activity/Activity.js): Fetches and displays activities for the current user and allows adding a new activity.
- [frontend/src/components/Goals/Goals.js](frontend/src/components/Goals/Goals.js): Goal-setting UI scaffold with a modal form and static sample goal card.
- [frontend/src/components/Achivements/Achivements.js](frontend/src/components/Achivements/Achivements.js): Achievement view with a static card example.
- [frontend/src/components/Profile/Profiles.js](frontend/src/components/Profile/Profiles.js): Profile page showing user details and fullname update flow.
- [frontend/src/components/Navbar/Navbar.js](frontend/src/components/Navbar/Navbar.js): Shared navigation and logout button.

## Features

### Authentication and user management

The backend implements these user-related endpoints:

- POST /api/signup
  - Creates a new user record
  - Hashes the password using bcrypt
- POST /api/login
  - Validates email/password
  - Generates a JWT and sets it in a cookie named jwt
- GET /api/user
  - Reads the JWT from the cookie and returns the current user
- POST /api/logout
  - Clears the jwt cookie
- PUT /api/updateUser/:id
  - Updates the user fullname for the given user ID

### Activity tracking

- POST /api/addActivity
  - Creates a new activity record
- GET /api/getActivity/:id
  - Returns all activities for a given user ID

The frontend supports:

- login with email and password validation
- signup with fullname, email, password, and confirm password validation
- navigation between Home, Activities, Goals, Achievements, and Profile
- fetching the authenticated user and their activity log
- saving a new activity using a modal form
- updating the user's fullname from the profile page

## Tech Stack

### Backend

- Go 1.22.3
- Fiber v2
- GORM
- MySQL driver
- JWT (dgrijalva/jwt-go)
- bcrypt via golang.org/x/crypto/bcrypt
- godotenv for environment configuration

### Frontend

- React 18
- React Router DOM
- Bootstrap
- React Bootstrap
- Axios
- Validator.js
- date-fns
- react-icons

## Environment Variables

The backend expects a .env file in the [backend](backend) directory. The template is provided in [backend/.env.example](backend/.env.example):

```env
DB_USER=root
DB_PASSWORD=your_password_here
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=fitnessdb
```

The actual project environment file present in the repository is [backend/.env](backend/.env), which currently contains:

```env
DB_USER=root
DB_PASSWORD=Master#123
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=fitnessdb
```

The backend also uses a hard-coded JWT secret in [backend/controllers/authController.go](backend/controllers/authController.go):

```go
const SecretKey = "secret"
```

## Database

The project uses MySQL with GORM. The connection string is built in [backend/database/connection.go](backend/database/connection.go) using the values from the environment variables:

```go
"%s:%s@tcp(%s:%s)/%s?parseTime=true"
```

The database name configured in the project is fitnessdb.

## Project Structure

```text
fitness-tracker-application/
├── .gitignore
├── README.md
├── backend/
│   ├── .env
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
        ├── index.css
        └── index.js
```

## Running the Project

### 1. Start the backend

From the backend directory:

```bash
cd backend
go mod download
go run main.go
```

This starts the API on port 8000.

### 2. Start the frontend

From the frontend directory:

```bash
cd frontend
npm install
npm start
```

This starts the React app on http://localhost:3000.

## Notes on the Current Implementation

- The frontend and backend are configured to run together locally and expect a MySQL database to be available.
- The JWT token is stored in a cookie named jwt and sent with credentials in requests.
- Some UI sections such as Goals and Achievements are present but do not yet have matching backend storage or APIs; they appear as static/demo screens.
- The app is using CORS to allow requests from http://localhost:3000 only.

## Important Runtime Behavior

- The backend uses `app.Use(cors.New(cors.Config{ AllowOrigins: "http://localhost:3000", AllowCredentials: true }))` in [backend/main.go](backend/main.go).
- The frontend calls the backend using Axios with `withCredentials: true` for authenticated requests.
- If the backend is not running or MySQL is unavailable, the app will fail at runtime during API calls or startup.
