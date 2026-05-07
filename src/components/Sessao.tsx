
interface iSessao {
    PreDurantePos: string;
    Pergunta1: string;
    Pergunta2: string;
    Pergunta3: string;
    Pergunta4: string;
}


export default function Sessao({ PreDurantePos, Pergunta1, Pergunta2, Pergunta3, Pergunta4}: iSessao) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-2xl  text-gray-800">
                {PreDurantePos} Sessão:
            </span>

            <div className="flex flex-col gap-4 border border-gray-300 rounded-2xl bg-gray-50 p-4 w-80 shadow-sm">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 text-lg">{Pergunta1}</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl px-3 py-2  bg-white"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 text-lg">{Pergunta2}</label>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl px-3 py-2  bg-white"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 text-lg">{Pergunta3}</label>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl px-3 py-2  bg-white"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 text-lg">{Pergunta4}</label>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl px-3 py-2  bg-white"
                    />
                </div>
            </div>
        </div>
    );
    
}