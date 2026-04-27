import type { ReactNode } from "react";

interface ICardAvaliacoes {
    nome: string;
    sudorese: number;
    data: Date;
    icone: ReactNode;
}
function formatarNum(numero: number): string {
    return String(numero).padStart(2, "0");
}
const meses = {
    "0": "Janeiro",
    "1": "Fevereiro",
    "2": "Março",
    "3": "Abril",
    "4": "Maio",
    "5": "Jun",
    "6": "Jul",
    "7": "Ago",
    "8": "Set",
    "9": "Out",
    "10": "Nov",
    "11": "Dez",
}

export default function CardAvaliacoes({ nome, data, icone, sudorese }: ICardAvaliacoes) {
    return (
        // caixa inteira
        <div className="flex flex-col  items-center justify-center gap-4 border  border-black rounded-xl bg-white px-10 py-6 w-150">
            <div>{icone} <p>Avaliações Recentes</p></div>
          
          {/* caixa individual */}
            <div className="flex items-center justify-center gap-4 border border-black rounded-xl bg-white px-10 py-6 w-130">
                {/* interno da caixa*/}
                <div>
                    {/* circulo*/}
                    <div className="w-15 h-15 rounded-full bg-[#d3d3d3] flex items-center justify-center border ">
                        <span className="text-[20px] text-[#555] font-medium border-[1px solid red]">
                            {nome[0]}
                        </span>
                    </div>
                    {/* nome e data */}
                    <p>{nome}</p>
                    <p>{data.getDate()} de {meses[data.getMonth()]}</p>
                    {/* Sudorese */}
                    <p>{sudorese} L/h</p>

                </div>
            </div>
        </div>
    );
}
