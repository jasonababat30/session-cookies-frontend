import api, { APIResponse } from "@/utils/api";
import { AxiosError } from "axios";
import { CurrentUser } from "@/features/authorized/apis/get-current-user";

interface LoginDTO {
    username: string;
    password: string;
}

type LoginResult = {
    status: "success" | "failed";
    data: CurrentUser | null,
    error: { message: string } | null
}

const login = async (credentials: LoginDTO): Promise<LoginResult> => {
    try {
        const { 
            data: { data: loggedInUser } 
        } = await api.post<APIResponse<CurrentUser>>(
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
            data: loggedInUser,
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
