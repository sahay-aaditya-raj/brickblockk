import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const id = await req.headers.get('Authorization');
        if (id) {
            const { name, price, desc } = await req.json();
            console.log(name, price, desc);
            return NextResponse.json({ message: "Success" }, { status: 201 });
        }
        return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
