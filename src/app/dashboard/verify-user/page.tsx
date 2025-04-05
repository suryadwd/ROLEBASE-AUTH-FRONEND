"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    phone: "",
    otp:""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useRouter()

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    console.log(data)

    try {
      setLoading(true)

      const res = await axios.post("http://localhost:3009/api/auth/verify-register", data,{withCredentials:true})
      
      console.log(res)

      if(res.data.success){
        navigate.push("/dashboard/home")
      }

    } catch (error) {
      console.log( {message: "error while in the registering the new user"} , error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" border p-8 rounded-2xl">
       <div className="text-4xl font-bold p-3">Verify the Credintials...</div> 
        <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-4 mt-2">
          <Input placeholder="name" type="text" onChange={e => setData({...data, name: e.target.value}) } className="text-white " />
          <Input placeholder="userName" type="text" onChange={e => setData({...data, userName: e.target.value})} className="text-white " />
          <Input placeholder="email" type="email" onChange={e => setData({...data, email: e.target.value})} className="text-white " />
          <Input placeholder="password" type="password" onChange={e => setData({...data, password: e.target.value})} className="text-white" />
          <Input placeholder="phone" type="text" onChange={e => setData({...data, phone: e.target.value})} className="text-white" />
          <Input placeholder="OTP" type="text" onChange={e => setData({...data, otp: e.target.value})} className="text-white" />
          <Button type="submit" className="bg-green-400 hover:bg-green-600">{loading ? "Wait for varification...":"Submit"}</Button>
        </form>
      </div>
    </div>
  );
}