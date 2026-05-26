import { useLocation, useNavigate } from "react-router-dom";
import { icons } from "../utils/IconsJson";
import { useState } from "react";

interface ITopbar {
    titulo: string;
    foto?: string;
}

export default function Topbar({ titulo }: ITopbar) {

    const navigate = useNavigate()
    const local = useLocation()
    const [isNavigating, setIsNavigating] = useState(false)

    function fnavigate(rota: string) {
        setIsNavigating(true)
        setTimeout(() => {
            setIsNavigating(false)
            navigate("/" + rota)
        }, 500)
    }

    function handleBack() {
        setIsNavigating(true)
        setTimeout(() => {
            setIsNavigating(false)
            if (local.pathname !== "/homepage") {
                if (window.history.length > 1) navigate(-1)
                else navigate('/nova-atividade')
            }
        }, 500)
    }

    return (
        <div className="w-full bg-gray-50 flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-100/50">
            {isNavigating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="w-10 h-10 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <button className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors text-xl p-1.5 shrink-0" onClick={handleBack}>
                    {icons.seta_esquerda}
                </button>
                <div className="font-bold text-base sm:text-lg text-gray-800 truncate tracking-tight pl-2">
                    {titulo}
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <button className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors text-2xl p-1.5 flex items-center">
                    {icons.sino}
                </button>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center text-red-500 shadow-sm select-none shrink-0 font-sans">
                    <span className="text-base sm:text-lg flex items-center">{icons.usuario}</span>
                </div>
            </div>
        </div>
    )
}