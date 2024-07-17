import mongoose, { Schema, models } from "mongoose";

const imageSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        image: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Image = models.Image || mongoose.model("Image", imageSchema);
export default Image;
