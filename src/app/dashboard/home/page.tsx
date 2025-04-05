"use client"

import { Button } from "@/components/ui/button"
import useCurrentUser from "../../hooks/useCurrentUser"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const {user, loading} = useCurrentUser()
  const navigate = useRouter()

  const [see, setSee] = useState(false)

  const hanleAllUsers = async () => {
    try {
      setSee(true)
      const res = await axios.get(" http://localhost:3009/api/auth/see/users")
      if(res.data.success)
        navigate.push("./dashboard/users")
    } catch (error) {
      
    }finally{
      setSee(false)
    }
  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen"> 
    <div className="flex flex-col items-center justify-center gap-4 border p-4 rounded-4xl">
     
      <div className=" p-4 font-extrabold text-4xl">Current login user Info Box </div>
      <div className="text-2xl "> UserName : {user?.userName}</div>
      <div className="text-2xl "> UserRole : {user?.role}</div>
      <div className="grid grid-cols-3 gap-4">
      <Button onClick={() => navigate.push("/dashboard/register-user")} className="bg-green-400 hover:bg-green-600 px-12 py-1.5">Register a user</Button>
      <Button onClick={() => navigate.push("/dashboard/users")} className="bg-green-400 hover:bg-green-500">SEE USERS</Button>
      <Button onClick={() => navigate.push("/dashboard/create-group")} className="bg-green-400 hover:bg-green-500">Register a group</Button>
      <Button onClick={() => navigate.push("/dashboard/add-group")} className="bg-green-400 hover:bg-green-500">Add user in group</Button>
      <Button onClick={() => navigate.push("/dashboard/remove-group")} className="bg-green-400 hover:bg-green-500">Remove user from group</Button>
      <Button onClick={() => navigate.push("/dashboard/check-permission-group")} className="bg-green-400 hover:bg-green-500">Permission of groups for users</Button>
      <Button onClick={() => navigate.push("/dashboard/update-group-permission")} className="bg-green-400 hover:bg-green-500">Update group</Button>
      <Button onClick={() => navigate.push("/dashboard/delete-group")} className="bg-green-400 hover:bg-green-500">Delete the groups</Button>
      </div>
     
    </div>
    </div>
  )
}