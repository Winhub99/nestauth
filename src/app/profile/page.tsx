"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [data , setData]= useState("")
  const router = useRouter()
  
  const getUserDetails=async ()=>{
  try {
     const res= await axios.post("/api/users/me")
     console.log(res.data.data._id);
     setData(res.data.data._id)
  } catch (error:any) {
    console.log(error.message)
  }
   
  }

  const logoutUser = async()=>{
    try{
     const res= await axios.post("/api/users/logout")
     toast.success("LOgout successfull")
     console.log(res)
     router.push("/login")
     
    }catch(error:any){
        console.log(error.message);
        toast.error(error.message)
        
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h2>profile Page</h2>
      <br />
      <h2>{data=== ""?"No Data available":(<Link href={`/profile/${data}`}>{data}</Link>)}</h2>
      <hr />
      <button
       onClick={logoutUser}
       className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       >Logout</button>
          <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
    </div>
  )
}

 
