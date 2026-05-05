import { useState } from "react"
import { icons } from "../utils/IconsJson"
import Botao from "./Botao";

interface INavbar {
    index: number;
}

export default function Navbar({ index }: INavbar) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [activeIndex] = useState<number>(index)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div>
            <div id="navbar-mobile" className="md:hidden flex gap-16 h-30 w-full fixed bottom-0 place-self-center justify-center items-center transition-all">
                <div
                    className={`flex flex-col justify-center items-center gap-2 text-xl cursor-pointer transition-colors ${activeIndex === 1 ? 'text-red-500' : ''}`}
                >
                    <span>{icons.usuario}</span>
                    <span>Atletas</span>
                </div>
                <div
                    className={`flex flex-col justify-center items-center gap-2 text-xl cursor-pointer transition-colors ${activeIndex === 2 ? 'text-red-500' : ''}`}
                >
                    <span>{icons.historico}</span>
                    <span>Histórico</span>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex flex-col justify-between items-center gap-2 text-xl hover:opacity-70 transition"
                    >
                        <span className="text-2xl">{icons.menu}</span>
                        <span>Menu</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute bottom-full transform -translate-x-1/2 mb-6 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-4">
                            <button
                                className={`flex flex-col items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition-colors ${activeIndex === 3 ? 'text-red-500' : ''}`}
                            >
                                <span>{icons.configuracoes}</span>
                                <span>Configurações</span>
                            </button>
                            <button
                                className={`flex flex-col items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition-colors ${activeIndex === 4 ? 'text-red-500' : ''}`}
                            >
                                <span>{icons.manual}</span>
                                <span>Manual</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="navbar-desktop" className="hidden md:w-60 md:h-dvh md:fixed border-r border-r-gray-300 bg-gray-50 rounded-r-3xl md:flex md:flex-col md:items-center">
                <div id="logo" className="m-10 w-full flex justify-center">
                    <img src="src/assets/logo_saocamilo_escrita.png" alt="Logo São Camilo" className="w-44" />
                </div>
                <div id="conteudo" className="h-1/2 w-full flex flex-col justify-center gap-9 text-xl">
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 1 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.dashboard} - Dashboard
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 2 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.usuario} - Atletas
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 3 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.historico} - Histórico
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 4 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.manual} - Manual
                    </div>
                </div>
                <div id="configuracoes" className={`w-full ${activeIndex === 5 ? 'text-red-500' : 'text-gray-500'} h-25`}>
                    <span className="flex gap-3 items-center pl-10 p-4 cursor-pointer">{icons.configuracoes} - Configurações</span>
                </div>
                <div className="border border-gray-200 w-full m-6"></div>
                <Botao texto="Nova avaliação" icone={icons.adicionar} />
            </div>
        </div>
    )
}