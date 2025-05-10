"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfileCard({ user }) {
    const [profilePic, setProfilePic] = useState(null)
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch('/api/videos/me');
          const data = await res.json();
          if (res.ok) {
            setProfilePic(data.profilePic);
          } else {
            console.error('Error:', data.error);
          }
        } catch (err) {
          console.error('Fetch failed:', err);
        }
      }
  
      fetchData();
    }, []);
    return (
      <div className="bg-white shadow p-4 rounded-md flex items-center space-x-4">
        <img
          src={profilePic || '/proAvatar.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button className="mt-2 text-sm text-blue-600 hover:underline"><Link href="/dashboard/edit-profile">Edit Profile</Link></button>
        </div>
      </div>
    );
  }
  