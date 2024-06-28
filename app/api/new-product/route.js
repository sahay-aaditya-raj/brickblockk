import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import User from "@/models/user";

export async function POST(req) {
    try {
        const id = await req.headers.get('Authorization');
        if (id) {
            const { name, price, desc } = await req.json();
            console.log(name, price, desc);
            await connectMongoDB()
            const user = await User.findById(id);
            if(!user.id){
                return NextResponse.json({message:"Unauthorized"}, {status: 401})
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
