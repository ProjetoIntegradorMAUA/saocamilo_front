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
            <div id="navbar-mobile" className="lg:hidden flex gap-16 h-30 w-full fixed bottom-0 place-self-center justify-center items-center transition-all">
                <div
                    className={`flex flex-col justify-center items-center gap-2 text-xl cursor-pointer hover:opacity-70 transition-colors ${activeIndex === 1 ? 'text-red-500' : ''}`}
                >
                    <span>{icons.usuario}</span>
                    <span>Atletas</span>
                </div>
                <div
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
                            <button
                                className={`flex flex-col items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded transition-colors ${activeIndex === 3 ? 'text-red-500' : ''} hover:opacity-70`}
                            >
                                <span>{icons.manual}</span>
                                <span>Manual</span>
                            </button>
                            <button
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
                <div id="logo" className="m-10 w-full flex justify-center">
                    <img src="src/assets/logo_saocamilo_escrita.png" alt="Logo São Camilo" className="w-44" />
                </div>
                <div id="conteudo" className="h-2/5">
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 1 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.usuario} - Atletas
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 2 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.historico} - Histórico
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 3 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.manual} - Manual
                    </div>
                    <div className={`w-full flex gap-3 items-center pl-10 p-4 cursor-pointer ${activeIndex === 4 ? 'text-red-500' : 'text-gray-500'}`}>
                        {icons.configuracoes} - Configurações
                    </div>
                </div>
                <div className="h-2/5 flex w-full justify-center items-center-safe">
                    <Botao texto="Nova avaliação" icone={icons.adicionar} />
                </div>
            </div>
        </div>
    )
}