"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3C7BAA] shadow-md p-4">
      <div className="pl-2 lg:pl-5">
        <div className="flex justify-between items-center">

          <div className="w-80 h-80 lg:w-full h-full">
            <Image
              src="/EduHushTextLogo.png"
              alt="Logo"
              width={80}
              height={80}
              priority={true}
            />
          </div>

          <div className="flex justify-center gap-3 items-center mr-2">
            {status === "loading" ? (
              <p></p>
            ) : session ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="text-[white] bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="text-[#3C7BAA] bg-white hover:bg-[#2a5c84] px-4 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
