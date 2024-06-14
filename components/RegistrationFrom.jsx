"use client"
import { useState } from "react"
import Link from "next/link"
import { useSession } from 'next-auth/react';
export default function RegistrationFrom() {

    const [formData, setFormData] = useState({
        name: "",
        uname: "",
        password: "",
        date: "",
        sex: "Male"
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    

    async function handleForm(e){
        e.preventDefault()
        if(!(formData.name && formData.uname && formData.password && formData.sex && formData.date)){
            console.log("Please enter all the fields")
            return
        }
        try {
            const res = await fetch("api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                alert("Success")
                // e.target.reset()
            } else {
                alert(res.status)
            }
        } catch (e) {

        }
    }
    return (
        <form onSubmit={handleForm}>
            
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            /><br />

            <label htmlFor="uname">Username:</label>
            <input
                type="text"
                id="uname"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                required
            /><br />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            /><br />

            <label htmlFor="date">Date of Birth:</label>
            <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            /><br />

            <label htmlFor="sex">Sex:</label>
            <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select><br />

            <button type="submit">Submit</button>
            <Link href="/">
                Already have an account?
            </Link>
        </form>
    )
}