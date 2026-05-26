import { icons } from "../utils/IconsJson";

interface ICardDashboard {
    texto: string;
    quantidade: number;
}

export default function CardDashboard({ texto, quantidade }: ICardDashboard) {
    const atleta = texto === "Atletas";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4.5 border border-gray-200/80 rounded-2xl bg-white px-3 sm:px-4.5 py-2 sm:py-3 w-full min-h-[60px] sm:min-h-[85px] text-center sm:text-left shadow-sm hover:shadow-md hover:border-red-200/50 transition-all duration-200">

            <div
                className={`w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center text-sm sm:text-xl lg:text-2xl shrink-0 transition-transform duration-300 hover:scale-105
                ${atleta ? "border-red-100 bg-red-50 text-red-500" : "border-red-100 bg-red-50 text-red-500"}`}
            >
                {atleta ? icons.usuario : icons.avaliacoes}
            </div>

            <div className="flex flex-col leading-none min-w-0">

                <span className="text-gray-400 text-[9px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 truncate">
                    {texto}
                </span>

                <span className="text-base sm:text-xl lg:text-[24px] font-bold text-gray-800 font-sans mt-0.5">
                    {quantidade}
                </span>

            </div>
        </div>
    );
}