"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession, signOut } from 'next-auth/react';
export default function login() {
    const { data: session, status } = useSession();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    if(session){
        return <h1>You are logged in</h1>
    }
  return (
    <>
       hi 
    </>    
  );
}
