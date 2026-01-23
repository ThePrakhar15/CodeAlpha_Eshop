import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }

    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;