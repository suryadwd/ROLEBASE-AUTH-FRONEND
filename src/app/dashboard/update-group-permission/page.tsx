"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState({
    id: "",
    groupName: "",
    role: "",
    permissions: {
      posts: { create: false, edit: false, delete: false, view: false },
      repairs: { create: false, edit: false, delete: false, view: false },
      users: { create: false, edit: false, delete: false, view: false },
    },
  });

  const [loading, setLoading] = useState(false);
  const navigation = useRouter();

  // Function to toggle permissions
  const handlePermissionChange = (category: string, type: string) => {
    setData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [category]: {
          ...prevData.permissions[category],
          [type]: !prevData.permissions[category][type], // Toggle value
        },
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Updated Data:", data);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3009/api/auth/update/group/permissions",
        data,
        { withCredentials: true }
      );

      console.log(res);
      alert("Permissions updated successfully!");
      navigation.push("/dashboard/home");
    } catch (error) {
      console.log("Error while updating group permissions", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border p-8 rounded-2xl w-96">
        <div className="text-2xl font-bold p-3 text-center">
          Update Group Permissions
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Group ID"
            type="text"
            value={data.id}
            onChange={(e) => setData({ ...data, id: e.target.value })}
            required
          />
          <Input
            placeholder="Group Name"
            type="text"
            value={data.groupName}
            onChange={(e) => setData({ ...data, groupName: e.target.value })}
          />
          <Input
            placeholder="Role"
            type="text"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />

          {/* Permissions Section */}
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">Permissions</h3>

            {Object.keys(data.permissions).map((category) => (
              <div key={category} className="mt-3">
                <p className="font-medium">{category}</p>
                {["create", "edit", "delete", "view"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.permissions[category][type]}
                      onChange={() => handlePermissionChange(category, type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            {loading ? "Updating..." : "Update Permissions"}
          </Button>
        </form>
      </div>
    </div>
  );
}
