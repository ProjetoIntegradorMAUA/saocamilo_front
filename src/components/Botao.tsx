import type { ReactNode } from "react";

interface IBotao {
    texto: string;
    icone?: ReactNode;
}

export default function Botao({ texto, icone }: IBotao) {
    return (
        <div>
            <button className="flex items-center gap-2 px-3.5 py-2 border border-red-500 bg-white text-red-500 rounded-lg cursor-pointer">
                {icone && (
                    <span className="flex items-center justify-center w-4.5 h-4.5 border border-[#ff4d4f] rounded-full text-sm font-bold leading-none">
                        {icone}
                    </span>
                )}

                {texto}
            </button>
        </div>
    );
}