import { icons } from "../utils/IconsJson";

interface ICardAtleta {
    nome: string;
    onDelete?: () => void;
    onEdit?: () => void;
}

export default function CardAtleta({ nome, onDelete, onEdit }: ICardAtleta) {
    return (
        <div className="w-full max-w-[240px] h-[320px] bg-white border border-gray-200 rounded-[32px] flex flex-col items-center pt-10 pb-6 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-red-100 bg-red-50 flex items-center justify-center text-red-500 transition-colors group-hover:bg-red-100">
                <span className="text-2xl font-semibold leading-none">
                    {nome[0]}
                </span>
            </div>

            <p className="mt-6 text-xl text-gray-800 font-medium text-center leading-tight wrap-break-words">
                {nome.split(' ')[0] + ' ' + nome.split(' ')[nome.split(' ').length - 1]}
            </p>

            <div className="w-full flex justify-around mt-auto pt-4 border-t border-gray-100">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.();
                    }}
                    className="text-3xl text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2">
                    {icons.editar}
                </button>

                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                    }}
                    className="text-3xl text-gray-400 hover:text-red-600 transition-colors cursor-pointer p-2">
                    {icons.lixeira}
                </button>
            </div>
        </div>
    );
}