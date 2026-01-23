import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
        product: [],
        total: Number
    },
    {timestamps:true}
);

export default mongoose.model("order", orderSchema);
