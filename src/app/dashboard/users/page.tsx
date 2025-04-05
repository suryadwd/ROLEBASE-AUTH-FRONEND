"use client";

import { Button } from "@/components/ui/button";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { user, loading } = useCurrentUser();
  const navigate = useRouter();
  const [totalUser, setTotalUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3009/api/auth/see/users", {
          withCredentials: true,
        });
        setTotalUsers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    allUsers();
  }, []);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setRole(user.role || "");
    setPermissions(user.permissions?.join(", ") || "");
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    
    try {
      const res = await axios.post(
        `http://localhost:3009/api/auth/update/user/permissions/${selectedUser._id}`,
        { role, permissions: permissions.split(",").map((p) => p.trim()) },
        { withCredentials: true }
      );

      console.log(res)

      // alert("User updated successfully!");
      setIsModalOpen(false);

     
      setTotalUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === selectedUser._id ? res.data : u))
      );

    } catch (error) {
      console.error("Error updating user:", error);
      // alert("Failed to update user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 border p-4 rounded-4xl">
        <h1 className="text-3xl text-gray-400 font-extrabold">ALL USERS</h1>

        {totalUser.length > 0 ? (
          totalUser.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className="text-2xl border-2 p-3 rounded-2xl cursor-pointer hover:bg-green-300 transition"
            >
              <p>UserName: {user.userName}</p>
              <p>Role: {user.role}</p>
              
            </div>
          ))
        ) : (
          <p className="text-lg text-red-500">No users found!</p>
        )}

        <Button
          onClick={() => navigate.push("/dashboard/home")}
          className="bg-green-400 hover:bg-green-500"
        >
          MOVE...
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black ">
          <div className="bg-red-400 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <label className="block mb-2">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2">Permissions: </label>
            <input
              type="text"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <Button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600">Update</Button>
              <Button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
