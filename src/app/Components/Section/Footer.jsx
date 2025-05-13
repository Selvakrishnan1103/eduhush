'use client';

import { FaHome } from 'react-icons/fa';
import { MdForum } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';
import { BiVideoPlus } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/videos/me');
        if (res.ok) {
          const data = await res.json();
          setProfilePic(data.profilePic);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 text-white py-4 z-50 bg-[#3C7BAA]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/" className="hover:text-gray-300">
          <FaHome className="text-2xl" />
        </Link>

        <Link href="/forum" className="hover:text-gray-300">
          <MdForum className="text-2xl" />
        </Link>
        <Link href="/upload" className='hover:text-gray-300'>
          <BiVideoPlus className='text-3xl' />
        </Link>

        <Link href="/news" className="hover:text-gray-300">
          <BiNews className="text-2xl" />
        </Link>
        
        <Link href="/dashboard">
          <div className="border border-blue-600 bg-white rounded-full overflow-hidden w-10 h-10 cursor-pointer">
            <Image
              src={profilePic || "/proAvatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </Link>
      </div>
    </footer>
  );
}
