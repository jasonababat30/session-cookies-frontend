"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import login from "@/features/login/apis/login";
import { validateLoginForm, LoginErrorObj } from "@/features/login/validation";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [didSubmit, setDidSubmit] = useState(false);
    const [errors, setErrors] = useState<LoginErrorObj>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDidSubmit(true);
        setErrors({});
        
        const {
            success: validationSuccess,
            errors: validationErrors
        } = validateLoginForm(username, password);

        if (!validationSuccess) {
            setErrors(validationErrors!);
            setDidSubmit(false);
            return;
        }

        const {
            success: loginSuccess,
            data: loginData,
            error: loginError
        } = await login({
            user_name: username,
            password
        });

        if (!loginSuccess) {
            console.log("👩‍🌾 Login Error: ", loginError);
            setErrors(prev => ({
                ...prev,
                others: loginError?.message
            }))
            setDidSubmit(false);
            return;
        }

        console.log("✅ Data from API: ", loginData);

        router.push("/authorized/admin");
        setDidSubmit(false);
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
                        onChange={(e) => {
                            if (errors.username) {
                                const {username, ...restOfErrors} = errors;
                                setErrors(restOfErrors);
                            }
                            setUsername(e.target.value)
                        }}
                        className={`border rounded-lg py-2 px-4 bg-white ${errors?.username && "border-red-500"}`}
                    />
                    {
                        errors?.username
                        && (
                            <p className="text-red-500">{errors.username}</p>
                        )
                    }
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
                        onChange={(e) => {
                            if (errors.password) {
                                const {password, ...restOfErrors} = errors;
                                setErrors(restOfErrors);
                            }
                            setPassword(e.target.value)
                        }}
                        className={`border rounded-lg py-2 px-4 bg-white ${errors?.password && "border-red-500"}`}
                    />
                    {
                        errors?.password
                        && (
                            <p className="text-red-500">{errors.password}</p>
                        )
                    }
                </div>
                <button 
                    type="submit"
                    // className="w-full text-black border rounded-lg py-2 px-4 mt-4 text-lg font-semibold hover:cursor-pointer hover:bg-blue-100"
                    className={`flex justify-center w-full text-black border rounded-lg py-2 px-4 mt-4 text-lg font-semibold hover:cursor-pointer hover:bg-blue-100 ${didSubmit && 'disabled' }`}
                >
                    {
                        didSubmit 
                        ? (
                            <Loader2 className="animate-spin"/>
                        )
                        : (
                            <>Login</>
                        )
                    }
                </button>
                {
                    errors?.others
                    && (
                        <p className="text-center text-sm text-red-500 mt-1">{errors.others}</p>
                    )
                }
            </div>
        </form>
    )
}

export default LoginForm;
