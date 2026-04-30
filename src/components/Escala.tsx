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
            <div className="border-1 rounded-3xl gap-3 py-8 w-300 bg-white">
                <p className="text-center text-gray-600 text-lg mb-8">
                    Utilize para estimular o estado de hidratação basal do
                    atleta antes do início da sessão.
                </p>
                <div className="flex justify-center items-center gap-4 flex-wrap mb-8 ">
                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[#F4EDB7]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 1</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[#F2DA3D]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 2</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[#F5C400]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 3</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[rgb(230,175,0)]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 4</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[rgb(204,143,0)]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 5</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[#A96A00]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 6</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[#835012]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 7</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-28 h-20 rounded-2xl bg-[rgb(111,71,23)]"></div>
                        <p className="mt-2 text-lg font-medium">Nível 8</p>
                    </div>
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
