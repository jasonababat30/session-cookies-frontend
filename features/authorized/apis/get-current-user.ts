"use server";
import api, { APIResponse } from "@/utils/api";
import { AxiosError } from "axios";
import { cookies } from 'next/headers';

export interface CurrentUser {
    id: number,
    role: "user" | "admin",
    first_name: string,
    last_name: string,
    age: number
}

type GetCurrentUserResult = {
    status: "success" | "failed";
    data: CurrentUser | null,
    error: { message: string } | null
}

const getCurrentUser = async (): Promise<GetCurrentUserResult> => {
    try {
        const cookiesStore = await cookies();
        const session = cookiesStore.get('connect.sid');

        const { 
            data: { data: currentUser } 
        } = await api.get<APIResponse<CurrentUser>>(
            '/auth/me',
            {
                headers: {
                    "Cookie": `${session?.name}=${session?.value}`
                }
            }
        );

        return {
            status: "success",
            data: currentUser,
            error: null
        }
    } catch (error) {
       if (error instanceof AxiosError) {
            console.error("❌ Error @ getCurrentUser: ", {...error});
            return {
                status: "failed",
                data: null,
                error: {
                    message: error.response?.data?.message
                }
            }
        }

        console.error("❌ Error @ getCurrentUser: ", error);
        return {
            status: "failed",
            data: null,
            error: { message: (error as Error)?.message || 'Something went wrong' }
        } 
    }
}

export default getCurrentUser;
