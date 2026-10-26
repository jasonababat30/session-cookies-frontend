import api, { APIResponse } from "@/utils/api";
import { AxiosError } from "axios";

type LogoutResult = {
    status: "success" | "failed";
    data: { message: string } | null,
    error: { message: string } | null
}

const logout = async (): Promise<LogoutResult> => {
    try {
        const { data } = await api.post<APIResponse<{ message: string }>>('/auth/logout');

        return {
            status: 'success',
            data,
            error: null
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("❌ Error @ logout: ", {...error});
            return {
                status: "failed",
                data: null,
                error: {
                    message: error.response?.data?.message
                }
            }
        }

        console.error("❌ Error @ logout: ", error);
        return {
            status: "failed",
            data: null,
            error: { message: (error as Error)?.message || 'Something went wrong' }
        } 
    }
}

export default logout;
