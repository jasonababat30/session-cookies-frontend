"use client";

import { CurrentUser } from "@/features/authorized/apis/get-current-user";
import Link from "next/link";

interface HomePageProps {
    userRole?: CurrentUser['role'];
}

const HomePage = ({ userRole }: HomePageProps) => {
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">
            <main className="flex flex-col items-center gap-8 px-4 text-center">
                <h1 className="text-4xl font-bold text-black">
                    Welcome to my Session + Cookie Demo Project
                </h1>
                <Link
                    href={`${userRole ? `/authorized/${userRole}` : '/login'}`}
                    className="border-2 border-black rounded-lg py-3 px-12 text-lg font-semibold text-black hover:bg-blue-100 hover:cursor-pointer"
                >
                    {
                        !userRole 
                            ? "Login"
                            : "Back to Dashboard" 
                    }
                </Link>
            </main>
        </div>
    );
}

export default HomePage;
