"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Home() {

  const [data, setData] = useState({
    email:"",
    password:"",
    phone:""
  })

  const [loading, setLoading] = useState(false)
  const navigate = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log(data)

    try {
      setLoading(true)

      const res = await axios.post("http://localhost:3009/api/auth/login",data,{withCredentials:true})
      console.log(res)
      if(res.data.success){
        navigate.push("/dashboard/home")
      }

    } catch (error) {
      console.log("error in login route", error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="flex items-center justify-center  min-h-screen">
      <div className="border p-8 rounded-2xl">
        <div className="font-bold p-3 mb-2">login for Super-Admin and Admin</div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between gap-5">
        <Input placeholder="email" type="email"  onChange={(e) => setData({...data, email:e.target.value})}/>
        <Input placeholder="password" type="password" onChange={(e) => setData({...data, password:e.target.value})}/>
        <Input placeholder="phone" type="text" onChange={(e) => setData({...data, phone:e.target.value})}/>
        <Button type="submit" className="bg-green-400 w-full hover:bg-green-500">{loading ? "Please wait...":"Submit"}</Button>
        <Link href="./register" className="text-blue-400 hover:text-blue-500">Click to register</Link>
        <p className="text-gray-500 hover:text-gray-400 font-extralight" onClick={() => navigate.push("/auth/forget-password")}>Forget Password? Click me</p>
        </form>
      </div>
    </div>
  )
}

//login ko implement krna hai superadmin admin  ka

