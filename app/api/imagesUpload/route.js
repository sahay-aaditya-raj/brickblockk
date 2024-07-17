import { NextResponse } from "next/server";
import multer from "multer";
import { connectMongoDB } from "@/lib/mongodb";
import Image from "@/models/image";
import User from "@/models/user";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
    api: {
        bodyParser: false
    }
};

export async function POST(req, res) {
    try {
        const userId = req.headers.get('Authorization');
        if (!userId) {
            return NextResponse.json({ message: "No header is provided" }, { status: 401 });
        }

        await connectMongoDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        upload.array('files')(req, {}, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "File upload error" });
            }

            const { productId } = req.body;
            const files = req.files;

            const imagePromises = files.map(file => {
                const { buffer, mimetype } = file;
                return Image.create({
                    productId,
                    image: buffer,
                    contentType: mimetype
                });
            });

            await Promise.all(imagePromises);

            return res.status(201).json({ message: "Images uploaded successfully" });
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}
