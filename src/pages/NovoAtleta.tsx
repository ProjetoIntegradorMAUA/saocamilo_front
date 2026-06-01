import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { authRequest, getAllAthletes, type AthleteResponse } from "../services/api";
import { FiCheckCircle } from "react-icons/fi";
import { getRole } from "../services/auth";

export default function NovoAtleta() {
    const navigate = useNavigate();

    useEffect(() => {
        if (getRole() !== "NUTRITIONIST") {
            navigate("/homepage");
        }
    }, [navigate]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [athletes, setAthletes] = useState<AthleteResponse[]>([]);
    const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            const res = await getAllAthletes();
            if (res.data) {
                setAthletes(res.data);
            }
        };
        fetchAll();
    }, []);

    const toggleAthlete = (id: string) => {
        setSelectedAthletes(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Preencha todos os campos.");
            return;
        }

        if (!email.includes("@")) {
            setError("Insira um e-mail válido.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await authRequest("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password, 
                    role: "NUTRITIONIST",
                    athleteIds: selectedAthletes 
                }),
            });

            if (response.error) {
                setError(response.error);
                return;
            }

            setSuccess(true);
        } catch {
            setError("Ocorreu um erro ao cadastrar. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setSuccess(false);
        setName("");
        setEmail("");
        setPassword("");
        setSelectedAthletes([]);
        setError("");
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-450 min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Novo Nutricionista" />
                    </div>

                    <div className="flex items-center justify-center flex-1">
                        <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-lg">

                            {success ? (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <FiCheckCircle className="text-green-500" size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Nutricionista cadastrado!</h2>
                                    <p className="text-gray-500 mb-8">
                                        <span className="font-semibold text-gray-700">{name}</span> já pode acessar o sistema com o e-mail e senha definidos.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => navigate("/configuracoes")}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Voltar para Configurações
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Cadastrar outro nutricionista
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Cadastrar Nutricionista</h2>
                                        <p className="text-sm text-gray-500">Defina o acesso do novo nutricionista ao sistema e selecione sua equipe inicial.</p>
                                    </div>

                                    {error && (
                                        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                                            ⚠️ {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                                placeholder="Ex: Dr. Jorge Silva"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                                placeholder="nutri@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                                placeholder="Defina uma senha"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Vincular Atletas à Equipe (Opcional)</label>
                                            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-2xl p-3 bg-gray-50 space-y-2">
                                                {athletes.length > 0 ? (
                                                    athletes.map(ath => (
                                                        <label key={ath.id} className="flex items-center gap-3 cursor-pointer p-1 hover:bg-white rounded-lg transition-colors font-medium">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedAthletes.includes(ath.id)}
                                                                onChange={() => toggleAthlete(ath.id)}
                                                                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                                                            />
                                                            <span className="text-sm text-gray-700">{ath.name} ({ath.email})</span>
                                                        </label>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-gray-500 italic p-1">Nenhum atleta disponível no sistema.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => navigate("/configuracoes")}
                                                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                                            >
                                                {isLoading ? "Salvando..." : "Cadastrar"}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
