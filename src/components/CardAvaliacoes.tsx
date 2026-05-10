// import type { ReactNode } from "react";
import { icons } from "../utils/IconsJson";

type AvaliacaoProps = {
    nome: string;
    data: Date;
    sudorese: number;
};

interface ICardAvaliacoes {
    // icone: ReactNode;
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
        <div className="flex flex-col gap-4 border border-gray-300 rounded-3xl bg-white px-6 py-5 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-3xl text-red-500">
                        {icons.calendario}
                    </div>

                    <p className="text-2xl text-black">Avaliações Recentes</p>
                </div>

                <button className="text-red-500 hover:underline cursor-pointer text-lg">
                    Ver todas
                </button>
            </div>

            {avaliacoes.map((avaliacao) => (
                <div
                    key={`${avaliacao.nome}-${avaliacao.data.toISOString()}-${avaliacao.sudorese}`}
                    className="grid grid-cols-[1fr_220px_220px] items-center border border-gray-300 rounded-2xl bg-white px-6 py-5 w-full gap-6"
                >
                    <div className="flex items-center gap-5 min-w-0">
                        <div className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
                            <span className="text-3xl text-gray-700">
                                {avaliacao.nome[0]}
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p className="text-2xl text-black truncate">
                                {avaliacao.nome}
                            </p>

                            <p className="text-lg text-gray-400">
                                {avaliacao.data.getDate()} de{" "}
                                {meses[avaliacao.data.getMonth()]}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <span className="text-xl text-gray-400">Sudorese:</span>

                        <span className="text-2xl text-green-500">
                            {avaliacao.sudorese} L/h
                        </span>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-white text-red-400 px-10 py-4 rounded-xl border border-red-400 hover:bg-gray-100 transition text-xl">
                            Visualizar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
