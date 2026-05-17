# Smart Student Expense Tracker

## 📌 Project Title

Smart Student Expense Tracker

---

# 📖 Problem Description

Many students struggle to manage their daily expenses and monthly budgets.  
Without proper expense tracking, students often overspend and fail to understand where their money goes.

Common problems include:
- Poor financial management
- Lack of budgeting habits
- No expense tracking system
- Difficulty analyzing spending patterns

---

# 💡 Proposed Solution

The Smart Student Expense Tracker is a full-stack MERN application designed to help students manage their finances effectively.

The system provides:
- Secure user authentication
- Expense tracking system
- Monthly budget management
- Expense summaries and reports
- Interactive dashboard with charts

Students can easily:
- Add and manage transactions
- Track monthly spending
- Compare expenses against budgets
- View categorized expense analytics

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

## 💰 Transaction Management
- Add Transactions
- View Transactions
- Update Transactions
- Delete Transactions
- Categorize Expenses

## 📊 Budget Management
- Set Monthly Budget
- Update Budget
- Track Spending vs Budget

## 📈 Reports & Analytics
- Expense Summary
- Category Breakdown
- Monthly Reports
- Charts using Recharts

## 🎨 Frontend
- Responsive React UI
- React Router Navigation
- Dashboard Interface

---

# 🛠 Technologies Used

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Recharts

## Tools
- Postman
- MongoDB Compass
- GitHub

---

# 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/transactions` | Bearer Token | Create transaction |
| GET | `/api/transactions` | Bearer Token | Get all transactions |
| GET | `/api/transactions/summary` | Bearer Token | Get summary |
| GET | `/api/transactions/:id` | Bearer Token | Get one transaction |
| PUT | `/api/transactions/:id` | Bearer Token | Update transaction |
| DELETE | `/api/transactions/:id` | Bearer Token | Delete transaction |
| POST | `/api/budgets` | Bearer Token | Create budget |
| GET | `/api/budgets` | Bearer Token | Get budgets |
| GET | `/api/budgets/status?month=2026-05` | Bearer Token | Budget status |
| PUT | `/api/budgets/:id` | Bearer Token | Update budget |

---

# 📬 API Examples

## 🔹 Register User

### POST `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## 🔹 Login User

### POST `/api/auth/login`

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🔹 Create Transaction

### POST `/api/transactions`

Headers:

```bash
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "title": "Lunch",
  "amount": 500,
  "category": "Food",
  "type": "expense",
  "date": "2026-05-17"
}
```

---

## 🔹 Create Budget

### POST `/api/budgets`

```json
{
  "month": "2026-05",
  "amount": 20000
}
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/choaticvoyager/IT2234-Project-Assignment-Smart-Student-Expense-Tracker.git
```
---

## 2️⃣ Go to Backend Folder

```bash
cd smart-student-expense-tracker/backend
```

---

## 3️⃣ Install Backend Dependencies

```bash
npm install
```

---

## 4️⃣ Create `.env` File

Create a `.env` file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 🚀 How to Run the Project

# ▶️ Start MongoDB

```bash
mongod
```

---

# ▶️ Open Mongo Shell

```bash
mongosh
```

Type:

```bash
exit
```

---

# ▶️ Start Backend Server

Inside backend folder:

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# ▶️ Create Frontend

Open a new terminal from project root:

```bash
npm create vite@latest frontend -- --template react
```

---

# ▶️ Go to Frontend Folder

```bash
cd frontend
```

---

# ▶️ Install Frontend Dependencies

```bash
npm install
npm install react-router-dom
npm install recharts
npm install axios
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 📮 Postman Collection

```bash
postman/New Collection.postman_collection.json
```

---

# 📷 Screenshots

```bash
Screenshots/
```

Example screenshots:
- Login Page
- Dashboard
- Transactions Page
- Budget Overview
- Expense Charts

---

# 👨‍💻 Author

Your Name: MSFZ. Deena 
Student ID: 2022/ICT/68

---