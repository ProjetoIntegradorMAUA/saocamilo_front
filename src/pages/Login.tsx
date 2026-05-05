import InputLogin from "../components/InputLogin";

export default function Login() {
    return (
        <div className="min-h-screen w-full bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <form className="px-6 py-8 sm:px-8">
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-semibold mb-2 text-sm"
                            >
                                Email
                            </label>
                            <InputLogin
                                id="email"
                                placeholder="seu@email.com"
                                type="email"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-semibold mb-2 text-sm"
                            >
                                Senha
                            </label>
                            <InputLogin
                                id="password"
                                placeholder="Sua senha"
                                type="password"
                            />
                        </div>
                        <div className="mb-8 flex justify-end">
                            <a
                                href="#"
                                className="text-red-500 hover:text-red-600 text-xs font-medium transition-colors"
                            >
                                Esqueceu sua senha?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg mb-4 flex items-center justify-center gap-2"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
