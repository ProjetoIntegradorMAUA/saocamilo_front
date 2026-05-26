import { useState } from "react";
import { icons } from "../utils/IconsJson";
import { type AvaliacaoResponse } from "../services/api";

interface ICardAvaliacoes {
    avaliacoes: AvaliacaoResponse[];
    onView: (avaliacao: AvaliacaoResponse) => void;
}

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const PAGE_SIZE = 5;

export default function CardAvaliacoes({ avaliacoes, onView }: ICardAvaliacoes) {
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(avaliacoes.length / PAGE_SIZE);
    const paginated = avaliacoes.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    return (
        <div className="flex flex-col gap-4 border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-5 w-full overflow-hidden shadow-sm font-sans">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-red-500 text-lg sm:text-xl shrink-0 flex items-center">
                        {icons.calendario}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">
                        Avaliações Recentes
                    </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 bg-gray-100/85 px-2.5 py-0.5 rounded-full">
                    Últimas {avaliacoes.length}
                </span>
            </div>

            <div className="flex flex-col divide-y divide-gray-100 max-h-[380px] overflow-y-auto pr-1 select-none scrollbar-thin">
                {avaliacoes.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 text-xs sm:text-sm">
                        Nenhuma avaliação recente encontrada.
                    </div>
                ) : (
                    avaliacoes.map((avaliacao) => {
                        const dateObj = new Date(avaliacao.dataAvaliacao);
                        
                        // Determinar as iniciais (ex: João Silva -> JS ou apenas J)
                        const nameParts = avaliacao.atletaNome.trim().split(/\s+/);
                        const initials = nameParts.length > 1 
                            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                            : nameParts[0][0].toUpperCase();

                        return (
                            <div
                                key={avaliacao.avaliacaoId}
                                className="flex items-center justify-between py-2.5 sm:py-3 px-1 sm:px-2 w-full gap-3 hover:bg-gray-50/60 rounded-xl transition duration-150"
                            >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    {/* Avatar com gradiente suave */}
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center shrink-0 shadow-sm">
                                        <span className="text-xs sm:text-sm text-red-500 font-bold tracking-wider">
                                            {initials}
                                        </span>
                                    </div>

                                    {/* Informações do Atleta */}
                                    <div className="min-w-0 flex flex-col justify-center">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate leading-tight hover:text-red-500 transition-colors">
                                            {avaliacao.atletaNome}
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-400 truncate mt-0.5 font-medium">
                                            {dateObj.getDate()} de {meses[dateObj.getMonth()]}
                                        </p>
                                    </div>
                                </div>

                                {/* Valor de Sudorese styled as a modern badge */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="flex flex-col items-end sm:items-start justify-center">
                                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                            <span className="text-emerald-500 text-[10px] sm:text-xs shrink-0 flex items-center">
                                                {icons.gota}
                                            </span>
                                            {avaliacao.taxaSudorese.toFixed(2).replace(".", ",")} L/h
                                        </span>
                                    </div>
                                </div>

                                {/* Botão compact e moderno */}
                                <div className="shrink-0">
                                    <button 
                                        onClick={() => onView(avaliacao)}
                                        className="bg-white text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-500 transition text-[11px] sm:text-xs font-semibold cursor-pointer shadow-sm active:scale-95"
                                    >
                                        Visualizar
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}