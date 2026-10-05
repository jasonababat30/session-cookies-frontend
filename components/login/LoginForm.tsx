"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here

        console.log("💊 form submitted: ", {
            username,
            password
        });

        router.push("/authorized");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-black ">
                    <label 
                        // htmlFor="username"
                        className="font-semibold"
                    >
                        Username:
                    </label>
                    <input 
                        type="text" 
                        // id="username"
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-lg py-2 px-4 bg-white"
                    />
                </div>
                <div className="flex flex-col gap-2 text-black">
                    <label 
                        // htmlFor="password"
                        className="font-semibold"
                    >
                        Password:
                    </label>
                    <input 
                        type="password" 
                        // id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg py-2 px-4 bg-white"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full text-black border rounded-lg py-2 px-4 mt-4 text-lg font-semibold hover:cursor-pointer hover:bg-blue-100"
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default LoginForm;
