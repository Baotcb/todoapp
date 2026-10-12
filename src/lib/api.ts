import { deleteCookie, getCookie } from "@/utils/cookie";
import { isTokenExpired } from "@/utils/JwtToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiEnvelope<T> = {
    success: boolean;
    data: T;
};


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
    if (response.status === 204) {
        return undefined as T;
    }
    const body: unknown = await response
        .json()
        .catch(() => null);

    if (!response.ok) {
        if (
            response.status === 401 &&
            !path.startsWith("/auth")
        ) {
            redirectToLogin();

            throw new Error(
                "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.",
            );
        }
        let message = `API Error: ${response.status}`;
        if (
            body !== null &&
            typeof body === "object" &&
            "message" in body
        ) {
            const apiMessage = body.message;

            if (typeof apiMessage === "string") {
                message = apiMessage;
            } else if (Array.isArray(apiMessage)) {
                message = apiMessage.join(", ");
            }
        }

        throw new Error(message);
    }
    if (
        body !== null &&
        typeof body === "object" &&
        "success" in body &&
        "data" in body
    ) {
        const envelope = body as ApiEnvelope<T>;

        if (!envelope.success) {
            throw new Error(
                "API request không thành công.",
            );
        }

        return envelope.data;
    }
    return body as T;
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
