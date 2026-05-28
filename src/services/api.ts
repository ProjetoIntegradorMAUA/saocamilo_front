const API_BASE_URL = import.meta.env.VITE_API_URL || "http://52.91.54.170:3000";

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
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function getMe() {
  return authRequest<MeResponse>("/api/auth/me");
}

export interface AthleteResponse {
  id: string;
  name: string;
  email: string;
  nutritionistId: string;
  createdAt: string;
}

export async function getAthletes() {
  return authRequest<AthleteResponse[]>("/api/athletes");
}

export interface UltimaAvaliacao {
  avaliacaoId: string;
  atletaNome: string;
  taxaSudorese: number;
  dataAvaliacao: string;
}

export interface DashboardResponse {
  totalAtletas: number;
  totalAvaliacoes: number;
  ultimasAvaliacoes: UltimaAvaliacao[];
}

export async function getDashboard() {
  return authRequest<DashboardResponse>("/api/dashboard");
}

export interface CreateAvaliacaoDTO {
  currentWeight: string;
  finalWeight: string;
  liquidIngested: string;
  durationSeconds: number;
  urineColor: string;
  thirstLevel: string;
  preSymptoms?: string[];
  postSymptoms?: string[];
  observations?: string;

  // Condições ambientais
  temperature?: string;
  humidity?: string;
  thermalSensation?: string;
  windCondition?: string;
  solarExposure?: string;

  // Dados da sessão planejada
  modality: string;
  plannedDurationMin?: string;
  perceivedIntensity: string;
  clothingType: string;
  recentHydrationHistory?: string;

  // Durante a sessão
  foodIntakeWater?: string;
  urineOutputDuringML?: string;

  // Pós-sessão
  soakedClothing?: boolean;
  clothingChanged?: boolean;
  giTolerance?: string;

  // Ambiente
  isOutdoor: boolean;
}

export async function createAvaliacao(data: CreateAvaliacaoDTO) {
  return authRequest<{ message: string }>("/api/avaliacoes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export interface AvaliacaoResponse {
  avaliacaoId: string;
  atletaId: string;
  atletaNome: string;
  taxaSudorese: number;
  dataAvaliacao: string;
  currentWeight: number;
  finalWeight: number;
  liquidIngested: number;
  durationSeconds: number;
  urineColor: number;
  thirstLevel: number;
  modality: string;
  temperature?: number;
  humidity?: number;
  preSymptoms?: string[];
  postSymptoms?: string[];
  observations?: string;

  // Variáveis extras de clima e ambiente
  thermalSensation?: string;
  windCondition?: string;
  solarExposure?: string;
  isOutdoor?: boolean;

  // Variáveis extras da sessão planejada e durante
  plannedDurationMin?: number;
  perceivedIntensity?: string;
  clothingType?: string;
  recentHydrationHistory?: string;
  foodIntakeWater?: number;
  urineOutputDuringML?: number;

  // Variáveis extras pós-exercício
  soakedClothing?: boolean;
  clothingChanged?: boolean;
  giTolerance?: string;
}

export async function getAvaliacoes() {
  return authRequest<AvaliacaoResponse[]>("/api/avaliacoes");
}

export interface AvaliacaoInsightsResponse {
  insights: string;
  generatedAt: string;
  disclaimer: string;
}

export async function generateAvaliacaoInsights(avaliacaoId: string) {
  return authRequest<AvaliacaoInsightsResponse>(`/api/avaliacoes/${avaliacaoId}/insights`, {
    method: "POST",
  });
}

export async function deleteAthlete(athleteId: string) {
  return authRequest<{ message: string }>(`/api/athletes/${athleteId}`, {
    method: "DELETE",
  });
}

export async function getAllAthletes() {
  return authRequest<AthleteResponse[]>("/api/athletes/all");
}

export async function updateNutritionistTeam(athleteIds: string[]) {
  return authRequest<{ message: string }>("/api/athletes/team", {
    method: "PUT",
    body: JSON.stringify({ athleteIds }),
  });
}

export async function updateAthlete(
  athleteId: string,
  data: { name: string; weight: string; dehydrationHistory: string }
) {
  return authRequest<{ message: string; athlete: AthleteResponse }>(`/api/athletes/${athleteId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}


