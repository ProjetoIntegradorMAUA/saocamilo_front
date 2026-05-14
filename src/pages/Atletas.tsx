import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import CardAtleta from "../components/CardAtleta";
import { IoAddOutline, IoSearchOutline } from "react-icons/io5";
import Topbar from "../components/Topbar";
import { Users } from "../mock/users";
import CardDashboard from "../components/CardDashboard";
import { useNavigate } from "react-router-dom";

export default function Atletas() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={1} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">
                    
                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Atletas" foto={Users.user1.foto} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <CardDashboard texto="Atletas" quantidade={6} />
                        </div>
                        
                        <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4 border border-gray-300 rounded-2xl bg-white p-3 sm:p-4 shadow-sm transition-all focus-within:border-red-400 focus-within:shadow-md">
                            <div className="relative w-full">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                    <IoSearchOutline />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Pesquise por um atleta..."
                                    className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-5 text-lg outline-none focus:border-red-300 transition-colors"
                                />
                            </div>

                            <div className="shrink-0 w-full md:w-auto" onClick={() => navigate("/novoAtleta")}>
                                <Botao
                                    texto="Adicionar Atleta"
                                    icone={<IoAddOutline />}
                                    tela="/novoAtleta"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-100">
                            Lista de Atletas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                            <CardAtleta nome="Lucca Rodrigues" />
                            <CardAtleta nome="Caique Frassão" />
                            <CardAtleta nome="Diego Piol" />
                            <CardAtleta nome="Paulo Perasso" />
                            <CardAtleta nome="Enzo Chagas" />
                            <CardAtleta nome="Rafael Maistro" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

