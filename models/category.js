import mongoose, { Schema, models } from "mongoose";
import Product from "@/models/product";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

categorySchema.pre('findOneAndDelete', async function(next) {
    const category = await this.model.findOne(this.getQuery());
    if (category) {
        // Update all products with this category to have an empty string or null value
        await Product.updateMany(
            { category: category.name }, // Match products by category name
            { $set: { category: "" } }  // Set the category field to an empty string
        );
    }
    next();
});

const Category = models.Category || mongoose.model("Category", categorySchema);
export default Category;
