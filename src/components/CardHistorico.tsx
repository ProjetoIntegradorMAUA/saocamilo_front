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
    const iniciais = nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-4 px-4 lg:px-6 py-4 bg-white border-b border-gray-200 lg:items-center">

            <div className="flex items-center justify-between lg:justify-start gap-4 min-w-0 w-full">

                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <span className="text-red-500 font-semibold text-base">
                            {iniciais}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-[#2b2b2b] truncate">
                            {nome}
                        </p>

                        <span className="text-sm text-gray-400">
                            ID: 1024
                        </span>
                    </div>
                </div>

                <div className="lg:hidden text-right">
                    <span className="block text-sm font-medium text-[#2b2b2b]">
                        {horarioAtual}
                    </span>

                    <span className="text-xs text-gray-400">
                        {data}
                    </span>
                </div>

            </div>

            <div className="hidden lg:block min-w-0 w-full">
                <span className="block text-[15px] text-[#2b2b2b]">
                    {horarioAtual}
                </span>

                <span className="text-sm text-gray-400">
                    {data}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:contents">

                <div className="lg:hidden">
                    <p className="text-xs text-gray-400 mb-1">
                        Modalidade
                    </p>

                    <div className="border border-gray-200 rounded-xl px-3 py-2 flex items-center justify-center bg-white">
                        <span className="text-sm text-gray-700 truncate">
                            {modalidade}
                        </span>
                    </div>
                </div>

                <div className="hidden lg:flex min-w-0 w-full">
                    <div className="border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center w-fit max-w-full">
                        <span className="text-[15px] text-gray-700 whitespace-nowrap truncate">
                            {modalidade}
                        </span>
                    </div>
                </div>

                <div className="min-w-0 w-full">
                    <p className="text-xs text-gray-400 mb-1 lg:hidden">
                        Duração
                    </p>

                    <div className="text-[15px] text-[#2b2b2b] truncate">
                        {duracao}
                    </div>
                </div>

                <div className="min-w-0 w-full">
                    <p className="text-xs text-gray-400 mb-1 lg:hidden">
                        Sudorese
                    </p>

                    <div className="text-[15px] text-[#2b2b2b] truncate">
                        {sudorese}%
                    </div>
                </div>

                <div className="min-w-0 w-full">
                    <p className="text-xs text-gray-400 mb-1 lg:hidden">
                        Var. Massa
                    </p>

                    <div className="text-red-500 font-medium text-[15px] truncate">
                        {massa}-x
                    </div>
                </div>

                <div className="min-w-0 w-full">
                    <p className="text-xs text-gray-400 mb-1 lg:hidden">
                        Status
                    </p>

                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-xl text-sm font-medium w-fit truncate">
                        Concluída
                    </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-1 min-w-0 w-full">
                    <p className="text-xs text-gray-400 mb-1 lg:hidden">
                        Ações
                    </p>

                    <button className="border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition w-full lg:w-fit min-w-0">
                        <span className="text-gray-500">
                            {icons.download}
                        </span>

                        <span className="text-sm text-gray-700 whitespace-nowrap truncate">
                            Exportar PDF
                        </span>
                    </button>
                </div>

            </div>

        </div>
    );
}