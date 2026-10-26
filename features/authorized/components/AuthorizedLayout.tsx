"use client";

import { createContext } from 'react';
import { CurrentUser } from "@/features/authorized/apis/get-current-user";
import logout from '@/features/authorized/apis/logout';
import { useRouter } from "next/navigation";

interface AuthorizedLayoutComponentProps {
    children?: React.ReactNode,
    currentUser: CurrentUser
}

export const AuthorizedContext = createContext<CurrentUser | null>(null)

const AuthorizedLayoutComponent = ({ children, currentUser }: AuthorizedLayoutComponentProps) => {
    const router = useRouter();
    
    const handleLogout = async () => {
        const { status } = await logout();

        router.push("/")
    }

    return (
        <AuthorizedContext value={currentUser}>
            <div className="w-screen h-screen">
                <div
                    className={`relative w-full h-16 ${currentUser.role === "admin" ? "bg-purple-100" : "bg-green-100"} flex items-center justify-center text-black font-bold text-3xl`}
                >
                    AUTHORIZED LAYOUT
                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-md bg-white/70 px-4 py-2 text-base font-semibold text-black transition-colors hover:bg-white cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {children}
            </div>
        </AuthorizedContext>
    )
}

export default AuthorizedLayoutComponent;
