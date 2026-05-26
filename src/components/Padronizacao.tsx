import { icons } from "../utils/IconsJson";

export default function Padronizacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800 tracking-tight mb-2.5">
                <span className="w-5.5 h-5.5 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center text-[10px] shrink-0 font-sans">
                    {icons.check}
                </span>
                <p>Padronização de Pesagem</p>
            </div>
            <div className="border border-gray-200/80 rounded-2xl p-3 sm:p-4 bg-white w-full flex flex-col gap-3 shadow-sm font-sans">
                <div className="flex items-center gap-3">
                    <p className="flex items-center justify-center rounded-full bg-red-500 text-white font-bold w-5 h-5 shrink-0 text-[11px] leading-none">1</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">Esvaziamento vesical obrigatório antes de ambas as pesagens.</p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="flex items-center justify-center rounded-full bg-red-500 text-white font-bold w-5 h-5 shrink-0 text-[11px] leading-none">2</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">Utilizar a mesma balança em superfície nivelada.</p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="flex items-center justify-center rounded-full bg-red-500 text-white font-bold w-5 h-5 shrink-0 text-[11px] leading-none">3</p>
                    <div className="flex flex-col text-xs sm:text-sm font-semibold text-gray-700">
                        <p>Vestimenta mínima e consistente.</p>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">(preferencialmente apenas roupa íntima ou uniforme seco)</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <p className="flex items-center justify-center rounded-full bg-red-500 text-white font-bold w-5 h-5 shrink-0 text-[11px] leading-none">4</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">Secar o suor da pele com toalha antes da pesagem pós-exercício.</p>
                </div>
            </div>
        </div>
    );
}
