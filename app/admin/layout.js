"use client"
import { useSession } from "next-auth/react";
import AdminLogin from "@/components/Admin/AdminLogin";
import { useState, useEffect } from "react";
import SideNav from "@/components/Admin/SideNav";
import TopNav from "@/components/Admin/TopNav";

export default function Layout({children}){
    const { data: session, status } = useSession();
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const updateWidth = () => {
          setWidth(window.innerWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
          window.removeEventListener('resize', updateWidth);
        };
      }, []);
    if(status==="loading"){
        return(
            <div className={'p-5 font-bold text-3xl'}>Loading...</div>
        )
    }
    if(status === "authenticated"){
        if (width>=768){
        return(
            <div className={'bg-background min-h-screen flex'}>
            <SideNav/>
            <div className={'bg-white flex-grow m-2 ms-0 rounded-lg p-4'}>
                {children}
            </div>
            </div>
        )}
        else{
            return(
                <div className={'flex bg-background min-h-screen flex-col'}>
                    <TopNav/>
                    <div className={'flex-grow bg-white m-1 flex-col min-h-full p-2 rounded-md'}>
                        {children}
                    </div>
                </div>
            )
        }
    }
    return(
        <>
            <AdminLogin/>
        </>
    )
}