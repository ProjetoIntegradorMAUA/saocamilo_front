import { useState } from "react"
import { icons } from "../utils/IconsJson"
import Botao from "./Botao";
import { useNavigate } from "react-router";
import logoSaoCamilo from "../assets/logo_saocamilo_completo.svg";

interface INavbar {
    index: number;
}

export default function Navbar({ index }: INavbar) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [activeIndex] = useState<number>(index)
    const [isNavigating, setIsNavigating] = useState(false)
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    function fnavigate(rota: string) {
        setIsNavigating(true)
        setTimeout(() => {
            setIsNavigating(false)
            navigate("/" + rota)
        }, 500)
    }

    return (
        <div>
            {isNavigating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div id="navbar-mobile" className="lg:hidden flex gap-16 h-30 w-full fixed bottom-0 place-self-center justify-center items-center transition-all bg-white">
                <div onClick={() => fnavigate("atletas")}
                    className={`flex flex-col justify-center items-center gap-2 text-xl cursor-pointer hover:opacity-70 transition-colors ${activeIndex === 1 ? 'text-red-500' : ''}`}
                >
                    <span>{icons.usuario}</span>
                    <span>Atletas</span>
                </div>
                <div onClick={() => fnavigate("historico")}
                    className={`flex flex-col justify-center items-center gap-2 text-xl cursor-pointer hover:opacity-70 transition-colors ${activeIndex === 2 ? 'text-red-500' : ''}`}
                >
                    <span>{icons.historico}</span>
                    <span>Histórico</span>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex flex-col cursor-pointer justify-between items-center gap-2 text-xl hover:opacity-70 transition"
                    >
                        <span className="text-2xl">{icons.menu}</span>
                        <span>Menu</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute bottom-full transform -translate-x-1/2 mb-6 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-4">
                            <button onClick={() => fnavigate("manual")}
                                className={`flex flex-col items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded transition-colors ${activeIndex === 3 ? 'text-red-500' : ''} hover:opacity-70`}
                            >
                                <span>{icons.manual}</span>
                                <span>Manual</span>
                            </button>
                            <button onClick={() => fnavigate("configuracoes")}
                                className={`flex hover:opacity-70 flex-col items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition-colors cursor-pointer ${activeIndex === 4 ? 'text-red-500' : ''}`}
                            >
                                <span>{icons.configuracoes}</span>
                                <span>Configurações</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="navbar-desktop" className="hidden lg:w-60 lg:h-dvh lg:fixed border-r border-r-gray-300 bg-gray-50 lg:flex lg:flex-col lg:items-center text-lg">
                <div id="logo" className="m-10 w-full flex justify-center ">
                    <img src={logoSaoCamilo} alt="Logo São Camilo" className="w-1/2 cursor-pointer" onClick={() => fnavigate("homepage")} />
                </div>
                <div id="conteudo" className="h-2/5 w-full px-2 text-[16px]">
                    <div onClick={() => fnavigate("atletas")} className={`w-full flex gap-3 transition-all rounded-2xl items-center pl-10 p-4 cursor-pointer ${activeIndex === 1 ? 'text-red-500 hover:text-red-600 hover:bg-red-50 pl-12' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:pl-12'}`}>
                        {icons.usuario}- Atletas
                    </div>
                    <div onClick={() => fnavigate("historico")} className={`w-full flex gap-3 transition-all rounded-2xl items-center pl-10 p-4 cursor-pointer ${activeIndex === 2 ? 'text-red-500 hover:text-red-600 hover:bg-red-50 pl-12' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:pl-12'}`}>
                        {icons.historico}- Histórico
                    </div>
                    <div onClick={() => fnavigate("manual")} className={`w-full flex gap-3 transition-all rounded-2xl items-center pl-10 p-4 cursor-pointer ${activeIndex === 3 ? 'text-red-500 hover:text-red-600 hover:bg-red-50 pl-12' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:pl-12'}`}>
                        {icons.manual}- Manual
                    </div>
                    <div onClick={() => fnavigate("configuracoes")} className={`w-full flex gap-3 transition-all rounded-2xl items-center pl-10 p-4 cursor-pointer ${activeIndex === 4 ? 'text-red-500 hover:text-red-700 hover:bg-red-50 pl-12' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:pl-12'}`}>
                        {icons.configuracoes}- Configurações
                    </div>
                </div>
                <div className="h-2/5 flex w-full justify-center items-center-safe">
                    <Botao texto="Nova avaliação" icone={icons.adicionar} />
                </div>
            </div>
        </div>
    )
}