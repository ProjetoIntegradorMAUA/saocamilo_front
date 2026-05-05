import { useState } from "react";
import InputLogin from "../components/InputLogin";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Por favor, preencha todos os campos");
            return;
        }

        if (!email.includes("@")) {
            setError("Por favor, insira um email válido");
            return;
        }
    };

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-white rounded-full p-4 shadow-lg">
                                <img className="w-14" src="src/assets/logo_saocamilo.webp" alt="Logo Sao camilo" />
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
                            className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
