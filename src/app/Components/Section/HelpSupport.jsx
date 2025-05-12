"use client";

export default function HelpSupport() {
  return (
    <div className="pt-28 px-6">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <p className="mb-4">
        If you need any assistance, feel free to contact us at:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Email: selvakrish601@gmail.com</li>
        <li>Phone: +91-9789679544</li>
      </ul>
      <div className="mt-6">
        <p>
          You can also visit our{" "}
          <a
            href="/faq"
            className="text-blue-600 underline hover:text-blue-800"
          >
            FAQ
          </a>{" "}
          page for common questions.
        </p>
      </div>
    </div>
  );
}
