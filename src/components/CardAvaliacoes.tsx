// import type { ReactNode } from "react";
import { icons } from "../utils/IconsJson";

type AvaliacaoProps = {
    nome: string;
    data: Date;
    sudorese: number;
}

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

export default function CardAvaliacoes({
    avaliacoes,
}: ICardAvaliacoes) {
    return (
        <div className="flex flex-col gap-6 border border-black rounded-2xl bg-[#f3f3f3] px-8 py-6 w-full max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-full">
                    <div className="text-xl sm:text-3xl text-gray-600">{icons.calendario}</div>
                    <p className="text-xl sm:text-2xl text-black">
                        Avaliações Recentes
                    </p>
                    <button className="text-green-500 hover:underline cursor-pointer ml-auto">
                        Ver todas
                    </button>
                </div>


            </div>

            {avaliacoes.map((avaliacao, index) => (
                <div
                    key={index}
                    className="grid grid-cols-[1fr_180px_160px] items-center border border-black rounded-2xl bg-white px-8 py-5 w-full"
                >
                    <div className="flex items-center gap-6 min-w-0">
                        <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center bg-white shrink-0">
                            <span className="text-3xl font-medium text-gray-700">
                                {avaliacao.nome[0]}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-0">
                            <p className="text-3xl font-medium text-black truncate">
                                {avaliacao.nome}
                            </p>
                            <p className="text-lg text-gray-400">
                                {avaliacao.data.getDate()} de{" "}
                                {meses[avaliacao.data.getMonth()]}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <p className="text-lg text-gray-400">Sudorese:</p>
                        <p className="text-2xl text-green-500 font-medium ">
                            {avaliacao.sudorese} L/h
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-white text-red-400 px-6 py-3 rounded-xl shadow-sm hover:bg-gray-100 transition">
                            Visualizar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}