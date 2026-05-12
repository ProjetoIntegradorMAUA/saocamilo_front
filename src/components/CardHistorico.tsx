import { icons } from "../utils/IconsJson";

interface ICardHistorico {
    nome: string;
    horarioAtual: string;
    modalidade: string;
    duracao: string;
    sudorese: number;
    massa: number;
}

export default function CardHistorico({
    nome,
    horarioAtual,
    modalidade,
    duracao,
    sudorese,
    massa,
}: ICardHistorico) {
    const iniciais = nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2);

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] items-center gap-6 px-6 py-5 bg-white border-b border-gray-200">
            <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <span className="text-red-500 font-semibold text-xl">
                        {iniciais}
                    </span>
                </div>

                <div className="flex flex-col min-w-0">
                    <p className="text-[17px] font-semibold text-[#2b2b2b] truncate">
                        {nome}
                    </p>

                    <span className="text-sm text-gray-400">ID: 1024</span>
                </div>
            </div>

            <div className="flex flex-col">
                <span className="text-[17px] text-[#2b2b2b]">
                    {horarioAtual}
                </span>

                <span className="text-sm text-gray-400">22/05/2026</span>
            </div>

            <div>
                <div className="border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center w-fit">
                    <span className="text-[15px] text-gray-700">
                        {modalidade}
                    </span>
                </div>
            </div>

            <div className="text-[17px] text-[#2b2b2b]">{duracao}</div>

            <div className="text-[16px] text-[#2b2b2b]">{sudorese}%</div>

            <div className="text-red-500 font-medium text-[17px]">
                {massa}-x
            </div>

            <div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium w-fit">
                    Concluída
                </div>
            </div>

            <div className="flex justify-start">
                <button className="border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition whitespace-nowrap">
                    <span className="text-gray-500">{icons.download}</span>

                    <span className="text-sm text-gray-700">Exportar PDF</span>
                </button>
            </div>
            
        </div>
        

        
    );
}
