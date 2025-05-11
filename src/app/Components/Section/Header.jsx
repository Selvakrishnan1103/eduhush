"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'; 

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm(""); 
    setIsSearchActive(false); 
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) setSearchTerm(""); 
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3C7BAA] shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="w-40 h-10 relative">
          <Image
            src="/EduHushTextLogo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center w-full justify-between gap-4">
          <div className="flex items-center ml-auto">
            {!isSearchActive ? (
              <button onClick={handleSearchToggle} className="p-2">
                <FaSearch className="w-6 h-6 text-white" />
              </button>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center mx-4">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-full focus:outline-none placeholder:text-white"
                />
                <button type="button" onClick={handleSearchToggle} className="ml-2">
                  <IoClose className="w-6 h-6 text-white" />
                </button>
              </form>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {status === "loading" ? null : session ? (
              <button
                onClick={() => signOut()}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
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
  )
}
