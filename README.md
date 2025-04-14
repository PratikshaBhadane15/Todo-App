# Todo Application

A modern full-stack Todo application built with React and Express.js, featuring Material-UI for a polished user interface.

## Features

- Create, read, update, and delete todos
- Clean and intuitive Material-UI based interface
- Responsive design
- RESTful API backend
- CORS enabled for secure client-server communication
- Protected routes with authentication
- Automatic redirection to login page for unauthorized access

## Tech Stack

### Frontend
- React 18
- Vite for fast development and building
- Material-UI (MUI) for UI components
- React Router for navigation


### Backend
- Node.js
- Express.js
- CORS middleware for cross-origin requests
- UUID for unique identifiers
- Nodemon for development

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be available at: `http://localhost:5173`

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The server will run on: `http://localhost:3000`

## Sample Login Credentials

For testing purposes, you can use the following credentials:

```
Username: TestUser1
Password: 12345
```

- The `/todo` route is protected and requires authentication. Users will be automatically redirected to the login page if they try to access it without being logged in.


## Project Structure

```
TodoApplication/
├── client/                    # Frontend React application
│   ├── src/                  # Source files
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
└── server/                   # Backend Express application
    ├── routes/              # API routes
    ├── Services/            # Business logic
    ├── app.js              # Express application setup
    └── package.json        # Backend dependencies
```

## Development

- Frontend runs on port 5173
- Backend runs on port 3000
- CORS is configured to allow communication between frontend and backend

## Available Scripts

### Client
- `npm run dev` - Start development server

### Server
- `npm run dev` - Start development server with nodemon


