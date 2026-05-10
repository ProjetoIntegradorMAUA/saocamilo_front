import { icons } from "../utils/IconsJson";

interface ICardDashboard {
    texto: string;
    quantidade: number;
}

export default function CardDashboard({ texto, quantidade }: ICardDashboard) {
    const atleta = texto === "Atletas";

    return (
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 border border-gray-300 rounded-2xl bg-white px-4 sm:px-5 py-4 w-full min-h-[95px] sm:min-h-[110px]">

            <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border flex items-center justify-center text-2xl sm:text-3xl shrink-0
                ${atleta ? "border-red-200 text-red-500" : "border-red-200 text-red-500"}`}
            >
                {atleta ? icons.usuario : icons.avaliacoes}
            </div>

            <div className="flex flex-col leading-none min-w-0">

                <span className="text-gray-600 text-sm sm:text-base lg:text-[18px] font-medium mb-2 truncate">
                    {texto}
                </span>

                <span className="text-2xl sm:text-[28px] lg:text-[30px] font-semibold text-gray-900">
                    {quantidade}
                </span>

            </div>
        </div>
    );
}