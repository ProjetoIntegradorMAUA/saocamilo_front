import { icons } from "../utils/IconsJson";

interface ICardHistorico {
    nome: string;
    horarioAtual: string
    modalidade: string;
    duracao: string;
    sudorese: number;
    massa: number;
}

export default function CardHistorico({ nome, horarioAtual, modalidade, duracao, sudorese, massa }: ICardHistorico) {
  return (
    <div className="w-full max-w-4xl bg-[#f3f3f6] p-3 rounded-md font-sans">
      <p className="text-[17px] text-[#333] mb-2 ml-1">
        {nome} - Horário: {horarioAtual}
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-6 shadow-sm">
        
        <div className="w-16 h-16 rounded-full bg-[#e0e0e0] flex items-center justify-center border border-gray-300 flex-shrink-0">
          <span className="scale-150">{icons.usuario}</span>
        </div>

        <div className="flex flex-1 justify-between items-start gap-4">
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#444]">Modalidade:</span>
            <div className="border border-gray-200 rounded-lg px-6 py-2 min-w-[110px] text-center text-[15px]">
              {modalidade}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#444]">Duração:</span>
            <div className="border border-gray-200 rounded-lg px-6 py-2 min-w-[110px] text-center text-[15px]">
              {duracao}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#444]">Sudorese:</span>
            <div className="border border-gray-200 rounded-lg px-6 py-2 min-w-[110px] text-center text-[15px]">
              {sudorese}%
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-[#444]">Var. Massa:</span>
            <div className="border border-gray-200 rounded-lg px-6 py-2 min-w-[110px] text-center text-[15px]">
              {massa}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
