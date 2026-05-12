import { icons } from "../utils/IconsJson";

interface ICardDashboard {
    texto: string;
    quantidade: number;
}

export default function CardDashboard({ texto, quantidade }: ICardDashboard) {
    const atleta = texto === "Atletas";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 lg:gap-5 border border-gray-300 rounded-2xl bg-white px-2 sm:px-5 py-2 sm:py-4 w-full min-h-[75px] sm:min-h-[110px] text-center sm:text-left">

            <div
                className={`w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border flex items-center justify-center text-lg sm:text-3xl shrink-0
                ${atleta ? "border-red-200 text-red-500" : "border-red-200 text-red-500"}`}
            >
                {atleta ? icons.usuario : icons.avaliacoes}
            </div>

            <div className="flex flex-col leading-none min-w-0">

                <span className="text-gray-600 text-[10px] sm:text-base lg:text-[18px] font-medium mb-1 sm:mb-0.1 truncate">
                    {texto}
                </span>

                <span className="text-lg sm:text-[28px] lg:text-[30px] font-semibold text-gray-900">
                    {quantidade}
                </span>

            </div>
        </div>
    );
}