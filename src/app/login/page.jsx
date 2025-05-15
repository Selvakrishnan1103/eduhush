"use client" ;
import Image from "next/image";
import LoginButton from "../Components/Button/LoginButton";
import Header from "../Components/Section/Header";
import Footer from "../Components/Section/Footer";
export default function LoginPage() {
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-150">
                <div className="flex flex-col gap-5 justify-center items-center h-100">
                    <div className="rounded-full overflow-hidden border-2 border-blue-300">
                        <Image 
                            src="/Eduhush.png"
                            alt="Logo"
                            width={250}
                            height={250}
                            priority={true}
                        />
                    </div>
                    <LoginButton />
                </div>
            </div>
            <Footer />
        </div>
    )
}