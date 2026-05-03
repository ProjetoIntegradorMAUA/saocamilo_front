import type { ReactNode } from "react";

interface iConfirmacao {
    texto: string;
    textob1: string;
    textob2: string;
}

export default function Confirmacao({ texto, textob1, textob2} : iConfirmacao) {
    return (<div className="flex flex-col items-center justify-center gap-4 border-4 border-gray-400 rounded-xl bg-white px-10 py-6 w-80">
            <div className="text-black text-center font-bold">
                {texto}
            </div>
            <div className="flex gap-8">
                <button className="border-2  px-4 rounded-3x1 border-b-gray-400">{textob1}</button>
                <button className="border-2  px-4 rounded-2x1 border-red-500">{textob2}</button>
            </div>
    </div>
    )
}