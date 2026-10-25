import api from "@/utils/api";
import { AxiosError } from "axios";

interface LoginDTO {
    username: string;
    password: string;
}

type LoginResult = {
    status: "success" | "failed";
    data: { message: string } | null,
    error: { message: string } | null
}

const login = async (credentials: LoginDTO): Promise<LoginResult> => {
    try {
        const { data } = await api.post<{ message: string }>(
            "/auth/login",
            credentials,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        return {
            status: "success",
            data,
            error: null
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("❌ Error @ login: ", {...error});
            return {
                status: "failed",
                data: null,
                error: {
                    message: error.response?.data?.message
                }
            }
        }

        console.error("❌ Error @ login: ", error);
        return {
            status: "failed",
            data: null,
            error: { message: (error as Error)?.message || 'Something went wrong' }
        }
    }
};

export default login;
