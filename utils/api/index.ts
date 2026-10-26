import axios from "axios";

export type APIResponse<T> = {
    data: T;
    message: string;
} 

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000,
    withCredentials: true
});

export default api;
