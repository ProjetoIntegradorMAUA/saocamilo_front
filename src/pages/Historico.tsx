import { useState, useEffect } from "react";
import CardHistorico from "../components/CardHistorico";
import ComboBox from "../components/Combobox";
import Navbar from "../components/Navbar";
import { icons } from "../utils/IconsJson";
import { getAvaliacoes, type AvaliacaoResponse } from "../services/api";
import { openAvaliacaoPdf } from "../utils/reportPdf";

export default function Historico() {
    const [evaluations, setEvaluations] = useState<AvaliacaoResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [timeFilter, setTimeFilter] = useState("Todos");

    useEffect(() => {
        async function loadData() {
            try {
                const response = await getAvaliacoes();
                if (response.error) {
                    setError(response.error);
                } else if (response.data) {
                    setEvaluations(response.data);
                }
            } catch (err) {
                console.error("Erro ao buscar avaliações:", err);
                setError("Não foi possível conectar ao servidor. Verifique sua conexão.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const totalDurationSeconds = evaluations.reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
    const totalHours = Math.round(totalDurationSeconds / 3600);

    const pctVariations = evaluations.map(e => {
        if (!e.currentWeight || e.currentWeight === 0) return 0;
        const diff = e.currentWeight - e.finalWeight;
        return (diff / e.currentWeight) * 100;
    });
    const bestMassVariationPct = pctVariations.length > 0 ? Math.max(...pctVariations) : 0;

    const formatPct = (val: number) => {
        const prefix = val > 0 ? "+" : "";
        return `${prefix}${val.toFixed(1).replace(".", ",")}%`;
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
        }
        return `${minutes}min`;
    };

    const formatDateTime = (isoString: string) => {
        try {
            const dateObj = new Date(isoString);
            if (isNaN(dateObj.getTime())) {
                return { time: "--:--", date: "--/--/----" };
            }
            
            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");
            
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            
            return {
                time: `${hours}:${minutes}`,
                date: `${day}/${month}/${year}`
            };
        } catch {
            return { time: "--:--", date: "--/--/----" };
        }
    };

    const filteredEvaluations = evaluations.filter(av => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = (
            (av.atletaNome || "").toLowerCase().includes(term) ||
            (av.modality || "").toLowerCase().includes(term)
        );

        if (!matchesSearch) return false;
        if (timeFilter === "Todos" || !timeFilter) return true;

        const dateObj = new Date(av.dataAvaliacao);
        if (isNaN(dateObj.getTime())) return false;

        const now = new Date();
        const diffTime = Math.abs(now.getTime() - dateObj.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (timeFilter === "Hoje") {
            return (
                dateObj.getDate() === now.getDate() &&
                dateObj.getMonth() === now.getMonth() &&
                dateObj.getFullYear() === now.getFullYear()
            );
        } else if (timeFilter === "Últimos 7 dias") {
            return diffDays <= 7;
        } else if (timeFilter === "Últimos 30 dias") {
            return diffDays <= 30;
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={2} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-y-auto">
                <div className="w-full max-w-[1800px] min-h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col gap-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-200/50 pb-3">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight font-sans">
                                Histórico de Sessões
                            </h1>

                            <p className="text-gray-500 mt-1 text-xs sm:text-sm font-medium">
                                Acompanhe o desempenho dos atletas em cada sessão realizada.
                            </p>
                        </div>
                        <ComboBox
                            texto="Filtro"
                            placeholder="Todos"
                            options={["Todos", "Hoje", "Últimos 7 dias", "Últimos 30 dias"]}
                            value={timeFilter}
                            onChange={setTimeFilter}
                        />
                    </div>

                    {/* Compact Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-200/80 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center text-sm sm:text-xl shrink-0">
                                {icons.pessoas}
                            </div>

                            <div className="leading-none min-w-0">
                                <span className="text-gray-400 text-[9px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 block truncate">
                                    Sessões Realizadas
                                </span>

                                <span className="text-base sm:text-xl lg:text-[24px] font-bold text-gray-800 font-sans mt-0.5 block">
                                    {evaluations.length}
                                </span>

                                <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-1 block">
                                    no período
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200/80 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center text-sm sm:text-xl shrink-0">
                                {icons.relogio}
                            </div>

                            <div className="leading-none min-w-0">
                                <span className="text-gray-400 text-[9px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 block truncate">
                                    Tempo Total
                                </span>

                                <span className="text-base sm:text-xl lg:text-[24px] font-bold text-gray-800 font-sans mt-0.5 block">
                                    {totalHours}h
                                </span>

                                <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-1 block">
                                    de atividades
                                </span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200/80 rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center text-sm sm:text-xl shrink-0">
                                {icons.setinhaCrescimento}
                            </div>

                            <div className="leading-none min-w-0">
                                <span className="text-gray-400 text-[9px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 block truncate">
                                    Melhor Var. Massa
                                </span>

                                <span className="text-base sm:text-xl lg:text-[24px] font-bold text-gray-800 font-sans mt-0.5 block">
                                    {formatPct(bestMassVariationPct)}
                                </span>

                                <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-1 block">
                                    no período
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Compact Search Bar */}
                    <div className="bg-white border border-gray-200/80 rounded-xl px-4 py-2 flex items-center gap-2.5 w-full max-w-[420px] shadow-sm focus-within:border-red-300 focus-within:ring-1 focus-within:ring-red-200 transition-all">
                        <span className="text-gray-400 text-lg sm:text-xl shrink-0 flex items-center">
                            {icons.lupa}
                        </span>

                        <input
                            type="text"
                            placeholder="Buscar atleta ou sessão..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent outline-none text-xs sm:text-sm text-gray-700 placeholder:text-gray-400 font-semibold"
                        />
                    </div>
 
                    <div className="w-full rounded-2xl border border-gray-200/85 overflow-hidden bg-white shadow-sm">
                        {/* Desktop Header Grid */}
                        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1.2fr] items-center px-4 lg:px-6 py-3 bg-[#fafafa] border-b border-gray-200/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 gap-4">
                            <p>Atleta</p>
                            <p>Horário</p>
                            <p>Modalidade</p>
                            <p>Duração</p>
                            <p>Sudorese</p>
                            <p>Var. Massa</p>
                            <p>Status</p>
                            <p>Ações</p>
                        </div>
 
                        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#fafafa] border-b border-gray-200">
                            <div>
                                <h2 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-500">
                                    Histórico
                                </h2>
 
                                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                                    Sessões registradas
                                </p>
                            </div>
 
                            <button className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 transition">
                                Filtrar
                            </button>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-16">
                                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-16 text-red-500 font-semibold px-4">
                                {error}
                            </div>
                        )}

                        {!loading && !error && filteredEvaluations.length === 0 && (
                            <div className="text-center py-16 text-gray-500 font-semibold px-4">
                                {searchTerm || timeFilter !== "Todos" 
                                    ? "Nenhuma sessão corresponde aos filtros aplicados." 
                                    : "Nenhuma avaliação cadastrada."}
                            </div>
                        )}

                        {!loading && !error && filteredEvaluations.map((av) => {
                            const { time, date } = formatDateTime(av.dataAvaliacao);
                            const massLoss = (av.currentWeight || 0) - (av.finalWeight || 0);
                            return (
                                <CardHistorico
                                    key={av.avaliacaoId}
                                    nome={av.atletaNome}
                                    horarioAtual={time}
                                    data={date}
                                    modalidade={av.modality}
                                    duracao={formatDuration(av.durationSeconds)}
                                    sudorese={av.taxaSudorese}
                                    massa={parseFloat(massLoss.toFixed(2))}
                                    onExportPdf={() => openAvaliacaoPdf(av)}
                                />
                            );
                        })}

                        <div className="bg-gray-50/50 border-t border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-center sm:justify-start">
                            <p className="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider">
                                Mostrando {filteredEvaluations.length} de {evaluations.length} sessões
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
