import type { ReactNode } from "react";

interface IEscalaUrina {
    texto: string;
    icone?: ReactNode;
}

export default function EscalaUrina({ texto, icone }: IEscalaUrina) {
    return (
        <div>
            <div className="flex items-center gap-2 text-3xl  text-black mb-4">
                <span>{icone}</span>
                <p> Escala Visual </p>
               
            </div>
            <div className="border-2 rounded-3xl gap-3 py-8 w-300">
                <p className="text-center text-gray-600 text-lg mb-8">
                    Utilize para estimular o estado de hidratação basal do
                    atleta antes do início da sessão.
                </p>
                <div className="flex align-baseline justify-center items-center gap-15">
                    <div>Nível 1</div>
                    <div>Nível 2</div>
                    <div>Nível 3</div>
                    <div>Nível 4</div>
                    <div>Nível 5</div>
                    <div>Nível 6</div>
                    <div>Nível 7</div>
                    <div>Nível 8</div>
                </div>
                <div className=" flex align-baseline justify-center items-center gap-9">
                    <div className="bg-[#A7E7B6] border rounded-xl px-6 py-3 text-black-700 font-medium">
                        Níveis 1-3: Bem Hidratado
                    </div>
                    <div className="bg-[#F5EDB5] border rounded-xl px-6 py-3 text-black-700 font-medium">
                        Níveis 4-6: Desidratado
                    </div>
                    <div className="bg-[#F6A3A8] border rounded-xl px-6 py-3 text-black-700 font-medium">
                        Níveis 7-8: Severamente Desidratado
                    </div>
                </div>
            </div>
        </div>
    );
}
