"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";



// groupId = 67e287c711f122436bcb11d8
// userId = 67e0edd7332e3c27b65706a0

export default function Home() {

  const [data, setData] = useState({
    groupId: "",
    userId: ""
  });

  const navigate = useRouter()

  const handleSubmit = async () => {
    try {

      const res = await axios.post("http://localhost:3009/api/auth/add/user/group",data,{withCredentials:true})
      console.log(res)
      navigate.push("/dashboard/home")

    } catch (error) {
      console.log("error in the group-creation route", error);
    }
  }

  return(
    <div className="flex h-screen items-center justify-center ">
      <div className="border-2 rounded-2xl p-4">
        <h1 className="text-3xl font-bold p-2">Add a user in group</h1>
      <div className=" flex flex-col gap-3">
        <Input placeholder="Group Id" type="text" onChange={(e) => setData({...data, groupId: e.target.value})}/>
        <Input placeholder="User Id" type="text" onChange={(e) => setData({...data, userId: e.target.value})}/>
        <Button className="bg-blue-400 hover:bg-blue-600" onClick={handleSubmit}>Submit</Button>
      </div>
      </div>
    </div>
  )
}