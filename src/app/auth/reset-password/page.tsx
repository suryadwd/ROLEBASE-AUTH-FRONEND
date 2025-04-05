"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {

  const [data, setData] = useState({
    email:"",
    otp:"",
    newPassword:""
  })

  const [loading, setLoading] = useState(false)
  const navigate = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log(data)

    try {
      setLoading(true)

      const res = await axios.post(" http://localhost:3009/api/auth/reset-password",data,{withCredentials:true})
      
      console.log(res)

      if(res.data.success){
        navigate.push("/auth/login")
      }

    } catch (error) {
      console.log("error in login route", error)
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="border border-gray-600 flex flex-col items-center justify-center p-5 rounded-2xl">
      <h1 className="text-gray-400 font-bold">Want to reset the password</h1>
      <Input
        className="mt-4"
        placeholder="Email"
        type="email"
        onChange={(e) => setData({...data, email: e.target.value})}
      />
      <Input
        className="mt-4"
        placeholder="new-Password"
        type="text"
        onChange={(e) => setData({...data, newPassword: e.target.value})}
      />
      <Input
        className="mt-4"
        placeholder="OTP"
        type="text"
        onChange={(e) => setData({...data, otp: e.target.value})}
      />
      <Button type="submit"  className="mt-4 bg-green-400 w-fit">{loading? "Loading" : "Submit"}</Button>
      </form>

    </div>
  )
}
