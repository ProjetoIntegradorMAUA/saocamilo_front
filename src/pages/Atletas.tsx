import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import CardAtleta from "../components/CardAtleta";
import Confirmacao from "../components/Confirmacao";
import { IoAddOutline, IoSearchOutline } from "react-icons/io5";
import Topbar from "../components/Topbar";
import { Users } from "../mock/users";
import CardDashboard from "../components/CardDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAthletes, deleteAthlete, type AthleteResponse } from "../services/api";
import { getRole } from "../services/auth";

export default function Atletas() {
    const navigate = useNavigate();
    const [atletas, setAtletas] = useState<AthleteResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [athleteToDelete, setAthleteToDelete] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        const role = getRole();
        if (role !== "NUTRITIONIST") {
            navigate("/homepage");
            return;
        }

        const fetchAtletas = async () => {
            setLoading(true);
            const response = await getAthletes();
            if (response.data) {
                setAtletas(response.data);
            }
            setLoading(false);
        };
        fetchAtletas();
    }, [navigate]);

    const atletasFiltrados = atletas.filter(atleta =>
        atleta.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteAthlete = (athleteId: string, athleteName: string) => {
        setAthleteToDelete({ id: athleteId, name: athleteName });
    };
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={1} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-450 min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-6">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Atletas" foto={Users.user1.foto} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <CardDashboard texto="Atletas" quantidade={atletas.length} />
                        </div>

                        <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4 border border-gray-300 rounded-2xl bg-white p-3 sm:p-4 shadow-sm transition-all focus-within:border-red-400 focus-within:shadow-md">
                            <div className="relative w-full">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                                    <IoSearchOutline />
                                </span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                            {loading ? (
                                <p className="col-span-full text-gray-500">Carregando atletas...</p>
                            ) : atletasFiltrados.length > 0 ? (
                                atletasFiltrados.map((atleta) => (
                                    <CardAtleta 
                                        key={atleta.id} 
                                        nome={atleta.name} 
                                        onDelete={() => handleDeleteAthlete(atleta.id, atleta.name)}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-gray-500">Nenhum atleta encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {athleteToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                    <Confirmacao
                        texto={`Tem certeza que deseja excluir o atleta "${athleteToDelete.name}"?`}
                        onCancel={() => setAthleteToDelete(null)}
                        onConfirm={async () => {
                            const athleteId = athleteToDelete.id;
                            const athleteName = athleteToDelete.name;
                            setAthleteToDelete(null);
                            try {
                                const response = await deleteAthlete(athleteId);
                                if (response.error) {
                                    alert(`Erro ao excluir atleta: ${response.error}`);
                                } else {
                                    alert(`Atleta "${athleteName}" excluído com sucesso!`);
                                    setAtletas(prev => prev.filter(a => a.id !== athleteId));
                                }
                            } catch (error) {
                                console.error("Erro ao deletar atleta:", error);
                                alert("Ocorreu um erro inesperado ao excluir o atleta.");
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

