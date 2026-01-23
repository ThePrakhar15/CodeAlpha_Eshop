import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

const app =  express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=> res.send("api working"));
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.listen(port, () => {console.log(`server started on Port:${port}`)});