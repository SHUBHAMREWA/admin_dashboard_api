# 🔐 Authentication API for MUI Project

A robust Node.js authentication API built with Express.js, MongoDB, and modern security practices. This API provides complete user authentication functionality including registration, login, and password reset via email OTP.

## ✨ Features

- **User Registration** - Secure user registration with password hashing
- **User Login** - JWT-based authentication system
- **Forgot Password** - Email-based password reset with OTP verification
- **Password Reset** - Secure password update functionality
- **JWT Authentication** - Token-based session management
- **Email Integration** - Nodemailer for sending verification codes
- **Data Validation** - Input validation and error handling
- **Security** - bcryptjs for password hashing, JWT for tokens

## 🛠️ Technologies Used

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer
- **Environment Variables**: dotenv
- **CORS**: Cross-Origin Resource Sharing support
- **Runtime**: Node.js with ES6 modules

## 📁 Project Structure

```
apiForMuiProject/
├── Controller/
│   └── user.js              # User authentication controllers
├── Middleware/
│   ├── Authentication.js    # JWT authentication middleware
│   ├── Email.config.js      # Nodemailer configuration
│   └── Email.js             # Email sending functionality
├── Model/
│   └── User.js              # User schema and model
├── Routes/
│   └── user.js              # API routes
├── templets/
│   └── email.js             # Email template
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Gmail account for email service

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd apiForMuiProject
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017
SECRET_KEY_LOGIN=your_jwt_secret_key_for_login
SECRET_KEY_FOROGT_PASS=your_jwt_secret_key_for_forgot_password
```

### 4. Email Configuration
Update the email configuration in `Middleware/Email.config.js`:

```javascript
auth: {
  user: "your-email@gmail.com",
  pass: "your-app-password", // Gmail App Password
}
```

### 5. Start the Server
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL: `http://localhost:5000/user`

| Method | Endpoint | Description | Body Parameters |
|--------|----------|-------------|-----------------|
| POST | `/register` | Register a new user | `fullname`, `email`, `password`, `mobile` |
| POST | `/login` | User login | `email`, `password` |
| POST | `/reset-password` | Send OTP for password reset | `email` |
| PUT | `/set-passwored` | Reset password with OTP | `password`, `code` |

## 🔧 API Usage Examples

### 1. User Registration
```bash
POST /user/register
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "mobile": "1234567890"
}
```

**Response:**
```json
{
  "message": "user Register Successful",
  "success": true,
  "user": {
    "_id": "...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "CreatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. User Login
```bash
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "success": true
}
```

### 3. Forgot Password (Send OTP)
```bash
POST /user/reset-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Code sent successfully",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Reset Password
```bash
PUT /user/set-passwored
Content-Type: application/json
Authorization: Bearer <token>

{
  "password": "newpassword123",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Password Updated Successful",
  "user": {
    "_id": "...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890"
  },
  "success": true
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 10
- **JWT Tokens**: Secure token-based authentication with configurable expiration
- **Input Validation**: Server-side validation for all user inputs
- **Email Verification**: OTP-based password reset with 5-minute expiration
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Variables**: Sensitive data stored in environment variables

## 📧 Email Integration

The API uses Nodemailer with Gmail SMTP for sending verification codes. Features include:

- HTML email templates with OTP codes
- 5-minute expiration for verification codes
- Professional email formatting
- Error handling for email failures

## 🗄️ Database Schema

### User Model
```javascript
{
  fullname: String (required),
  mobile: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  CreatedAt: Date (default: current timestamp)
}
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:

- Invalid user credentials
- Duplicate email registration
- Missing required fields
- Invalid JWT tokens
- Email sending failures
- Database connection issues

## 🚀 Deployment

### For Production Deployment:

1. **Update Environment Variables:**
   - Use strong JWT secret keys
   - Configure production MongoDB URL
   - Set up production email credentials

2. **Security Considerations:**
   - Enable HTTPS
   - Set up proper CORS configuration
   - Use environment-specific configurations
   - Implement rate limiting

3. **Database:**
   - Use MongoDB Atlas or production MongoDB instance
   - Set up proper database backups
   - Configure connection pooling


## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Shubham Kushwaha**
- Email: kushwahashubham5932@gmail.com
