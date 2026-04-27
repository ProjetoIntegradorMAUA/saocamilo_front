import type {ReactNode} from "react";


interface ICardDashboard {
    texto: string;
    quantidade: number;
    icone: ReactNode;
    cor: string;
}

export default function CardDashboard({ texto, quantidade, icone, cor }: ICardDashboard) {
    return (
        <div className="flex items-center gap-4 border border-2 border-black rounded-xl bg-white px-10 py-6 w-fit">
            
            <div className={`flex items-center justify-center text-4xl ${cor}`}>
                {icone}
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-2xl font-medium">
                <p>{texto}</p>
                <p>- {quantidade}</p>
            </div>
        </div>
    )
}