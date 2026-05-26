import { icons } from "../utils/IconsJson";

export default function EscalaUrina() {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800 tracking-tight mb-2.5">
                <span className="w-5.5 h-5.5 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center text-[10px] shrink-0 font-sans">
                    {icons.estrela}
                </span>
                <p>Escala Visual de Coloração da Urina</p>
            </div>
            <div className="border border-gray-200/80 rounded-2xl p-4 sm:p-5 w-full bg-white flex flex-col gap-4 shadow-sm font-sans">
                <p className="text-center text-gray-400 text-xs sm:text-sm font-medium">
                    Utilize para estimar o estado de hidratação basal do atleta antes do início da sessão.
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-4 justify-items-center mb-2">
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[#F4EDB7] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 1</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[#F2DA3D] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 2</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[#F5C400] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 3</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[rgb(230,175,0)] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 4</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[rgb(204,143,0)] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 5</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[#A96A00] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 6</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[#835012] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 7</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 sm:w-16 h-8 sm:h-12 rounded-lg bg-[rgb(111,71,23)] border border-gray-200/50 shadow-inner"></div>
                        <p className="mt-1 text-[9px] sm:text-xs font-semibold text-gray-500">Nível 8</p>
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100/60 rounded-xl px-3 py-2 text-center text-xs sm:text-sm font-bold flex items-center justify-center shadow-sm">
                            Níveis 1-3: Bem Hidratado
                        </div>
                        <div className="bg-amber-50 text-amber-700 border border-amber-100/60 rounded-xl px-3 py-2 text-center text-xs sm:text-sm font-bold flex items-center justify-center shadow-sm">
                            Níveis 4-6: Desidratado
                        </div>
                        <div className="bg-red-50 text-red-700 border border-red-100/60 rounded-xl px-3 py-2 text-center text-xs sm:text-sm font-bold flex items-center justify-center shadow-sm">
                            Níveis 7-8: Severamente Desidratado
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
