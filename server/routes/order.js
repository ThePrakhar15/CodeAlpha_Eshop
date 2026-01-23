import express from "express";
import authMiddleware from "../middleware/auth.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/" , authMiddleware , async (req, res) =>{
    try{
        const { products, total } = req.body;

        if(!products || products.length === 0){
return res.status(400).json({message:"cart is empty"});
        }
        const order = await Order.create({
            user: req.user.id,
            products,
            total
        });
        res.status(201).json(order);
    }catch(err){
        console.error("Order error", err);
        res.status(500).json({message: "Order fail"});
    }
});

export default router;
