import { icons } from "../utils/IconsJson";

export default function Detectacao() {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-800 tracking-tight mb-2.5">
                <span className="w-5.5 h-5.5 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center text-[10px] shrink-0 font-sans">
                    {icons.negativo}
                </span>
                <p>Detecção de Inconsistências</p>
            </div>
            <div className="border border-gray-200/80 rounded-2xl p-3 sm:p-4.5 bg-white w-full flex flex-col gap-2.5 justify-center shadow-sm font-sans">
                <div className="bg-red-50/60 border border-red-100/70 rounded-xl text-red-600 text-center py-2 px-3 shadow-inner">
                    <p className="text-xs sm:text-sm font-bold">Taxa de sudorese &gt; 2.5 L/h</p>
                </div>
                <div className="bg-red-50/60 border border-red-100/70 rounded-xl text-red-600 text-center py-2 px-3 shadow-inner">
                    <p className="text-xs sm:text-sm font-bold">Variação de massa corporal &gt; 2%</p>
                    <p className="text-[10px] sm:text-xs text-red-500/80 font-semibold mt-0.5">(Risco de desidratação clínica)</p>
                </div>
                <div className="bg-red-50/60 border border-red-100/70 rounded-xl text-red-600 text-center py-2 px-3 shadow-inner">
                    <p className="text-xs sm:text-sm font-bold">Balanço hídrico positivo</p>
                    <p className="text-[10px] sm:text-xs text-red-500/80 font-semibold mt-0.5">(Risco de hiponatremia por superingestão)</p>
                </div>
            </div>
        </div>
    );
}
