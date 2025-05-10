"use client" ;
import {signIn} from "next-auth/react"
import {FcGoogle} from "react-icons/fc"
export default function LoginButton() {
    return (      
        <button onClick={()=>signIn("google",{ callbackUrl : "/"})} className="flex gap-4 border-2 border-blue-300 p-4">
            <FcGoogle size={40}/>
            <p className="font-bold text-xl flex justify-center items-center text-blue-600">Sign In Using Google</p>
        </button> 
    )
}