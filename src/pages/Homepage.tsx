import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";
import { icons } from "../utils/IconsJson";
import Topbar from "../components/Topbar";
import { Users } from "../mock/users";
import { useNavigate } from "react-router-dom";
import { getDashboard, getAvaliacoes, type DashboardResponse, type AvaliacaoResponse } from "../services/api";
import { getRole } from "../services/auth";

export default function Homepage() {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
    const [evaluations, setEvaluations] = useState<AvaliacaoResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const role = getRole();

    useEffect(() => {
        const fetchDashboardAndEvaluations = async () => {
            setLoading(true);
            try {
                const [dashRes, evalRes] = await Promise.all([
                    getDashboard(),
                    getAvaliacoes()
                ]);

                if (dashRes.data) {
                    setDashboardData(dashRes.data);
                }
                if (evalRes.data) {
                    setEvaluations(evalRes.data);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardAndEvaluations();
    }, []);

    // ─── DYNAMIC CHARTS COMPUTATIONS ───────────────────────────────────────
    const modalityMap: Record<string, { count: number; totalSweatRate: number }> = {};
    evaluations.forEach((evalItem) => {
        const mod = evalItem.modality || "Outro";
        if (!modalityMap[mod]) {
            modalityMap[mod] = { count: 0, totalSweatRate: 0 };
        }
        modalityMap[mod].count += 1;
        modalityMap[mod].totalSweatRate += evalItem.taxaSudorese || 0;
    });

    const totalEvals = evaluations.length;
    const modalityMetrics = Object.entries(modalityMap).map(([modality, data]) => ({
        modality,
        count: data.count,
        totalSweatRate: data.totalSweatRate,
        averageSweatRate: data.count > 0 ? Number((data.totalSweatRate / data.count).toFixed(2)) : 0,
        percentage: totalEvals > 0 ? Number(((data.count / totalEvals) * 100).toFixed(1)) : 0,
    })).sort((a, b) => b.count - a.count);

    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-400", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-orange-500"];
    const hexColors = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#6366f1", "#f97316"];

    // Determina a escala vertical (eixo Y) do gráfico de barras de sudorese
    const maxAverage = modalityMetrics.length > 0 ? Math.max(...modalityMetrics.map(m => m.averageSweatRate)) : 0;
    const maxScale = Math.max(maxAverage, 3.0);

    const scaleSteps = [
        maxScale,
        maxScale * 5 / 6,
        maxScale * 4 / 6,
        maxScale * 3 / 6,
        maxScale * 2 / 6,
        maxScale * 1 / 6,
        0
    ];

    // Conic gradient dinâmico em CSS puro para o gráfico donut
    let accumulatedDegrees = 0;
    const gradientParts = modalityMetrics.map((m, idx) => {
        const startDeg = accumulatedDegrees;
        const endDeg = accumulatedDegrees + (m.percentage / 100) * 360;
        accumulatedDegrees = endDeg;
        return `${hexColors[idx % hexColors.length]} ${startDeg}deg ${endDeg}deg`;
    });
    const conicGradientString = gradientParts.length > 0 ? `conic-gradient(${gradientParts.join(', ')})` : '';

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={0} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 pb-28 lg:pb-4 overflow-hidden">
                <div className="w-full max-w-[1800px] h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-5 flex flex-col gap-4">
                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Início" foto={Users.user1.foto} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {role === 'NUTRITIONIST' && (
                            <CardDashboard texto="Atletas" quantidade={dashboardData?.totalAtletas || 0} />
                        )}

                        <CardDashboard texto="Avaliações" quantidade={dashboardData?.totalAvaliacoes || 0} />

                        <button 
                            onClick={() => navigate('/nova-atividade')}
                            className="border border-gray-300 rounded-2xl sm:rounded-3xl bg-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-4 py-2 sm:py-4 hover:bg-gray-100 transition cursor-pointer min-h-[75px] sm:min-h-[110px]">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-red-200 flex items-center justify-center text-red-500 text-xl sm:text-3xl shrink-0">
                                +
                            </div>

                            <p className="text-[10px] sm:text-lg lg:text-2xl text-red-500 font-medium leading-tight text-center">
                                Nova Avaliação
                            </p>
                        </button>
                    </div>

                    {/* SEÇÃO DE GRÁFICOS DINÂMICOS E ESTADO DE ERRO/VAZIO */}
                    {loading ? (
                        <div className="border border-gray-300 rounded-3xl bg-white p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                            <div className="w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent animate-spin mb-4"></div>
                            <p className="text-gray-500 text-sm">Carregando painel de métricas...</p>
                        </div>
                    ) : evaluations.length === 0 ? (
                        <div className="border border-gray-300 rounded-3xl bg-white p-6 sm:p-10 flex flex-col items-center justify-center text-center min-h-[340px] shadow-sm">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-3xl sm:text-4xl mb-4 animate-pulse">
                                📊
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Dados gráficos indisponíveis</h3>
                            <p className="text-gray-500 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
                                {role === 'NUTRITIONIST' 
                                    ? "Os gráficos de taxa de sudorese média da equipe e distribuição por modalidade serão gerados assim que os atletas vinculados registrarem avaliações." 
                                    : "Monitore sua taxa de sudorese média, perda hídrica e comparativos por esporte registrando sua primeira atividade física."
                                }
                            </p>
                            {role === 'ATHLETE' && (
                                <button 
                                    onClick={() => navigate('/nova-atividade')}
                                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                                >
                                    + Registrar Primeira Atividade
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 2xl:grid-cols-[1.5fr_1fr] gap-4">
                            {/* GRÁFICO 1: TAXA DE SUDORESE MÉDIA POR MODALIDADE */}
                            <div className="border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 py-4 flex flex-col min-w-0 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="text-red-500 text-2xl sm:text-3xl shrink-0">
                                        {icons.grafico}
                                    </div>

                                    <p className="text-sm sm:text-lg lg:text-[20px] text-gray-800 font-medium leading-5 sm:leading-6">
                                        {role === 'NUTRITIONIST'
                                            ? "Taxa de Sudorese Média da Equipe Por Modalidade"
                                            : "Minha Taxa de Sudorese Média Por Modalidade"
                                        }
                                    </p>
                                </div>

                                <div className="flex flex-1">
                                    {/* EIXO Y (L/h) */}
                                    <div className="flex flex-col justify-between h-40 sm:h-52 lg:h-60 mr-2 text-gray-500 text-[10px] sm:text-xs lg:text-sm pb-6 sm:pb-8 shrink-0 select-none">
                                        <span className="font-semibold text-gray-400">L/h</span>
                                        {scaleSteps.map((step, idx) => (
                                            <span key={idx}>{step === 0 ? "0" : step.toFixed(1).replace(".", ",")}</span>
                                        ))}
                                    </div>

                                    <div className="relative flex-1 min-w-0">
                                        {/* BORDAS DE GRID */}
                                        <div className="absolute left-0 top-0 h-40 sm:h-52 lg:h-60 border-l border-gray-200"></div>
                                        <div className="absolute left-0 top-40 sm:top-52 lg:top-60 w-full border-b border-gray-200"></div>

                                        {/* BARRAS DE DADOS */}
                                        <div className="flex items-end justify-around h-40 sm:h-52 lg:h-60 pl-2 sm:pl-4 gap-2">
                                            {modalityMetrics.slice(0, 5).map((m, idx) => {
                                                const heightPct = maxScale > 0 ? (m.averageSweatRate / maxScale) * 100 : 0;
                                                return (
                                                    <div key={m.modality} className="flex flex-col items-center justify-end h-full flex-1 min-w-0">
                                                        <span className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-bold mb-1 sm:mb-2 whitespace-nowrap">
                                                            {m.averageSweatRate.toFixed(2).replace(".", ",")}
                                                        </span>

                                                        <div 
                                                            style={{ height: `${Math.max(3, heightPct)}%` }}
                                                            className={`w-full max-w-[60px] ${colors[idx % colors.length]} rounded-t-md transition-all duration-700 shadow-sm`}
                                                            title={`${m.modality}: ${m.averageSweatRate} L/h`}
                                                        ></div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* LEGENDAS DO EIXO X */}
                                        <div className="flex justify-around pl-2 sm:pl-4 mt-2 sm:mt-3 gap-2">
                                            {modalityMetrics.slice(0, 5).map((m) => (
                                                <p key={m.modality} className="text-[10px] sm:text-xs lg:text-sm text-gray-600 text-center flex-1 font-medium truncate" title={m.modality}>
                                                    {m.modality}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GRÁFICO 2: DISTRIBUIÇÃO DAS AVALIAÇÕES POR MODALIDADE */}
                            <div className="border border-gray-300 rounded-3xl bg-white px-3 sm:px-5 py-4 flex flex-col min-w-0 shadow-sm">
                                <div className="flex items-center gap-2 sm:gap-3 justify-center mb-4">
                                    <div className="text-red-500 text-xl sm:text-2xl lg:text-3xl shrink-0">
                                        {icons.grafico2}
                                    </div>

                                    <p className="text-sm sm:text-base lg:text-[20px] text-gray-800 font-medium leading-5 text-center">
                                        {role === 'NUTRITIONIST'
                                            ? "Distribuição das Avaliações por Modalidade"
                                            : "Minhas Avaliações por Modalidade"
                                        }
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8 flex-1 min-w-0">
                                    {/* DONUT CHART */}
                                    <div 
                                        style={{ background: conicGradientString }}
                                        className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full shrink-0 shadow-inner transition-all duration-700"
                                    >
                                        <div className="absolute inset-4 sm:inset-6 lg:inset-8 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                                            <span className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                                                Total
                                            </span>

                                            <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 leading-none">
                                                {totalEvals}
                                            </span>
                                        </div>
                                    </div>

                                    {/* BADGES / LIST OF MODALITIES */}
                                    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                        {modalityMetrics.slice(0, 5).map((m, idx) => (
                                            <div key={m.modality} className="flex items-center justify-between gap-3 min-w-0">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${colors[idx % colors.length]} shrink-0 shadow-sm`}></div>

                                                    <p className="text-[10px] sm:text-sm lg:text-base text-gray-700 font-medium truncate">
                                                        {m.modality} ({m.count})
                                                    </p>
                                                </div>

                                                <p className="text-[10px] sm:text-sm lg:text-base font-bold text-gray-500 shrink-0 font-mono">
                                                    {m.percentage.toFixed(1).replace(".", ",")}%
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="min-h-0 overflow-hidden">
                        {loading ? (
                            <p className="text-gray-500 p-4">Carregando avaliações...</p>
                        ) : (
                            <CardAvaliacoes
                                avaliacoes={evaluations.slice(0, 10).map(av => ({
                                    nome: av.atletaNome,
                                    data: new Date(av.dataAvaliacao),
                                    sudorese: av.taxaSudorese
                                })) || []}
                            />
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
