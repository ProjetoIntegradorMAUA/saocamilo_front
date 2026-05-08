import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";


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

                        <button className="border border-gray-300 rounded-3xl bg-white flex items-center gap-5 px-6 py-6  hover:bg-gray-100 transition cursor-pointer">
                            <div className="w-16 h-16 rounded-full border border-red-300 flex items-center justify-center text-red-500 text-4xl ">
                                +
                            </div>

                            <p className="text-2xl text-red-500 font-medium">
                                Nova Avaliação
                            </p>
                        </button>
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
