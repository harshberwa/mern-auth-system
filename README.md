# 🔐 MERN Authentication System

A full-stack **MERN Authentication & Authorization system** built with modern best practices.  
This project implements **JWT-based authentication**, **role-based access control**, and **protected routes** for both users and admins.

---

## 🚀 Features

- ✅ User Registration & Login
- 🔐 JWT Authentication (Access Token)
- ♻️ Token persistence using localStorage
- 🛡 Protected Routes (Frontend & Backend)
- 👤 Role-Based Access Control (User / Admin)
- 🧠 Auth Context (React Context API)
- 🔄 Auto logout on token expiry
- 🎨 Clean & responsive UI (Tailwind CSS)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios (with Interceptors)
- Context API
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs


---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
