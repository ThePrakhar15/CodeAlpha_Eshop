import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

const app = express();
const port = process.env.PORT || 4000;

// 🔹 Connect DB safely
try {
  await connectDB();
  console.log("MongoDB Connected");
} catch (error) {
  console.error("DB Connection Failed:", error.message);
  process.exit(1); // stop server if DB fails
}

// 🔹 Middlewares
app.use(express.json());

app.use(cors({
  origin: "*", // later restrict to your frontend URL
}));

// 🔹 Routes
app.get('/', (req, res) => res.send("API working"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 🔹 Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// 🔹 Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});