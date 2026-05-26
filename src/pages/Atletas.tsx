import Navbar from "../components/Navbar";
import Botao from "../components/Botao";
import CardAtleta from "../components/CardAtleta";
import Confirmacao from "../components/Confirmacao";
import { IoAddOutline, IoSearchOutline, IoPeopleOutline } from "react-icons/io5";
import { getAllAthletes, updateNutritionistTeam } from "../services/api";
import Topbar from "../components/Topbar";
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
    const [showManageTeamModal, setShowManageTeamModal] = useState(false);
    const [allAthletesForTeam, setAllAthletesForTeam] = useState<AthleteResponse[]>([]);
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
    const [loadingAllAthletes, setLoadingAllAthletes] = useState(false);
    const [isSavingTeam, setIsSavingTeam] = useState(false);

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

    const handleOpenManageTeam = async () => {
        setShowManageTeamModal(true);
        setLoadingAllAthletes(true);
        try {
            const res = await getAllAthletes();
            if (res.data) {
                setAllAthletesForTeam(res.data);
            }
            setSelectedTeamIds(atletas.map(a => a.id));
        } catch (error) {
            console.error("Erro ao carregar atletas para equipe:", error);
        } finally {
            setLoadingAllAthletes(false);
        }
    };

    const handleSaveTeam = async () => {
        setIsSavingTeam(true);
        try {
            const response = await updateNutritionistTeam(selectedTeamIds);
            if (response.error) {
                alert(`Erro ao salvar equipe: ${response.error}`);
            } else {
                alert("Equipe atualizada com sucesso!");
                setShowManageTeamModal(false);
                // Refresh the active athletes list
                const refreshed = await getAthletes();
                if (refreshed.data) {
                    setAtletas(refreshed.data);
                }
            }
        } catch (error) {
            console.error("Erro ao salvar equipe:", error);
            alert("Ocorreu um erro ao salvar equipe.");
        } finally {
            setIsSavingTeam(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden font-sans">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={1} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-4">

                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Atletas" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_2.5fr] gap-3">
                        <div className="w-full">
                            <CardDashboard texto="Atletas" quantidade={atletas.length} />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3 border border-gray-200/80 rounded-2xl bg-white p-3 sm:p-4 shadow-sm transition-all focus-within:border-red-300 focus-within:ring-1 focus-within:ring-red-200 w-full">
                            <div className="relative w-full flex-1">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                    <IoSearchOutline />
                                </span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Pesquise por um atleta..."
                                    className="w-full h-10 bg-gray-50/50 border border-gray-200/80 rounded-xl pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-red-300 transition-colors text-gray-700 placeholder:text-gray-400 font-semibold"
                                />
                            </div>

                            <div className="flex gap-2 shrink-0 w-full md:w-auto">
                                <div onClick={() => navigate("/adicionar-atleta")} className="flex-1 md:flex-none cursor-pointer">
                                    <Botao
                                        texto="Adicionar Atleta"
                                        icone={<IoAddOutline />}
                                        tela="/adicionar-atleta"
                                    />
                                </div>
                                <div onClick={handleOpenManageTeam} className="flex-1 md:flex-none cursor-pointer">
                                    <Botao
                                        texto="Gerenciar Equipe"
                                        icone={<IoPeopleOutline />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-5 shadow-sm min-h-[400px]">
                        <h2 className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight pb-3 border-b border-gray-100 mb-5">
                            Lista de Atletas
                        </h2>
                        
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-items-center">
                                {atletasFiltrados.length > 0 ? (
                                    atletasFiltrados.map((atleta) => (
                                        <CardAtleta 
                                            key={atleta.id} 
                                            nome={atleta.name} 
                                            onDelete={() => handleDeleteAthlete(atleta.id, atleta.name)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full py-16 text-center text-gray-400 text-xs sm:text-sm font-medium">
                                        Nenhum atleta encontrado.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {athleteToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
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

            {showManageTeamModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-5 sm:p-6 border border-gray-100 flex flex-col gap-4 animate-fadeIn">
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-0.5">Gerenciar Equipe</h2>
                            <p className="text-[11px] sm:text-xs text-gray-400 font-medium">Selecione quais atletas pertencem à sua equipe de monitoramento.</p>
                        </div>

                        {loadingAllAthletes ? (
                            <div className="flex items-center justify-center py-10">
                                <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50/50 space-y-1.5 scrollbar-thin">
                                {allAthletesForTeam.length > 0 ? (
                                    allAthletesForTeam.map(ath => {
                                        const isInTeam = selectedTeamIds.includes(ath.id);
                                        return (
                                            <label key={ath.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-colors font-semibold text-xs sm:text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={isInTeam}
                                                    onChange={() => {
                                                        setSelectedTeamIds(prev =>
                                                            prev.includes(ath.id)
                                                                ? prev.filter(id => id !== ath.id)
                                                                : [...prev, ath.id]
                                                        );
                                                    }}
                                                    className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                                                />
                                                <span className="truncate">{ath.name} ({ath.email})</span>
                                            </label>
                                        );
                                    })
                                ) : (
                                    <p className="text-xs text-gray-400 italic p-2 text-center">Nenhum atleta disponível no sistema.</p>
                                )}
                            </div>
                        )}

                        <div className="flex gap-2.5 pt-1">
                            <button
                                onClick={() => setShowManageTeamModal(false)}
                                className="flex-1 border border-gray-200 text-gray-500 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-xs sm:text-sm active:scale-95"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveTeam}
                                disabled={isSavingTeam}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-50 cursor-pointer text-xs sm:text-sm active:scale-95"
                            >
                                {isSavingTeam ? "Salvando..." : "Salvar Equipe"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

