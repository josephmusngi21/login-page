# 🚀 React Authentication App

This is a full-stack authentication app built with **React** (frontend) and **Express** (backend). It includes a complete registration and login system with password validation, email checking, and MySQL database integration.

## 🏗️ Project Structure

```
login-page/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.jsx   # Login form component
│   │   │   ├── Register.jsx # Registration form component
│   │   │   ├── Card.jsx    # UI card component
│   │   │   └── utils/      # Utility functions
│   │   │       ├── EmailValidation.jsx
│   │   │       ├── LoginValidation.jsx
│   │   │       ├── PasswordValidation.jsx
│   │   │       ├── UserContext.jsx
│   │   │       └── UserProvider.jsx
│   │   └── styles/         # CSS modules
│   └── package.json
└── server/                 # Express backend API
    ├── server.js          # Main server file
    └── package.json
```

## 🎯 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MySQL** (for database)

### 🛠️ Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/josephmusngi21/login-page.git
   cd login-page
   ```

2. **Install server dependencies**
   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```sh
   cd ../client
   npm install
   ```

### ⚙️ Configuration

1. **Database Setup**
   - Ensure MySQL is installed and running on your machine
   - The application will automatically create a database named `testServer`
   - Default connection settings:
     - Host: `localhost`
     - User: `root`
     - Password: `` (empty)
     - Port: `3306` (default MySQL port)

2. **Environment Variables** (Optional)
   - You can create a `.env` file in the server directory for custom database configuration

### 🚀 Running the Application

1. **Start the backend server**
   ```sh
   cd server
   npm start
   ```
   The server will run on `http://localhost:4000`

2. **Start the frontend client** (in a new terminal)
   ```sh
   cd client
   npm start
   ```
   The React app will run on `http://localhost:3000`

### 🎮 Usage

The application consists of two main parts:

#### 🖥️ Frontend (React Client)

**Components:**
- **Register Component**: Allows new users to create accounts with comprehensive validation
  - Email format validation
  - Password strength checking (requires uppercase letter and other characters)
  - Password confirmation matching
  - Duplicate email prevention
- **Login Component**: Enables user authentication with email and password
- **Card Component**: Reusable UI component for consistent styling
- **Validation Utilities**: Modular validation functions for email and password

**Key Features:**
- React Router for navigation
- Axios for API communication
- CSS Modules for component styling
- Context API for state management

#### ⚙️ Backend (Express Server)

**API Endpoints:**
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /users` - Retrieve user data
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user accounts

**Server Features:**
- **MySQL Database Integration**: Automatic database and table creation
- **Password Security**: BCrypt hashing with salt rounds
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Server-side validation for all endpoints
- **Error Handling**: Comprehensive error responses

**Database Schema:**
```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔧 Dependencies

#### Client Dependencies
- `react` & `react-dom` - Core React framework
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls
- `react-scripts` - React development tools

#### Server Dependencies
- `express` - Web framework for Node.js
- `mysql` - MySQL database driver
- `bcrypt` - Password hashing
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `nodemon` - Development server auto-restart

### 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using BCrypt before storage
- **Input Validation**: Both client and server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin access

### 🤝 Contributing

Any contributions you make are greatly appreciated.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### � Available Scripts

#### Client Scripts
- `npm start` - Runs the React development server
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from create-react-app (irreversible)

#### Server Scripts
- `npm start` - Starts the Express server with nodemon
- `npm test` - Runs tests (currently not implemented)

### 🐛 Troubleshooting

**Common Issues:**

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check connection credentials in `server.js`
   - Verify MySQL port (default: 3306)

2. **CORS Errors**
   - Make sure the server is running on port 4000
   - Check that CORS is enabled in `server.js`

3. **Module Not Found**
   - Run `npm install` in both client and server directories
   - Clear node_modules and reinstall if needed

### 📞 Contact

**Joseph Musngi** - josephmusngi7@gmail.com

Project Link: [https://github.com/josephmusngi21/login-page](https://github.com/josephmusngi21/login-page)
