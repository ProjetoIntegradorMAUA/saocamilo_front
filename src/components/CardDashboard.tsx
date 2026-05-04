import { icons } from "../utils/IconsJson";

interface ICardDashboard {
    texto: string;
    quantidade: number;
}

export default function CardDashboard({ texto, quantidade }: ICardDashboard) {
    return (
        <div className="flex items-center justify-center gap-4 border-2 border-black rounded-xl bg-white px-10 py-6 w-80">
            <div className={`flex items-center justify-center text-4xl text-${texto == "Atletas" ? "blue" : "green"}-500`}>
                {texto == "Atletas" ? icons.usuario : icons.avaliacoes}
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-2xl font-medium">
                <span>{texto} - {quantidade}</span>
            </div>
        </div>
    )
}