"use client"
import { useState } from "react"
import Link from "next/link"
import { useSession } from 'next-auth/react';
export default function RegistrationFrom() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const { data: session, status } = useSession();
    console.log(session)
    async function handleForm(e){
        e.preventDefault()
        if(!(name && email && password)){
            console.log("Please enter all the fields")
            return
        }
        try {
            const res = await fetch("api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            })
            if (res.ok) {
                alert("Success")
                // e.target.reset()
            } else {
                alert("Something went wrong")
            }
        } catch (e) {

        }
    }
    return (
        <form onSubmit={handleForm}>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br />
            <input type="mail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button type="submit" value="Submit">Submit </button><br />
            <Link href="/">
                Already have an account?
            </Link>
        </form>
    )
}