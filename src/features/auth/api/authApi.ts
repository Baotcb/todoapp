import { apiFetch } from "@/lib/api";
import { LoginResponse } from "../types/Login";


export async function login(email: string, password: string) {
    return apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function getMezonLoginUrl() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("URL API chưa được cấu hình.");
    }

    return `${apiUrl}/auth/mezon`;
}