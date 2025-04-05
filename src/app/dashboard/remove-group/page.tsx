"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";


export default function Home() {
 
  const navigate = useRouter()

  const [userId1, setUserId] = useState("")

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3009/api/auth/remove/user/group",{userId1},{withCredentials:true})
      console.log(res)
      console.log(userId1)
      navigate.push("/dashboard/home")
    } catch (error) {
      console.log("error in remove user from group", error)
    }
  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen"> 
    <div className="border p-4 rounded-4xl flex flex-col items-center justify-between gap-4">
     
      <div className=" p-4 font-bold text-2xl">Remove a user from group</div>
      <Input placeholder="User Id" onChange={(e) => setUserId(e.target.value)} />
      
      <Button onClick={
        handleSubmit
        } className="bg-green-400 hover:bg-green-500">Remove user</Button>
   
    </div>
    </div>
  )
}