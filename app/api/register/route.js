import { NextResponse } from "next/server";
import dbConnect, { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        // Parse request body
        const { name, uname, password, date, sex } = await req.json();
        
        // Connect to MongoDB
        await connectMongoDB();
        // Hash the passworp
        // const users = await User.find({uname:uname})
        // if(users){
        //     return NextResponse.json({message: "User Already Exsists"}, {status: 400})
            
        // }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(uname, name, password, date, sex)
        
        await User.create({ name, uname, password: hashedPassword, dateOfBirth: date, sex: sex});
        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (e) {
        // Log the error for debugging
        console.error("Error creating user:", e);

        // Return error response with detailed message
        return NextResponse.json({ message: "Error creating user", error: e.message }, { status: 500 });
    }
}
