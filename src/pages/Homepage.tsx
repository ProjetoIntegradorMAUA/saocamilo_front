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

        <div className="relative w-[700px]">

            <div className="absolute left-0 top-0 h-[240px] border-l border-gray-300"></div>

            <div className="absolute left-0 top-[240px] w-full border-b border-gray-300"></div>

            <div className="flex items-end justify-around h-[240px] pl-6">

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        2,31
                    </span>

                    <div className="w-[95px] h-[185px] bg-blue-500 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,78
                    </span>

                    <div className="w-[95px] h-[142px] bg-green-500 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,65
                    </span>

                    <div className="w-[95px] h-[132px] bg-yellow-400 rounded-t-md"></div>
                </div>

                <div className="flex flex-col items-center justify-end h-full">
                    <span className="text-[12px] text-gray-700 font-medium mb-2">
                        1,42
                    </span>

                    <div className="w-[95px] h-[114px] bg-purple-500 rounded-t-md"></div>
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

    <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-3 h-3 bg-blue-500"></div>

        <p className="text-[12px] text-gray-500">
            Taxa média de sudorese (L/h)
        </p>
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
