# 🛒 E-Shop — MERN E-Commerce Web App

A full-stack e-commerce web application built using the MERN stack.  
Users can browse products, view product details, add items to cart, and place orders after login.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login with JWT authentication
- Protected routes using middleware

### 🛍 Products
- Product listing with pagination
- Product detail page
- Search functionality
- Products stored in MongoDB

### 🛒 Cart & Orders
- Add to cart
- Remove from cart
- Cart total calculation
- Place order (requires login)

### 🎨 UI
- Responsive design (mobile + desktop)
- Clean product grid layout
- Product recommendation section
- Styled login and register pages

---

## 🧑‍💻 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Atlas)

### Authentication
- JWT (JSON Web Token)
- bcrypt for password hashing

---

## ⚙️ How to Run Locally

### 🔹 Backend Setup

1. Go to backend folder
   ```bash
   cd server
2. Install dependencies

     npm install


3. Create .env file

   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key


4. Start server

   npm start


   Server will run on:

   http://localhost:4000

🔹 Frontend Setup

Open client folder

Open index.html using Live Server or browser

Make sure backend is running

🔹Security Notes

Passwords are hashed using bcrypt

JWT is required for protected routes

Orders can only be placed by logged-in users

## 📌 Future Improvements

- Admin dashboard for product management (add, edit, delete products)
- Product categories and advanced filters
- User order history and tracking
- Payment gateway integration (Razorpay / Stripe)
- Product reviews and ratings system
- AI-based product recommendation system to suggest best products
  based on user behavior, search history and cart items


## Author

Prakhar Sharan
Computer Science Student
MERN Stack Developer 
