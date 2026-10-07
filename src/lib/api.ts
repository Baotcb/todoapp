import { getCookie } from "@/utils/cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getCookie("access_token");
    const response = await fetch(
        `${API_URL}${path}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),
                ...options.headers,
            },
        },
    );
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}
