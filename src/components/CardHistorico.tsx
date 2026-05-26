import { icons } from "../utils/IconsJson";

interface ICardHistorico {
    nome: string;
    horarioAtual: string;
    data: string;
    modalidade: string;
    duracao: string;
    sudorese: number;
    massa: number;
}

export default function CardHistorico({
    nome,
    horarioAtual,
    data,
    modalidade,
    duracao,
    sudorese,
    massa,
}: ICardHistorico) {
    // Determinar as iniciais (ex: João Silva -> JS)
    const nameParts = nome.trim().split(/\s+/);
    const initials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : nameParts[0][0].toUpperCase();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] items-center gap-4 px-4 lg:px-6 py-2.5 bg-white border-b border-gray-200/80 hover:bg-gray-50/60 transition duration-150 font-sans">

            {/* Atleta Info (Col 1) */}
            <div className="flex items-center justify-between lg:justify-start gap-4 min-w-0">

                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Avatar com gradiente */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-red-500 font-bold text-xs sm:text-sm tracking-wider">
                            {initials}
                        </span>
                    </div>

                    <div className="min-w-0 flex flex-col">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate leading-tight hover:text-red-500 transition-colors cursor-pointer">
                            {nome}
                        </p>

                        <span className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                            ID: 1024
                        </span>
                    </div>
                </div>

                {/* Mobile Horário */}
                <div className="lg:hidden text-right shrink-0">
                    <span className="block text-xs sm:text-sm font-semibold text-gray-800">
                        {horarioAtual}
                    </span>

                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                        {data}
                    </span>
                </div>

            </div>

            {/* Horário Desktop (Col 2) */}
            <div className="hidden lg:block">
                <span className="block text-xs sm:text-sm font-semibold text-gray-800">
                    {horarioAtual}
                </span>

                <span className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 block">
                    {data}
                </span>
            </div>

            {/* Rest of items wrapper for responsive layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:contents">

                {/* Modalidade (Col 3) */}
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Modalidade
                    </p>

                    <div className="border border-gray-200/80 bg-gray-50/50 rounded-lg px-2.5 py-1 flex items-center justify-center lg:justify-start w-fit shadow-inner">
                        <span className="text-xs font-semibold text-gray-600 truncate whitespace-nowrap">
                            {modalidade}
                        </span>
                    </div>
                </div>

                {/* Duração (Col 4) */}
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Duração
                    </p>

                    <div className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs text-gray-400 lg:hidden">{icons.relogio}</span>
                        {duracao}
                    </div>
                </div>

                {/* Sudorese (Col 5) */}
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Sudorese
                    </p>

                    <div className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs text-emerald-500">{icons.gota}</span>
                        {sudorese.toFixed(2).replace(".", ",")} L/h
                    </div>
                </div>

                {/* Var. Massa (Col 6) */}
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Var. Massa
                    </p>

                    <div className={`text-xs sm:text-sm font-bold ${massa > 0 ? 'text-red-500' : massa < 0 ? 'text-blue-500' : 'text-gray-500'}`}>
                        {massa > 0 ? `-${massa.toFixed(2).replace(".", ",")} kg` : massa < 0 ? `+${Math.abs(massa).toFixed(2).replace(".", ",")} kg` : "0,00 kg"}
                    </div>
                </div>

                {/* Status (Col 7) */}
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Status
                    </p>

                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-100/60 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold w-fit flex items-center gap-1 shadow-sm">
                        <span className="text-[9px] sm:text-[10px] text-emerald-500">{icons.check}</span>
                        Concluída
                    </div>
                </div>

                {/* Ações (Col 8) */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 lg:hidden">
                        Ações
                    </p>

                    <button className="border border-red-200 text-red-500 hover:bg-red-500 hover:text-white rounded-lg px-3 py-1.5 flex items-center justify-center gap-1.5 transition text-xs font-semibold cursor-pointer w-full lg:w-fit shadow-sm active:scale-95 duration-150">
                        <span className="text-[10px] sm:text-xs shrink-0">
                            {icons.download}
                        </span>

                        <span className="text-[11px] whitespace-nowrap">
                            PDF
                        </span>
                    </button>
                </div>

            </div>

        </div>
    );
}