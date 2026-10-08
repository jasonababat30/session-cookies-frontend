import api from "@/utils/api";
import { AxiosError } from "axios";

interface LoginDTO {
    user_name: string;
    password: string;
}

type LoginResult = {
    success: boolean;
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
            success: true,
            data,
            error: null
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("❌ Error @ login: ", {...error});
            return {
                success: false,
                data: null,
                error: {
                    message: error.response?.data?.message
                }
            }
        }

        console.error("❌ Error @ login: ", error);
        return {
            success: false,
            data: null,
            error: { message: (error as Error)?.message || 'Something went wrong' }
        }
    }
};

export default login;
