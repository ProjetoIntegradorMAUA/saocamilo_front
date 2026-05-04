import { useState } from "react"
import { icons } from "../utils/IconsJson"

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
        </div>
    )
}