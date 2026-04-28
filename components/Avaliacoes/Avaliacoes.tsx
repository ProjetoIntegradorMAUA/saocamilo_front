import type { ReactNode } from "react";

interface ICardAvaliacoes {
    nome: string;
    sudorese: number;
    data: Date;
    icone: ReactNode;
}
function formatarNum(numero: number): string {
    return String(numero).padStart(2, "0");
}
const meses = {
    "0": "Janeiro",
    "1": "Fevereiro",
    "2": "Março",
    "3": "Abril",
    "4": "Maio",
    "5": "Junho",
    "6": "Julho",
    "7": "Agosto",
    "8": "Setembro",
    "9": "Outubro",
    "10": "Novembro",
    "11": "Dezembro",
};

export default function CardAvaliacoes({
    nome,
    data,
    icone,
    sudorese,
}: ICardAvaliacoes) {
    return (
        // caixa inteira
        <div className="flex flex-col gap-6 border border-black rounded-2xl bg-white px-8 py-6 w-full max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-4xl text-gray-600">{icone}</div>
                    <h2 className="text-4xl font-medium  text-black">
                        Avaliações Recentes
                    </h2>
                </div>
                <button className="text-green-500 text-xl font-medium ">
                    Ver todas
                </button>
            </div>
            <div className="flex items-center justify-between border border-black rounded-2xl bg-gray-200 px-8 py-5 w-full">
                <div className="flex items-center gap-6">
                  
                    <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center bg-white">
                        <span className="text-3xl font-medium text-gray-700">
                            {nome[0]}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-3xl font-medium text-black">
                            {nome}
                        </p>
                        <p className="text-lg text-gray-500">
                            {data.getDate()} de {meses[data.getMonth()]}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg text-gray-400">Sudorese:</p>
                    <p className="text-2xl text-green-500 font-medium">
                        {sudorese} L/h
                    </p>
                </div>
                <button className="bg-white text-red-400 px-6 py-3 rounded-xl ">
                    Visualizar
                </button>
            </div>
        </div>
    );
}
