import { deleteCookie, getCookie } from "@/utils/cookie";
import { isTokenExpired } from "@/utils/JwtToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getCookie("access_token");

    if (!path.startsWith("/auth") && token && isTokenExpired(token)) {
        redirectToLogin();
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }

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

function redirectToLogin() {
    deleteCookie("access_token");

    if (typeof window !== "undefined") {
        const returnTo = window.location.pathname + window.location.search;
        window.location.replace(
            `/login?reason=session-expired&redirect=${encodeURIComponent(returnTo)}`,
        );
    }
}
