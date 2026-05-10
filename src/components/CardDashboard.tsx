import { icons } from "../utils/IconsJson";

interface ICardDashboard {
    texto: string;
    quantidade: number;
}

export default function CardDashboard({ texto, quantidade }: ICardDashboard) {
    const atleta = texto === "Atletas";

    return (
        <div className="flex items-center gap-5 border border-gray-300 rounded-2xl bg-white px-5 py-4 w-full h-27.5">
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center text-3xl shrink-0
                ${atleta ? "border-red-200 text-red-500": "border-red-200 text-red-500"}`}>
                {atleta ? icons.usuario : icons.avaliacoes}
            </div>

            <div className="flex flex-col leading-none">
                <span className="text-gray-600 text-[18px] font-medium mb-2">
                    {texto}
                </span>

                <span className="text-[30px] font-semibold text-gray-900">
                    {quantidade}
                </span>
            </div>
        </div>
    );
}
