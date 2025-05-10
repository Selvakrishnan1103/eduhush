"use client";

import { signOut } from "next-auth/react";

export default function LogOutButton(){
    return(
        <div className="border-1 border-[#3C7BAA] p-2 font-bold mr-5 rounded-full lg:flex hidden">
            <button className="text-[#3C7BAA]" onClick={()=>signOut()}>Logout</button>
        </div>
    )
}