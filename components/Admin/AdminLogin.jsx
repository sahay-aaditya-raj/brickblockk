"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";


export default function AdminLogin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if(!mail){
      setError("Enter Username !")
      return
    }
    if(!password){
      setError("Enter password !")
      return
    }

    const res = await signIn("credentials", {
      username: mail,
      password: password,
      redirect: false
    });

    if (!res.ok) {
      setError("Invalid Credentials !");
    }
  }

  return (
    <div className={' w-screen h-screen flex justify-center'}>
    <div className={'self-center'}>
      <form onSubmit={handleSubmit} className={'p-3 border border-primary rounded'}>
      <input 
        type="text" 
        placeholder="Email" 
        value={mail} 
        onChange={(e) => setMail(e.target.value)}
        className={'my-2 p-1 px-2 border border-sky-500 rounded'}
      /><br />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        className={'my-2 p-1 px-2 border border-sky-500 rounded'}
      /><br />
      <button type="submit" value="Submit" className={'my-2 w-full rounded bg-secondary py-1'}>Submit</button><br/>
      {error && <p className={'bg-error rounded px-2 text-center'}>{error}</p>}
    </form>
    </div>
    </div>
  );
}
