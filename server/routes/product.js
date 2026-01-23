import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, async (req,res) => {
    try{
        const{name,price,description,image} = req.body;
        if(!name || !price ){
            return res.status(400).json({message:"Name and Price required"});
        }
        const product = await Product.create({
            name,
            price,
            description,
            image,
            user: req.user.id
        });
        res.status(201).json(product);
    }catch(error){
        console.error("Product create error",error);
        res.status(500).json({message:"server error"});
    }
});

router.get("/my", authMiddleware , async(req, res)=>{
    try{
        const products = await Product.find({user:req.user.id}).sort({createdAt:-1});
        res.json(products);
    }catch(error){
        console.error("my products error", error);
        res.status(500).json({message:"server error"});
    }
});
router.get("/", async (req,res)=> {
try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1)*limit;
    const search = req.query.search || "";
    const filter = {
        name : {$regex: search, $options:"i"}
    };
    const products = await Product.find(filter).sort({ createdAt: -1}).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);
    res.json({ 
        page, 
        totalPage: Math.ceil(total/ limit),
        totalProducts: total,
        products
    });
}catch(error){
    console.error("Product fetch error", error);
    res.status(500).json({message:"server error"});
}
});
router.get("/:id", async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.json(product);
    }catch(error){
        console.error("Single product fetch error", error);
        res.status(500).json({message:"Server error"});
    }
});
router.put("/:id", authMiddleware, async (req,res) =>{
    try{
        const product = await Product.findOne({
            _id:req.params.id,
            user: req.user.id
        });
        if(!product){
            return res.status(404).json({message:"Not found or not authorized"});
        }
        const allowedFields=["name","price","description","image"];
        allowedFields.forEach(field => {
            if(req.body[field] !== undefined){
                product[field] = req.body[field];
            }
        });
        await product.save();
        res.json(product);
    }catch(err){
        console.log("update error", err);
        res.status(500).json({message: "Server error"});
    }
});
router.delete("/:id" , authMiddleware, async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(404).json({message:"Product not found"});
            }
            if(product.user.toString() !== req.user.id){
                return res.status(403).json({message: "not authorized"});
            }
            await product.deleteOne();
            res.json({message:"Product deleted"});
    }catch(error){
        console.error("Delete error", error);
        res.status(500).json({message:"Server error"});
    }
});
export default router;