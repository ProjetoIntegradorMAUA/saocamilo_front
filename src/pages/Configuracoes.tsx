import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import Confirmacao from "../components/Confirmacao";
import Navbar from "../components/Navbar";
import Preferencias from "../components/Preferencias";
import Topbar from "../components/Topbar";
import { getMe, type MeResponse } from "../services/api";
import { getUserEmail, getRole } from "../services/auth";
import { icons } from "../utils/IconsJson";

const getRoleLabel = (role?: string) => {
    if (role === "NUTRITIONIST") return "Nutricionista";
    if (role === "ATHLETE") return "Atleta";
    return role || "Usuário autenticado";
};

const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export default function Configuracoes() {
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [profile, setProfile] = useState<MeResponse | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function loadProfile() {
            setIsProfileLoading(true);
            const response = await getMe();

            if (!isMounted) return;

            if (response.error) {
                setProfileError(response.error);
            } else if (response.data) {
                setProfile(response.data);
                setProfileError("");
            }

            setIsProfileLoading(false);
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    const fallbackEmail = getUserEmail() || "";
    const fallbackName = fallbackEmail ? fallbackEmail.split("@")[0] : "Usuário";
    const userName = isProfileLoading ? "Carregando..." : profile?.name || fallbackName;
    const userEmail = profile?.email || fallbackEmail || "E-mail não disponível";
    const roleLabel = isProfileLoading ? "Carregando..." : getRoleLabel(profile?.role);
    const initials = useMemo(() => getInitials(userName), [userName]);

    function fnavigate(rota: string) {
        setIsNavigating(true);
        setTimeout(() => {
            setIsNavigating(false);
            navigate("/" + rota);
            location.reload();
        }, 500);
    }

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden font-sans">
            {isNavigating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-450 min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Configurações" />
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6 mt-2 justify-center items-center xl:items-stretch">
                        <div className="flex flex-col gap-6 w-full max-w-2xl xl:w-1/2">
                            <div className="flex flex-col border border-gray-200/80 rounded-2xl bg-white p-6 sm:p-8 shadow-sm h-full">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                                    Perfil
                                </h2>

                                <div className="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-4 border-b border-gray-100 pb-5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center text-red-500 font-bold text-base shadow-sm shrink-0">
                                        {initials}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-gray-800 font-bold text-lg leading-tight truncate">{userName.split(" ")[0]}</span>
                                        <span className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Conta Ativa</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 flex-1">
                                    <div className="flex border-b border-gray-100 w-full pb-4">
                                        <div className="w-2/5 flex ps-2 gap-3.5 items-center">
                                            <span className="flex place-items-center text-gray-400 text-base">{icons.usuario}</span>
                                            <span className="flex place-items-center text-xs sm:text-sm font-semibold text-gray-500">Nome</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2 min-w-0">
                                            <span className="text-xs sm:text-sm font-bold text-gray-700 truncate">{userName}</span>
                                        </div>
                                    </div>

                                    <div className="flex border-b border-gray-100 w-full pb-4">
                                        <div className="w-2/5 flex ps-2 gap-3.5 items-center">
                                            <span className="flex place-items-center text-gray-400 text-base">{icons.email}</span>
                                            <span className="flex place-items-center text-xs sm:text-sm font-semibold text-gray-500">Email</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2 min-w-0">
                                            <span className="text-xs sm:text-sm font-bold text-gray-700 truncate select-all">{userEmail}</span>
                                        </div>
                                    </div>

                                    <div className="flex w-full pb-4">
                                        <div className="w-2/5 flex ps-2 gap-3.5 items-center">
                                            <span className="flex place-items-center text-gray-400 text-base">{icons.cargo}</span>
                                            <span className="flex place-items-center text-xs sm:text-sm font-semibold text-gray-500">Perfil</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2 min-w-0">
                                            <span className="text-xs sm:text-sm font-bold text-gray-700 truncate">{roleLabel}</span>
                                        </div>
                                    </div>

                                    {profileError && (
                                        <p className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                                            Não foi possível carregar o perfil completo. Exibindo dados do token.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full max-w-2xl xl:w-[36%]">
                            <div className="shadow-sm rounded-3xl">
                                <Preferencias />
                            </div>
                            <div className="flex flex-col border border-gray-300 rounded-3xl bg-white p-6 sm:p-8 shadow-sm w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                    Conta
                                </h2>

                                <p className="text-gray-600 mb-6 text-sm">
                                    Gerencie o acesso da sua conta e encerramento de sessão.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div onClick={() => setShowConfirmacao(true)} className="cursor-pointer">
                                        <Botao texto="Sair da Conta" />
                                    </div>
                                    {(profile?.role === "NUTRITIONIST" || getRole() === "NUTRITIONIST") && (
                                        <div onClick={() => navigate("/novo-nutricionista")} className="cursor-pointer">
                                            <Botao texto="Cadastrar Nutricionista" />
                                        </div>
                                    )}
                                </div>
                                {showConfirmacao && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                                        <Confirmacao
                                            texto="Tem certeza que deseja sair?"
                                            onCancel={() => setShowConfirmacao(false)}
                                            onConfirm={() => {
                                                localStorage.clear();
                                                setShowConfirmacao(false);
                                                fnavigate("");
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
