"use client";
import { createContext } from 'react';
import { CurrentUser } from "@/features/authorized/apis/get-current-user";

interface AuthorizedLayoutComponentProps {
    children?: React.ReactNode,
    currentUser: CurrentUser
}

export const AuthorizedContext = createContext<CurrentUser | null>(null)

const AuthorizedLayoutComponent = ({ children, currentUser }: AuthorizedLayoutComponentProps) => {
    return (
        <AuthorizedContext value={currentUser}>
            <div className="w-screen h-screen">
                <div
                    className="w-full h-16 bg-blue-100 flex items-center justify-center text-black font-bold text-3xl"
                >
                    AUTHORIZED LAYOUT
                </div>
                {children}
            </div>
        </AuthorizedContext>
    )
}

export default AuthorizedLayoutComponent;
