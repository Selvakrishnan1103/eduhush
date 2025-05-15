"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Settings() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const settings = [
    { name: "Profile", path: "/dashboard" },
    { name: "Help & Support", path: "/settings/help-support" },
    { name: "User Feedback", path: "/settings/user-feedback" },
    { name: "Notifications", path: "/settings/notification" },
  ];

  const handleAuthAction = () => {
    if (session) {
      signOut();
    } else {
      signIn("google"); // or use default signIn()
    }
  };

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

        {status !== "loading" && (
          <div
            onClick={handleAuthAction}
            className={`cursor-pointer shadow p-4 rounded text-center font-semibold ${
              session ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {session ? "Logout" : "Login"}
          </div>
        )}
      </div>
    </div>
  );
}
