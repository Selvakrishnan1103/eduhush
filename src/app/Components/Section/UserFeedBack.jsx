"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UserFeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = session?.user?.email || "Anonymous";

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: feedback,
        user,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Failed to submit feedback");
    }
  };


  return (
    <div className="pt-28 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Feedback</h1>
      {submitted ? (
        <p className="text-green-600">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border rounded p-3"
            rows="5"
            placeholder="Share your thoughts or issues..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#3C7BAA] text-white px-6 py-2 rounded hover:bg-[#2a5c84]"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
