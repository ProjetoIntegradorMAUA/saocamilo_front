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
        <div className="flex flex-col gap-3 border border-black rounded-2xl bg-[#f3f3f3] px-3 py-4 md:px-8 md:py-6 lg:px-6 lg:py-5 w-full max-w-4xl">
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
                    className="grid grid-cols-12 items-center border border-black rounded-2xl bg-[#ffffff] px-8 py-5"
                >
                    <div className="flex items-center gap-3 w-40 sm:w-60 md:w-72 col-span-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full border border-black flex items-center justify-center bg-white shrink-0">
                            <span className="sm:text-xl md:text-2xl lg:text-3xl text-gray-700">
                                {avaliacao.nome[0]}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-0">
                            <p className="sm:text-xl  text-black truncate">
                                {avaliacao.nome}
                            </p>
                            <p className="text-sm text-gray-400">
                                {avaliacao.data.getDate()} de{" "}
                                {meses[avaliacao.data.getMonth()]}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-3 items-center md:items-start col-span-6 md:col-span-3 ml-auto md:ml-0">
                        <span className="sm:text-xl text-gray-400">Sudorese: </span>
                        <span className="text-sm md:text-lg text-green-500">
                            {avaliacao.sudorese} L/h
                        </span>
                    </div>

                    <div className="hidden md:block ml-auto col-span-3">
                        <button className="bg-white text-red-400 px-6 py-3 rounded-xl shadow-sm hover:bg-gray-100 transition">
                            Visualizar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}