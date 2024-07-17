import mongoose, { Schema, models } from "mongoose";
import Image from "@/models/image";

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
        },
        category:{
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

productSchema.pre('findOneAndDelete', async function(next) {
    const product = await this.model.findOne(this.getQuery());
    await Image.deleteMany({ productId: product._id });
    next();
});

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
