"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {

  const [id, setId] = useState("")
  const navigate = useRouter()

  const handleDelete = async () => {

    try {
      const res = await axios.delete("http://localhost:3009/api/auth/delete/group/permissions", {data:{id}})
      console.log(res)
      alert("Group Deleted")
      navigate.push("/dashboard/home")
    } catch (error) {
      console.log("error while deleting the group", error)
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 border p-8 rounded-2xl">
          <input
        type="text"
        placeholder="Enter Group ID"
 
        onChange={(e) => setId(e.target.value)}
        className="border p-2 rounded"
      />
      <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
        Delete Group
      </Button>
    </div>

    </div>
  );
};
