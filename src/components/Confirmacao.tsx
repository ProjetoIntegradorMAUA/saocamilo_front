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
                <button className="border-2  px-5 py-2 rounded-xl border-gray-500 text-gray-500 cursor-pointer hover:bg-gray-200">{textob1}</button>
                <button className="border-2  px-5 py-2 rounded-xl border-red-500 text-red-500 cursor-pointer hover:bg-red-200 " >{textob2}</button>
            </div>
    </div>
    )
}