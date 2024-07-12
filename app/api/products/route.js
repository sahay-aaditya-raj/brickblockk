import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import User from "@/models/user";

export async function POST(req) {
    try {
        const id = req.headers.get('Authorization');
        if (id) {
            await connectMongoDB();
            const { name, price, desc } = await req.json();
            console.log(name, price, desc);
            const user = await User.findById(id);
            if (!user) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            await Product.create({ name, price, desc });
            return NextResponse.json({ message: "Success" }, { status: 201 });
        }
        return NextResponse.json({ message: "No header is provided" }, { status: 401 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (id) {
            const product = await Product.findById(id);
            return NextResponse.json({ message: "Data Provided", data: product }, { status: 200 });
        } else {
            const products = await Product.find({});
            return NextResponse.json({ message: "Data Provided", data: products }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, name, price, desc } = await req.json();
        const userId = req.headers.get('Authorization');
        if (userId) {
            await connectMongoDB();
            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, price, desc },
                { new: true, runValidators: true }
            );
            if (!updatedProduct) {
                return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Updated Successfully", data: updatedProduct }, { status: 200 });
        } else {
            return NextResponse.json({ message: "No header is provided" }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}
