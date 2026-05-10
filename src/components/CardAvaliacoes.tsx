import { icons } from "../utils/IconsJson";

type AvaliacaoProps = {
    nome: string;
    data: Date;
    sudorese: number;
};

interface ICardAvaliacoes {
    avaliacoes: AvaliacaoProps[];
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

export default function CardAvaliacoes({ avaliacoes }: ICardAvaliacoes) {
    return (
        <div className="flex flex-col gap-3 sm:gap-4 border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 lg:px-6 py-4 sm:py-5 w-full overflow-hidden">

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="text-xl sm:text-2xl lg:text-3xl text-red-500 shrink-0">
                        {icons.calendario}
                    </div>

                    <p className="text-base sm:text-xl lg:text-2xl text-black truncate">
                        Avaliações Recentes
                    </p>
                </div>

                <button className="text-red-500 hover:underline cursor-pointer text-xs sm:text-sm lg:text-lg shrink-0">
                    Ver todas
                </button>
            </div>

            {avaliacoes.map((avaliacao) => (
                <div
                    key={`${avaliacao.nome}-${avaliacao.data.toISOString()}-${avaliacao.sudorese}`}
                    className="flex items-center justify-between border border-gray-300 rounded-2xl bg-white px-3 sm:px-5 py-3 sm:py-4 w-full gap-3 sm:gap-5"
                >

                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">

                        <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                            <span className="text-lg sm:text-2xl lg:text-3xl text-gray-700">
                                {avaliacao.nome[0]}
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm sm:text-lg lg:text-2xl text-black truncate">
                                {avaliacao.nome}
                            </p>

                            <p className="text-[11px] sm:text-sm lg:text-lg text-gray-400 truncate">
                                {avaliacao.data.getDate()} de{" "}
                                {meses[avaliacao.data.getMonth()]}
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-col items-end lg:items-start leading-tight shrink-0 lg:min-w-[180px]">

                        <span className="hidden lg:block text-xl text-gray-400">
                            Sudorese:
                        </span>

                        <span className="text-sm sm:text-lg lg:text-2xl text-green-500">
                            {avaliacao.sudorese.toFixed(2)} L/h
                        </span>

                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide lg:hidden">
                            Sudorese
                        </span>

                    </div>

                    <div className="shrink-0">
                        <button className="bg-white text-red-400 px-3 sm:px-5 lg:px-10 py-1.5 sm:py-2.5 lg:py-4 rounded-xl border border-red-400 hover:bg-gray-100 transition text-[10px] sm:text-sm lg:text-xl">
                            Visualizar
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}