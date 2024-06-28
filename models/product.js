import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
