export function isTokenExpired(token: string): boolean {
    const payload = parseJwt(token);
    if (!payload?.exp || typeof payload.exp !== "number") {
        return true;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);


    return payload.exp < currentTimestamp - 10;
}

function parseJwt(token: string): { exp?: number } | null {
    try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}