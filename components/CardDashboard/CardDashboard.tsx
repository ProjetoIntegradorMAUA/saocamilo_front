import type {ReactNode} from "react";


interface ICardDashboard {
    texto: string;
    quantidade: number;
    icone: ReactNode;
}

export default function ICardDashboard({ texto, quantidade, icone}: ICardDashboard) {
    return (
        <div className="flex border white">
            <div className="esquerda">{icone}</div>
            <div className="direita">
                <p>{texto}</p>
                <p>{quantidade}</p>
            </div>
        </div>
    )
}