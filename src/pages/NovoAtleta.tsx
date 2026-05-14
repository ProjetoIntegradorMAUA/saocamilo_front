import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { Users } from "../mock/users";
import { authRequest } from "../services/api";
import { FiCheckCircle } from "react-icons/fi";

export default function NovoAtleta() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
            const response = await authRequest("/api/athletes", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
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
        setError("");
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={1} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Novo Atleta" foto={Users.user1.foto} />
                    </div>

                    <div className="flex items-center justify-center flex-1">
                        <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-md">

                            {success ? (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <FiCheckCircle className="text-green-500" size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Atleta cadastrado!</h2>
                                    <p className="text-gray-500 mb-8">
                                        <span className="font-semibold text-gray-700">{name}</span> já pode acessar o sistema com o e-mail e senha definidos.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => navigate("/atletas")}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
                                        >
                                            Ver lista de atletas
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cadastrar outro atleta
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Cadastrar Atleta</h2>
                                        <p className="text-sm text-gray-500">Defina o acesso do novo atleta ao sistema.</p>
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
                                                placeholder="Ex: Carlos Eduardo Silva"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                                placeholder="atleta@email.com"
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

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => navigate("/atletas")}
                                                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
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
