"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    role: "",
    permissions: {
      create: false,
      edit: false,
      delete: false,
      view: false
    },
    groupName: ""
  });

  const navigate = useRouter()

  const handlePermissionChange = (permission: string) => {
    setData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [permission]: !prevData.permissions[permission] // Toggle true/false
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(data)
    try {
      const res = await axios.post("http://localhost:3009/api/auth/create/group/permissions", data, {
        withCredentials: true
      });

      console.log("Response:", res.data);
      alert("Group created successfully!");
      navigate.push("/dashboard/home")
    } catch (error) {
      console.log("Error in group-creation route", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border p-4 rounded-2xl">
        <div>Want to create a group</div>
        <div className="flex flex-col items-center gap-2">
          <Input
            placeholder="Role"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="my-2"
          />
          <Input
            placeholder="Group name"
            value={data.groupName}
            onChange={(e) => setData({ ...data, groupName: e.target.value })}
            className="my-2"
          />

          <div className="flex flex-col">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={data.permissions.create} onChange={() => handlePermissionChange("create")} />
              Create
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={data.permissions.edit} onChange={() => handlePermissionChange("edit")} />
              Edit
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={data.permissions.delete} onChange={() => handlePermissionChange("delete")} />
              Delete
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={data.permissions.view} onChange={() => handlePermissionChange("view")} />
              View
            </label>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-400 hover:bg-green-500 w-fit"
          >
            {loading ? "Creating..." : "Create group"}
          </Button>
        </div>
      </div>
    </div>
  );
}
