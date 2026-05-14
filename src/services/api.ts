const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const { headers: optionHeaders, ...restOptions } = options;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...optionHeaders,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.error || "Erro inesperado no servidor.",
        status: response.status,
      };
    }

    return { data, error: null, status: response.status };
  } catch {
    return {
      data: null,
      error: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      status: 0,
    };
  }
}


export interface LoginResponse {
  message: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export async function loginUser(email: string, password: string) {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(email: string, password: string) {
  return request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}


export function authRequest<T>(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  return request<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export interface MeResponse {
  message: string;
  loggedUserId: number;
}

export async function getMe() {
  return authRequest<MeResponse>("/api/auth/me");
}
