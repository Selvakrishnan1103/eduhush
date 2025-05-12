"use client";

import { useState } from "react";

export default function Notification() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(false);

  return (
    <div className="pt-28 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label>Email Notifications</label>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="w-5 h-5"
          />
        </div>

        <div className="flex justify-between items-center">
          <label>App Notifications</label>
          <input
            type="checkbox"
            checked={appNotif}
            onChange={() => setAppNotif(!appNotif)}
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
}
