import { icons } from "../utils/IconsJson";

interface ICardAtleta {
    nome: string;
}

export default function CardAtleta({ nome }: ICardAtleta) {
    return (
        <div className="w-[220px] h-[300px] bg-[#e9e9e9] border border-[#555] rounded-[24px] flex flex-col items-center pt-8 pb-6 px-5 shrink-0">
            <div className="w-[90px] h-[90px] rounded-full border border-[#777] bg-[#d9d9d9] flex items-center justify-center">
                <span className="text-[42px] font-light leading-none">
                    {nome[0]}
                </span>
            </div>

            <p className="mt-8 text-[20px] text-[#222] text-center leading-tight break-words">
                {nome}
            </p>

            <div className="w-full flex justify-around mt-auto">
                <button className="text-[38px] text-black">
                    {icons.editar}
                </button>

                <button className="text-[38px] text-black">
                    {icons.lixeira}
                </button>
            </div>
        </div>
    );
}