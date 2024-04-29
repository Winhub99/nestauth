"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("Login succesfull! ", response.data);
      router.push("/profile")


    } catch (error: any) {
      console.log("Login Failed!");
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (user.email.length > 0  && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true)
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Login"}</h1>
      
      <label htmlFor="username">Email</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Please enter email'
      />
      <label htmlFor="username">Password</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Please enter password'
      />
      <button onClick={onLogin}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{btnDisabled?"Please Fill data":"Login"}</button>
      <Link href={"/signup"}>Please register.</Link>
    </div>
  )
}

export default page
