"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession, signOut } from 'next-auth/react';

export default function LoginForm() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  console.log("Session:", session);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: mail,
      password: password,
      redirect: false
    });

    if (!res.ok) {
      alert('Wrong');
    } else {
      alert('Logged in successfully');
      console.log("Logged in session:", session);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Email" 
        value={mail} 
        onChange={(e) => setMail(e.target.value)}
      /><br />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit" value="Submit">Submit</button><br/>
      {session && <button onClick={signOut}>Logut</button>}
    </form>
  );
}
