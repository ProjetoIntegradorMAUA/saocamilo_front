import { icons } from "../utils/IconsJson";

interface ICardAtleta {
    nome: string;
}

export default function CardAtleta({ nome }: ICardAtleta) {
    return (
        <div className="w-40 h-47.5 bg-[#e9e9e9] border border-black rounded-xl flex flex-col items-center justify-between p-4 box-border font-sans">
            <div className="w-15 h-15 rounded-full bg-[#d3d3d3] flex items-center justify-center border">
                <span className="text-[20px] text-[#555] font-medium border-[1px solid red]">
                    {nome[0]}
                </span>
            </div>
            <p className="my-3 text-[20px] text-[#333] text-center">
                {nome}
            </p>
            <div className="w-full flex justify-between">
                <div className="text-[28px] w-8 h-8 rounded-md flex items-center justify-center cursor-pointer text-black">
                    {icons.editar}
                </div>
                <div className="text-[28px] w-8 h-8 rounded-md flex items-center justify-center cursor-pointer text-black">
                    {icons.lixeira}
                </div>
            </div>
        </div>
    );
}