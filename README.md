# Task Management Frontend Documentation

Welcome to the Task Management Frontend documentation. This application is implemented using React.js, React Router and Tailwind CSS.

## Introduction

The Task Management App is a user-friendly tool designed to assist you in organizing and tracking tasks efficiently. It employs a tech stack comprising React.js for building interactive user interfaces, React Router for seamless navigation, and Tailwind CSS for styling.

## Features

- **User Authentication:** The Task Management App allows users to create accounts, log in and securely authenticate their identity.

- **CRUD Functionality:**

  - **User CRUD:**

    - Create a new user account
    - Read user information
    - Update user details

  - **Todo CRUD:**
    - Create a new todo
    - Read todo details
    - Update todo information
    - Delete a todo

## Usage

1. **User Account:**

   - Create a new account by navigating to the registration page.
   - Log in with your credentials on the login page.
   - Update your account details on the user profile page.

2. **Todos:**
   - Create a new todo on the dashboard.
   - View and update todo details by clicking on the todo.
   - Delete a todo when it's completed or no longer needed.

## API Endpoints

The following API endpoints are available for interacting with user and todo data:

- **User Endpoints:**

  - `POST /api/v1/users`: Create a new user.
  - `GET /api/v1/users/:id`: Retrieve user information.
  - `PUT /api/v1/users/:id`: Update user details.

- **Todo Endpoints:**
  - `POST /api/v1/tasks`: Create a new todo.
  - `GET /api/v1/tasks/:id`: Retrieve todo details.
  - `PUT /api/v1/tasks/:id`: Update todo information.
  - `DELETE /api/v1/tasks/:id`: Delete a todo.


### Live Link: https://mahmud-todo-app.vercel.app/

## Backend Integration

While this documentation primarily covers the frontend, it's essential to note that the Task Management App integrates with a backend system. The backend leverages Node.js for server-side logic, Express.js for routing, and MongoDB for efficient data storage.

For details on the backend architecture, please refer to the corresponding backend documentation.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmud-bhuiyan/SJI-task-manager-API
   ```

2. **Install dependencies:**

   ```bash
   cd SJI-task-manager-API
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

-

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or accessible remotely

## Getting Started

To run the Task Management Frontend locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmud-bhuiyan/SJI-task-manager-frontend.git
   ```

2. **Install dependencies:**

   ```bash
   cd SJI-task-manager-frontend
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   or
   npm run dev
   ```

   Access the application in a web browser at `http://localhost:3000/ or http://localhost:5173/`.

## Libraries Used

### Frontend

- **React**
- **React Router**
- **Tailwind**
- **Daisy UI**

### Server

- **Node**
- **Express**
- **MongoDB**

### Used Packages

- **Axios**
- **React Hook Form**
- **React Icons**

## The END

Many Thanks to `SJ Innovation` and `Project MearnifyU Team` For Your Support!
