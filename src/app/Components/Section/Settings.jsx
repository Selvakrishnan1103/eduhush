"use client";

import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const settings = [
    { name: "Profile", path: "/dashboard" },
    { name: "Help & Support", path: "/settings/help-support" },
    { name: "User Feedback", path: "/settings/user-feedback" },
    { name: "Notifications", path: "/settings/notification" },
  ];

  return (
    <div className="pt-28 px-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        {settings.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.path)}
            className="cursor-pointer bg-white shadow p-4 rounded hover:bg-gray-100"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
