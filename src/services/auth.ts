const TOKEN_KEY = "token";
const ROLE_KEY = "user_role";

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function saveRole(role: string): void {
  localStorage.setItem(ROLE_KEY, role);
}

export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY);
}

export interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

export function decodeToken(token: string): UserPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as UserPayload;
  } catch {
    return null;
  }
}

export function getUserEmail(): string | null {
  const token = getToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded ? decoded.email : null;
}
