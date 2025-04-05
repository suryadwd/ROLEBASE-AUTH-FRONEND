"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const [superAdmin, setSuperAdmin] = useState(true);

  const navigate = useRouter()

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    // console.log(data)

    try {
      setLoading(true)
      const url = superAdmin ? "http://localhost:3009/api/auth/test/create-super-admin" : "http://localhost:3009/api/auth/test/create-admin"

      const res = await axios.post(url, data,{withCredentials:true})
      
      console.log(res)
      if(res.data.success){
        navigate.push("/auth/login")
      }

    } catch (error) {
      console.log(superAdmin ? {message: "error in the create super-admin"}  : {message: "error in the create admin"} , error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" border p-8 rounded-2xl">
       <div className="text-4xl font-bold p-3">{superAdmin ? <p>create super-Admin </p> : <p>create admin</p>} </div> 
        <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-4 mt-2">
          <Input placeholder="name" type="text" onChange={e => setData({...data, name: e.target.value}) } className="text-white " />
          <Input placeholder="userName" type="text" onChange={e => setData({...data, userName: e.target.value})} className="text-white " />
          <Input placeholder="email" type="email" onChange={e => setData({...data, email: e.target.value})} className="text-white " />
          <Input placeholder="password" type="password" onChange={e => setData({...data, password: e.target.value})} className="text-white" />
          <Input placeholder="phone" type="text" onChange={e => setData({...data, phone: e.target.value})} className="text-white" />
          <Button type="submit" className="bg-green-400 hover:bg-green-600">{loading ? "Please wait...":"Submit"}</Button>
          <div className="text-blue-400 cursor-pointer" onClick={ () => {
            console.log(superAdmin)
            setSuperAdmin(!superAdmin)
          } }> 
          {superAdmin ? <p>create a admin account</p> : <p>create a superAdmin account</p>} 
          </div>
          <Link href="./login"><div className="text-blue-400 cursor-pointer ">Want to Login now?</div></Link>
        </form>
      </div>
    </div>
  );
}
