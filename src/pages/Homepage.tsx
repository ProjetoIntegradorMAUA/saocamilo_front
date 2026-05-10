import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";
import { icons } from "../utils/IconsJson";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={0} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-hidden">
                <div className="w-full max-w-[1800px] h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <CardDashboard texto="Atletas" quantidade={5} />

                        <CardDashboard texto="Avaliações" quantidade={8} />

                        <button className="border-1 border-gray-300 rounded-2xl sm:rounded-3xl bg-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 sm:py-4 hover:bg-gray-100 transition cursor-pointer min-h-[75px] sm:min-h-[110px]">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-red-200 flex items-center justify-center text-red-500 text-xl sm:text-3xl shrink-0">
                                +
                            </div>

                            <p className="text-[10px] sm:text-lg lg:text-2xl text-red-500 font-medium leading-tight text-center">
                                Nova Avaliação
                            </p>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 2xl:grid-cols-[1.5fr_1fr] gap-4">
                        <div className="border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 py-4 flex flex-col min-w-0">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="text-red-500 text-2xl sm:text-3xl shrink-0">
                                    {icons.grafico}
                                </div>

                                <p className="text-sm sm:text-lg lg:text-[20px] text-gray-800 font-medium leading-5 sm:leading-6">
                                    Taxa de Sudorese Média da Equipe Por
                                    Modalidade
                                </p>
                            </div>

                            <div className="flex flex-1">
                                <div className="flex flex-col justify-between h-40 sm:h-52 lg:h-60 mr-2 text-gray-500 text-[10px] sm:text-xs lg:text-sm pb-6 sm:pb-8 shrink-0">
                                    <span>L/h</span>
                                    <span>3,0</span>
                                    <span>2,5</span>
                                    <span>2,0</span>
                                    <span>1,5</span>
                                    <span>1,0</span>
                                    <span>0,5</span>
                                    <span>0</span>
                                </div>

                                <div className="relative flex-1 min-w-0">
                                    <div className="absolute left-0 top-0 h-40 sm:h-52 lg:h-60 border-l border-gray-300"></div>

                                    <div className="absolute left-0 top-40 sm:top-52 lg:top-60 w-full border-b border-gray-300"></div>

                                    <div className="flex items-end justify-around h-40 sm:h-52 lg:h-60 pl-2 sm:pl-4 gap-2">
                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                2,31
                                            </span>

                                            <div className="w-full max-w-[70px] h-[67%] bg-blue-500 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,78
                                            </span>

                                            <div className="w-full max-w-[70px] h-[57%] bg-green-500 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,65
                                            </span>

                                            <div className="w-full max-w-[70px] h-[54%] bg-yellow-400 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,42
                                            </span>

                                            <div className="w-full max-w-[70px] h-[50%] bg-purple-500 rounded-t-md"></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-around pl-2 sm:pl-4 mt-2 sm:mt-3 gap-2">
                                        <p className="text-[10px] sm:text-xs lg:text-base text-gray-600 text-center flex-1">
                                            Corrida
                                        </p>

                                        <p className="text-[10px] sm:text-xs lg:text-base text-gray-600 text-center flex-1">
                                            Ciclismo
                                        </p>

                                        <p className="text-[10px] sm:text-xs lg:text-base text-gray-600 text-center flex-1">
                                            Natação
                                        </p>

                                        <p className="text-[10px] sm:text-xs lg:text-base text-gray-600 text-center flex-1">
                                            Funcional
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 py-4 flex flex-col min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 justify-center mb-4">
                                <div className="text-red-500 text-xl sm:text-2xl lg:text-3xl shrink-0">
                                    {icons.grafico2}
                                </div>

                                <p className="text-sm sm:text-base lg:text-[20px] text-gray-800 font-medium leading-5 text-center">
                                    Distribuição das Avaliações por Modalidade
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8 flex-1 min-w-0">
                                <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-52 lg:h-52 rounded-full bg-[conic-gradient(#1677ff_0deg_135deg,#4caf50_135deg_225deg,#ffb300_225deg_315deg,#6f2bd9_315deg_360deg)] shrink-0">
                                    <div className="absolute inset-4 sm:inset-6 lg:inset-8 bg-white rounded-full flex flex-col items-center justify-center">
                                        <span className="text-gray-500 text-[10px] sm:text-sm lg:text-base">
                                            Total
                                        </span>

                                        <span className="text-lg sm:text-3xl lg:text-5xl font-semibold text-gray-800 leading-none">
                                            8
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-5 min-w-0">
                                    <div className="flex items-center justify-between gap-3 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 shrink-0"></div>

                                            <p className="text-[10px] sm:text-sm lg:text-base text-gray-700 truncate">
                                                Corrida (3)
                                            </p>
                                        </div>

                                        <p className="text-[10px] sm:text-sm lg:text-base text-gray-500 shrink-0">
                                            37,5%
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 shrink-0"></div>

                                            <p className="text-[10px] sm:text-sm lg:text-base text-gray-700 truncate">
                                                Ciclismo (2)
                                            </p>
                                        </div>

                                        <p className="text-[10px] sm:text-sm lg:text-base text-gray-500 shrink-0">
                                            25,0%
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 shrink-0"></div>

                                            <p className="text-[10px] sm:text-sm lg:text-base text-gray-700 truncate">
                                                Natação (2)
                                            </p>
                                        </div>

                                        <p className="text-[10px] sm:text-sm lg:text-base text-gray-500 shrink-0">
                                            25,0%
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 shrink-0"></div>

                                            <p className="text-[10px] sm:text-sm lg:text-base text-gray-700 truncate">
                                                Funcional (1)
                                            </p>
                                        </div>

                                        <p className="text-[10px] sm:text-sm lg:text-base text-gray-500 shrink-0">
                                            12,5%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-0 overflow-hidden">
                        <CardAvaliacoes
                            avaliacoes={[
                                {
                                    nome: "Diego Piol",
                                    data: new Date("2026-05-01"),
                                    sudorese: 2.1,
                                },
                                {
                                    nome: "Lucca Rodrigues",
                                    data: new Date("2026-05-01"),
                                    sudorese: 1.8,
                                },
                                {
                                    nome: "Caíque Frassão",
                                    data: new Date("2026-05-01"),
                                    sudorese: 2.4,
                                },
                            ]}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
