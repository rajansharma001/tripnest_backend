# TripNest Backend

The backend of **TripNest**, built with Node.js and Express, providing secure APIs for user authentication, and trip planning.

## 🚀 Features

- JWT-based Authentication
- Role-based Access Control (Admin/User)
- MongoDB Database with Mongoose
- Error handling and validation middleware
- Secure password hashing with bcrypt

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password encryption
- **dotenv** for environment variables

## 📂 Folder Structure

```
tripnest_backend/
│── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth & role verification
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── app.ts          # Entry point
│── package.json
```

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/rajansharma001/tripnest_backend.git
   cd tripnest_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret
   ```
4. Run the server:
   ```bash
   npm run dev
   ```
