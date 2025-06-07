# Task Management API

A RESTful API for managing tasks and users built with **Express.js**, **MongoDB**, and **JWT authentication**.

---

##  Features

- User Registration & Login
- JWT Auth with protected routes
-  CRUD operations for Tasks
-  Input validation (express-validator)
-  Error handling middleware
-  Swagger API Documentation
-  Unit and integration tests (Jest + Supertest)

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Validation:** express-validator
- **Docs:** Swagger (OpenAPI)
- **Testing:** Jest, Supertest
- **Logging:** Morgan

---

##  Project Structure

task-manager-api/
├── config/
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── utils/
├── tests/
├── .env
├── server.js
├── package.json
└── README.md


---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/task-manager-api.git
cd task-manager-api
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file in the root:

env
Copy
Edit
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
4. Run the server
bash
Copy
Edit
npm run dev
-- > Running Tests
bash
Copy
Edit
npm test
 API Documentation
Visit http://localhost:3000/api-docs for full Swagger UI.

✍️ Author
Built by @Jerome - G-Rome Technologies
# task-manager-api
