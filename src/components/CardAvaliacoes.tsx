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
        <div className="flex flex-col gap-3 sm:gap-4 border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 lg:px-6 py-4 sm:py-5 w-full overflow-hidden shadow-sm">

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="text-xl sm:text-2xl lg:text-3xl text-red-500 shrink-0">
                        {icons.calendario}
                    </div>

                    <p className="text-base sm:text-xl lg:text-2xl text-black truncate">
                        Avaliações Recentes
                    </p>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-red-50 hover:border-red-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                            aria-label="Página anterior"
                        >
                            ‹
                        </button>

                        <span className="text-xs sm:text-sm text-gray-400 font-medium select-none">
                            {page + 1} / {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-red-50 hover:border-red-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                            aria-label="Próxima página"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            {paginated.map((avaliacao) => {
                const dateObj = new Date(avaliacao.dataAvaliacao);
                return (
                    <div
                        key={avaliacao.avaliacaoId}
                        className="flex items-center justify-between border border-gray-300 rounded-2xl bg-white px-3 sm:px-5 py-3 sm:py-4 w-full gap-3 sm:gap-5 shadow-sm hover:shadow-md transition"
                    >

                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">

                            <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                                <span className="text-lg sm:text-2xl lg:text-3xl text-gray-700 font-medium">
                                    {avaliacao.atletaNome[0]}
                                </span>
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm sm:text-lg lg:text-2xl text-black truncate font-medium">
                                    {avaliacao.atletaNome}
                                </p>

                                <p className="text-[11px] sm:text-sm lg:text-lg text-gray-400 truncate">
                                    {dateObj.getDate()} de{" "}
                                    {meses[dateObj.getMonth()]}
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col items-end lg:items-start leading-tight shrink-0 lg:min-w-[180px]">

                            <span className="hidden lg:block text-xl text-gray-400">
                                Sudorese:
                            </span>

                            <span className="text-sm sm:text-lg lg:text-2xl text-green-500 font-bold">
                                {avaliacao.taxaSudorese.toFixed(2).replace(".", ",")} L/h
                            </span>

                            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide lg:hidden">
                                Sudorese
                            </span>

                        </div>

                        <div className="shrink-0">
                            <button
                                onClick={() => onView(avaliacao)}
                                className="bg-white text-red-400 px-3 sm:px-5 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 rounded-xl border border-red-400 hover:bg-red-500 hover:text-white transition text-[10px] sm:text-sm lg:text-xl cursor-pointer font-medium"
                            >
                                Visualizar
                            </button>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}