"use client"

import LoginForm from "./LoginForm";

const LoginComponent = () => {
    return <div className="w-screen h-screen bg-white flex items-center justify-center">
        <div className="p-10 border-2 border-black space-y-4">
            <h1 className="text-3xl font-bold text-black text-center">LOGIN</h1>
            <LoginForm />
        </div>
    </div>;
}

export default LoginComponent;
