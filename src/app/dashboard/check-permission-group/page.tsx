"use client";

import { useState, useEffect } from "react";
import axios from "axios";


export default function ViewGroupPermissions() {
  const [permissions, setPermissions] = useState([]);

  

 
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get("http://localhost:3009/api/auth/view/group/permissions", {
          withCredentials: true,
        });
        setPermissions(res.data);
      } catch (err) {
        console.error("Error in fetching group permissions:", err);
      }
    }
    fetchPermissions();
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border p-4 rounded-4xl flex flex-col items-center gap-4 w-96">
        <h2 className="text-xl font-bold">Group Permissions</h2>

        

        <ul className="w-full text-left">
          {permissions.length > 0 ? (
            permissions.map((group, index) => (
              <li key={index} className="border p-2 px-5 rounded-2xl m-2 bg-gray-100 text-blue-500 break-words">
                <div><strong>Group Name:</strong> {group.groupName}</div>
                <div><strong>Group Role:</strong> {group.role}</div>
                <div><strong>Group Permissions:</strong> {JSON.stringify(group.permissions)}</div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </ul>
      </div>
    </div>
  );
}
