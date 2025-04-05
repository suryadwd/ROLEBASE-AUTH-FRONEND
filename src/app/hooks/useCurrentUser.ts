"use client"

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  userName: string;
  role: string;
}

export default function useUser() {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async() => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:3009/api/auth/check",{withCredentials:true})
      setUser(res.data.user)
      
      } catch (error) {
        console.log("error in useCurrentUser hook", error)
      }finally{
        setLoading(false)
      }
    }
    fetchCurrentUser()
  },[])
  return {user, loading}
}
