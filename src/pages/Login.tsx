import { useState } from "react";
import InputLogin from "../components/InputLogin";
import { useNavigate } from "react-router";
import { loginUser } from "../services/api";
import { saveToken } from "../services/auth";
import logoEspiral from "../assets/logo_espiral.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        if (!email.includes("@")) {
            setError("Por favor, insira um email válido.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginUser(email, password);

            if (response.error) {
                setError(response.error);
                return;
            }

            if (response.data) {
                saveToken(response.data.token);
                navigate("/manual");
            }
        } catch {
            setError("Ocorreu um erro inesperado. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-white rounded-full p-4 shadow-lg">
                                <img className="w-16" src={logoEspiral} alt="Logo Sao camilo" />
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-white mb-1">SÃO CAMILO</h1>
                                <p className="text-red-100 text-sm font-medium">Bem-vindo de volta</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                                    <span className="text-lg">⚠️</span>
                                    {error}
                                </p>
                            </div>
                        )}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">
                                Email
                            </label>
                            <InputLogin
                                id="email"
                                placeholder="seu@email.com"
                                type="email"
                                value={email}
                                onChange={(value) => {
                                    setEmail(value);
                                    setError("");
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">
                                Senha
                            </label>
                            <InputLogin
                                id="password"
                                placeholder="Sua senha"
                                type="password"
                                value={password}
                                onChange={(value) => {
                                    setPassword(value);
                                    setError("");
                                }}
                            />
                        </div>
                        <div className="mb-8 flex justify-end">
                            <a href="#" className="text-red-500 hover:text-red-600 text-xs font-medium transition-colors">
                                Esqueceu sua senha?
                            </a>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
