"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FiSettings } from 'react-icons/fi';

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
        <div className={`${isSearchActive ? 'hidden' : 'flex'} lg:flex w-40 h-10 relative`}>
          <Image
            src="/EduHushTextLogo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center w-full justify-between gap-4">
          <div className="flex items-center ml-auto space-x-4">
            

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
            <button
              onClick={() => router.push("/settings")}
              className="p-2"
              title="Settings"
            >
              <FiSettings className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
