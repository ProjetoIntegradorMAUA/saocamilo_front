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
        <div className="flex flex-col gap-4 border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 lg:px-6 py-4 sm:py-5 w-full overflow-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="text-2xl sm:text-3xl text-red-500 shrink-0">
                        {icons.calendario}
                    </div>

                    <p className="text-lg sm:text-xl lg:text-2xl text-black truncate">
                        Avaliações Recentes
                    </p>
                </div>

                <button className="text-red-500 hover:underline cursor-pointer text-sm sm:text-base lg:text-lg self-start sm:self-auto">
                    Ver todas
                </button>
            </div>

            {avaliacoes.map((avaliacao) => (
                <div
                    key={`${avaliacao.nome}-${avaliacao.data.toISOString()}-${avaliacao.sudorese}`}
                    className="grid grid-cols-1 xl:grid-cols-[1fr_180px_180px] items-center border border-gray-300 rounded-2xl bg-white px-3 sm:px-5 py-4 w-full gap-4"
                >

                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                            <span className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
                                {avaliacao.nome[0]}
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p className="text-lg sm:text-xl lg:text-2xl text-black truncate">
                                {avaliacao.nome}
                            </p>

                            <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                                {avaliacao.data.getDate()} de{" "}
                                {meses[avaliacao.data.getMonth()]}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg lg:text-xl text-gray-400">
                            Sudorese:
                        </span>

                        <span className="text-lg sm:text-xl lg:text-2xl text-green-500">
                            {avaliacao.sudorese} L/h
                        </span>
                    </div>

                    <div className="flex xl:justify-end">
                        <button className="bg-white text-red-400 px-5 sm:px-7 lg:px-10 py-2 sm:py-3 rounded-xl border border-red-400 hover:bg-gray-100 transition text-sm sm:text-lg lg:text-xl w-full xl:w-auto">
                            Visualizar
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}