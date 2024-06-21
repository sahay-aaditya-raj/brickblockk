"use client"
import { useSession } from "next-auth/react";
import AdminLogin from "@/components/Admin/AdminLogin";

import SideNav from "@/components/Admin/SideNav";

export default function Layout({children}){
    const { data: session, status } = useSession();
    console.log(session)
    if(status==="loading"){
        return(
            <div className={'p-5 font-bold text-3xl'}>Loading...</div>
        )
    }
    if(status === "authenticated"){
        return(
            <div className={'bg-background min-h-screen flex'}>
            <SideNav/>
            <div className={'bg-white flex-grow m-2 ms-0 rounded-lg p-4'}>
                {children}
            </div>
            </div>
        )
    }
    return(
        <>
            <AdminLogin/>
        </>
    )
}