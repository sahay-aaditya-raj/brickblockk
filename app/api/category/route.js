import { NextResponse } from "next/server";
import User from "@/models/user";
import Category from "@/models/category";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req, res){
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
        const { category } = await req.json()
        await Category.create({ name: category })
        return NextResponse.json({ message: "Success" }, { status:200 })
    } catch(error){
        console.log(error)
        return NextResponse.json({message: "Server Issue"}, {status:500})
    }
}

export async function GET(req, res){
    try{
        await connectMongoDB()
        const categories = await Category.find({})
        return NextResponse.json({message:"Success", data: categories}, { status:200 })
    } catch( erorr ){
        console.log(error)
        return NextResponse.json({message: "Server Issue"}, {status:500})
    }
}

export async function DELETE(req, res){
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
        const { categoryId } = await req.json()
        
        await Category.deleteOne({_id:categoryId})
        return NextResponse.json({ message: "Success" }, { status:200 })
    } catch(error){
        console.log(error)
        return NextResponse.json({message: "Server Issue"}, {status:500})
    }
}