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

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 overflow-hidden">
                <div className="w-full max-w-[1800px] h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-3xl p-2 sm:p-4 lg:p-5 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <CardDashboard texto="Atletas" quantidade={5} />

                        <CardDashboard texto="Avaliações" quantidade={8} />

                        <button className="border-2 border-gray-300 rounded-3xl bg-white flex items-center gap-3 px-4 py-4 hover:bg-gray-100 transition cursor-pointer min-h-[110px]">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-red-200 flex items-center justify-center text-red-500 text-3xl sm:text-4xl shrink-0">
                                +
                            </div>

                            <p className="text-lg sm:text-xl lg:text-2xl text-red-500 font-medium">
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

                                            <div className="w-full max-w-[70px] h-[55%] bg-blue-500 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,78
                                            </span>

                                            <div className="w-full max-w-[70px] h-[45%] bg-green-500 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,65
                                            </span>

                                            <div className="w-full max-w-[70px] h-[40%] bg-yellow-400 rounded-t-md"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-end h-full flex-1">
                                            <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                                                1,42
                                            </span>

                                            <div className="w-full max-w-[70px] h-[32%] bg-purple-500 rounded-t-md"></div>
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

                        <div className="border border-gray-300 rounded-3xl bg-white px-4 sm:px-5 py-4 flex flex-col min-w-0">
                            <div className="flex items-center gap-3 justify-center mb-5">
                                <div className="text-red-500 text-2xl sm:text-3xl shrink-0">
                                    {icons.grafico2}
                                </div>

                                <p className="text-base sm:text-lg lg:text-[20px] text-gray-800 font-medium leading-6 text-center">
                                    Distribuição das Avaliações por Modalidade
                                </p>
                            </div>

                            <div className="flex flex-col xl:flex-row items-center justify-center gap-6 flex-1">
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full bg-[conic-gradient(#1677ff_0deg_135deg,#4caf50_135deg_225deg,#ffb300_225deg_315deg,#6f2bd9_315deg_360deg)] shrink-0">
                                    <div className="absolute inset-7 sm:inset-8 bg-white rounded-full flex flex-col items-center justify-center">
                                        <span className="text-gray-500 text-sm sm:text-base">
                                            Total
                                        </span>

                                        <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 leading-none">
                                            8
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 bg-blue-500 mt-1"></div>

                                        <div>
                                            <p className="text-sm sm:text-base text-gray-700">
                                                Corrida (3)
                                            </p>

                                            <p className="text-sm sm:text-base text-gray-500">
                                                37,5%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 bg-green-500 mt-1"></div>

                                        <div>
                                            <p className="text-sm sm:text-base text-gray-700">
                                                Ciclismo (2)
                                            </p>

                                            <p className="text-sm sm:text-base text-gray-500">
                                                25,0%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 bg-yellow-400 mt-1"></div>

                                        <div>
                                            <p className="text-sm sm:text-base text-gray-700">
                                                Natação (2)
                                            </p>

                                            <p className="text-sm sm:text-base text-gray-500">
                                                25,0%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 bg-purple-600 mt-1"></div>

                                        <div>
                                            <p className="text-sm sm:text-base text-gray-700">
                                                Funcional (1)
                                            </p>

                                            <p className="text-sm sm:text-base text-gray-500">
                                                12,5%
                                            </p>
                                        </div>
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
