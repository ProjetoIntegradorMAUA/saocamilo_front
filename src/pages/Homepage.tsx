import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";
import { icons } from "../utils/IconsJson";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex ">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:z-auto">
                <Navbar index={0} />
            </div>
            <main className="flex-1 lg:ml-60 px-3 sm:px-6 py-2 sm:py-6 flex justify-center">
                <div className="w-98% sm:w-full max-w-350 bg-transparent sm:bg-[#e9e9ed] rounded-3xl px-1 sm:px-6 py-2 sm:py-6 mx-auto sm:mx-4 transform scale-90 sm:scale-100 origin-top">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        <CardDashboard texto="Atletas" quantidade={5} />
                        <CardDashboard texto="Avaliações" quantidade={8} />

                        <button className="border-2 border-gray-300 rounded-3xl bg-white flex items-center gap-5 px-6 py-6  hover:bg-gray-100 transition cursor-pointer">
                            <div className="w-16 h-16 rounded-full border border-red-300 flex items-center justify-center text-red-500 text-4xl ">
                                +
                            </div>

                            <p className="text-2xl text-red-500 font-medium">
                                Nova Avaliação
                            </p>
                        </button>
                    </div>

<div className="border border-gray-300 rounded-3xl bg-white px-6 py-5 mb-5 w-fit">
    <div className="flex items-center gap-3 mb-8">
        <div className="text-red-500 text-3xl">
            {icons.grafico}
        </div>

        <p className="text-[18px] text-gray-800 font-medium">
            Taxa de Sudorese Média da Equipe Por Modalidade
        </p>
    </div>

    <div className="flex">

        <div className="flex flex-col justify-between h-[280px] mr-4 text-gray-500 text-[12px] pb-[40px]">
            <span>L/h</span>
            <span>3,0</span>
            <span>2,5</span>
            <span>2,0</span>
            <span>1,5</span>
            <span>1,0</span>
            <span>0,5</span>
            <span>0</span>
        </div>

        <div className="relative w-175">

            <div className="absolute left-0 top-0 h-60 border-l border-gray-300"></div>

            <div className="absolute left-0 top-60 w-full border-b border-gray-300"></div>

            <div className="flex items-end justify-around h-60 pl-6">

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        2,31
                    </span>

                    <div className="w-23.75 h-39 bg-blue-500 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,78
                    </span>

                    <div className="w-23.75 h-32 bg-green-500 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,65
                    </span>

                    <div className="w-23.75 h-30 bg-yellow-400 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,42
                    </span>

                    <div className="w-23.75 h-25 bg-purple-500 rounded-t-md"></div>
                </div>

            </div>

            <div className="flex justify-around pl-6 mt-4">
                <p className="text-[13px] text-gray-600">Corrida</p>
                <p className="text-[13px] text-gray-600">Ciclismo</p>
                <p className="text-[13px] text-gray-600">Natação</p>
                <p className="text-[13px] text-gray-600">Funcional</p>
            </div>
        </div>
    </div>

</div>  
<div className="border border-gray-300 rounded-3xl bg-white px-6 py-5 w-fit">

    <p className="text-[20px] text-gray-800 font-medium text-center leading-7 mb-6">
        Distribuição das Avaliações <br />
        por Modalidade
    </p>

    <div className="flex items-center gap-10">

        <div className="relative w-55 h-55 rounded-full bg-[conic-gradient(#1677ff_0deg_135deg,#4caf50_135deg_225deg,#ffb300_225deg_315deg,#6f2bd9_315deg_360deg)]">

            <div className="absolute inset-9.5 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-gray-500 text-[16px]">
                    Total
                </span>

                <span className="text-[40px] font-semibold text-gray-800 leading-none">
                    8
                </span>
            </div>
        </div>

        <div className="flex flex-col gap-4">

            <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-blue-500 mt-1"></div>

                <div>
                    <p className="text-[18px] text-gray-700 leading-5">
                        Corrida (3)
                    </p>

                    <p className="text-[18px] text-gray-500">
                        37,5%
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-green-500 mt-1"></div>

                <div>
                    <p className="text-[18px] text-gray-700 leading-5">
                        Ciclismo (2)
                    </p>

                    <p className="text-[18px] text-gray-500">
                        25,0%
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-yellow-400 mt-1"></div>

                <div>
                    <p className="text-[18px] text-gray-700 leading-5">
                        Natação (2)
                    </p>

                    <p className="text-[18px] text-gray-500">
                        25,0%
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-purple-600 mt-1"></div>

                <div>
                    <p className="text-[18px] text-gray-700 leading-5">
                        Funcional (1)
                    </p>

                    <p className="text-[18px] text-gray-500">
                        12,5%
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>

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
            </main>
        </div>
    );
}
