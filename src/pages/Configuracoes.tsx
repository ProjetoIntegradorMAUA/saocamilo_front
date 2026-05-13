import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import Confirmacao from "../components/Confirmacao";
import Navbar from "../components/Navbar";
import Preferencias from "../components/Preferencias";
import Topbar from "../components/Topbar";
import { Users } from "../mock/users";
import { icons } from "../utils/IconsJson";
import { useState } from "react";

export default function Configuracoes() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const navigate = useNavigate()
    const [isNavigating, setIsNavigating] = useState(false)
    function fnavigate(rota: string) {
        setIsNavigating(true)
        setTimeout(() => {
            setIsNavigating(false)
            navigate("/" + rota)
        }, 500)
    }
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            {isNavigating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={4} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Configurações" foto={Users.user1.foto} />
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6 mt-2 justify-center items-center xl:items-stretch">
                        {/* perfil */}
                        <div className="flex flex-col gap-6 w-full max-w-2xl xl:w-1/2">
                            <div className="flex flex-col border border-gray-300 rounded-3xl bg-white p-6 sm:p-8 shadow-sm h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3 border-b border-gray-200 pb-5">
                                    Perfil
                                </h2>

                                <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-3 border-b border-gray-200 pb-5">
                                    <img className="min-w-10 w-16 max-w-20 p-1" src={Users.user1.foto} alt="Foto de usuario" style={{ borderRadius: 100 }} />
                                    {Users.user1.nome.split(" ")[0]}
                                </h2>

                                <div className="flex flex-col gap-6 flex-1">
                                    {/* nome */}
                                    <div className="flex border-b border-gray-200 w-full pb-4">
                                        <div className=" w-2/5 flex ps-5 gap-5">
                                            <span className="flex place-items-center text-lg">{icons.usuario}</span>
                                            <span className="flex place-items-center text-lg">Nome</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2">
                                            <span className="text-md">{Users.user1.nome}</span>
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div className="flex border-b border-gray-200 w-full pb-4">
                                        <div className=" w-2/5 flex ps-5 gap-5">
                                            <span className="flex place-items-center text-lg">{icons.email}</span>
                                            <span className="flex place-items-center text-lg">Email</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2">
                                            <span className="text-md">{Users.user1.email}</span>
                                        </div>
                                    </div>
                                    {/* senha */}
                                    <div className="flex w-full pb-4">
                                        <div className=" w-2/5 flex ps-5 gap-5">
                                            <span className="flex place-items-center text-lg">{icons.senha}</span>
                                            <span className="flex place-items-center text-lg">Senha</span>
                                        </div>
                                        <div className="w-3/5 flex place-items-center justify-end pe-2 gap-4">
                                            <span className="text-md">{mostrarSenha ? Users.user1.senha : '*'.repeat(Users.user1.senha.length)}</span>
                                            <button onClick={() => setMostrarSenha(!mostrarSenha)} className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer">
                                                {mostrarSenha ? icons.olhoFechado : icons.olhoAberto}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full max-w-2xl xl:w-1/3">
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

                                <div className="flex gap-4">
                                    <div onClick={() => setShowConfirmacao(true)}>
                                        <Botao texto="Sair da Conta" />
                                    </div>
                                </div>
                                {showConfirmacao && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                                        <Confirmacao
                                            texto="Tem certeza que deseja sair?"
                                            onCancel={() => setShowConfirmacao(false)}
                                            onConfirm={() => {
                                                setShowConfirmacao(false)
                                                localStorage.clear()
                                                fnavigate("")
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
    )
}