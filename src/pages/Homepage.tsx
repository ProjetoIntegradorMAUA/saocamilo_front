import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardAvaliacoes from "../components/CardAvaliacoes";
import CardDashboard from "../components/CardDashboard";
import { icons } from "../utils/IconsJson";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import { getDashboard, getAvaliacoes, type DashboardResponse, type AvaliacaoResponse } from "../services/api";
import { getRole } from "../services/auth";

const formatFullDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) {
        return `${hrs}h ${mins.toString().padStart(2, "0")}m`;
    }
    return `${mins} min`;
};

const getUrineColorHex = (score: number) => {
    const colors: Record<number, string> = {
        1: "#F9F9FB",
        2: "#FFFDE6",
        3: "#FFF9B3",
        4: "#FFF066",
        5: "#E6D000",
        6: "#B39C00",
        7: "#806D00",
        8: "#4D4100"
    };
    return colors[score] || "#FFFDE6";
};

const getUrineColorLabel = (score: number) => {
    if (score <= 3) return "Bem Hidratado(a)";
    if (score <= 5) return "Desidratação Leve/Moderada";
    return "Desidratação Severa";
};

export default function Homepage() {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
    const [evaluations, setEvaluations] = useState<AvaliacaoResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAvaliacao, setSelectedAvaliacao] = useState<AvaliacaoResponse | null>(null);
    
    // Interactive states
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);
    const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);
    const [hoveredTrendPoint, setHoveredTrendPoint] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'rate' | 'count'>('count');

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
    })).sort((a, b) => sortBy === 'rate' ? b.averageSweatRate - a.averageSweatRate : b.count - a.count);

    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-400", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-orange-500"];
    const hexColors = ["#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#6366f1", "#f97316"];

    const maxAverage = modalityMetrics.length > 0 ? Math.max(...modalityMetrics.map(m => m.averageSweatRate)) : 0;
    const maxScale = Math.max(maxAverage, 3.0);

    const scaleSteps = [
        maxScale,
        maxScale * 4 / 5,
        maxScale * 3 / 5,
        maxScale * 2 / 5,
        maxScale * 1 / 5,
        0
    ];

    let accumulatedDegrees = 0;
    const gradientParts = modalityMetrics.map((m, idx) => {
        const startDeg = accumulatedDegrees;
        const endDeg = accumulatedDegrees + (m.percentage / 100) * 360;
        accumulatedDegrees = endDeg;
        return `${hexColors[idx % hexColors.length]} ${startDeg}deg ${endDeg}deg`;
    });
    const conicGradientString = gradientParts.length > 0 ? `conic-gradient(${gradientParts.join(', ')})` : '';

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex flex-col lg:flex-row overflow-hidden font-sans">
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:static lg:w-60">
                <Navbar index={0} />
            </div>

            <main className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-3 pb-28 lg:pb-3 overflow-hidden">
                <div className="w-full max-w-[1800px] h-full mx-auto bg-transparent xl:bg-[#e9e9ed] rounded-2xl p-2 sm:p-4 lg:p-4 flex flex-col gap-3">
                    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                        <Topbar titulo="Início" />
                    </div>
                    
                    <div className={`grid ${role === 'NUTRITIONIST' ? 'grid-cols-3' : 'grid-cols-2'} gap-2.5 sm:gap-3.5`}>
                        {role === 'NUTRITIONIST' && (
                            <CardDashboard texto="Atletas" quantidade={dashboardData?.totalAtletas || 0} />
                        )}

                        <CardDashboard texto="Avaliações" quantidade={dashboardData?.totalAvaliacoes || 0} />

                        <button 
                            onClick={() => navigate('/nova-atividade')}
                            className="border border-gray-200 rounded-2xl bg-white flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-4 px-3 sm:px-4.5 py-2 sm:py-3 w-full min-h-[60px] sm:min-h-[85px] hover:bg-red-50/50 hover:border-red-200 text-red-500 hover:text-red-600 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.98]"
                        >
                            <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border border-red-100 bg-red-100/30 flex items-center justify-center text-red-500 text-base sm:text-2xl shrink-0 transition-transform duration-300 hover:scale-105">
                                +
                            </div>

                            <div className="flex flex-col leading-none text-center sm:text-left min-w-0">
                                <span className="text-gray-400 text-[9px] sm:text-xs font-semibold uppercase tracking-wider mb-0.5 truncate">
                                    Nova Avaliação
                                </span>
                                <span className="text-sm sm:text-xl lg:text-[20px] font-bold mt-0.5 truncate">
                                    Registrar Sessão
                                </span>
                            </div>
                        </button>
                    </div>

                    {loading ? (
                        <div className="border border-gray-200/80 rounded-2xl bg-white p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[300px] shadow-sm">
                            <div className="w-10 h-10 rounded-full border-3 border-red-500 border-t-transparent animate-spin mb-4"></div>
                            <p className="text-gray-500 text-xs sm:text-sm font-semibold">Carregando painel de métricas...</p>
                        </div>
                    ) : evaluations.length === 0 ? (
                        <div className="border border-gray-200/80 rounded-2xl bg-white p-6 sm:p-10 flex flex-col items-center justify-center text-center min-h-[340px] shadow-sm">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-3xl sm:text-4xl mb-4 animate-pulse">
                                📊
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 font-sans">Dados gráficos indisponíveis</h3>
                            <p className="text-gray-500 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
                                {role === 'NUTRITIONIST' 
                                    ? "Os gráficos de taxa de sudorese média da equipe e distribuição por modalidade serão gerados assim que os atletas vinculados registrarem avaliações." 
                                    : "Monitore sua taxa de sudorese média, perda hídrica e comparativos por esporte registrando sua primeira atividade física."
                                }
                            </p>
                            {role === 'ATHLETE' && (
                                <button 
                                    onClick={() => navigate('/nova-atividade')}
                                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 text-sm"
                                >
                                    + Registrar Primeira Atividade
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-3">
                            {/* GRÁFICO 1: TAXA DE SUDORESE MÉDIA POR MODALIDADE */}
                            <div className="border border-gray-200/80 rounded-2xl bg-white p-4 flex flex-col min-w-0 shadow-sm relative">
                                <div className="flex items-center justify-between gap-3 mb-4 border-b border-gray-100 pb-3 flex-wrap">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="text-red-500 text-lg sm:text-xl shrink-0 flex items-center">
                                            {icons.grafico}
                                        </div>

                                        <p className="text-sm sm:text-base font-bold text-gray-800 tracking-tight leading-none">
                                            {role === 'NUTRITIONIST'
                                                ? "Sudorese Média por Modalidade"
                                                : "Minha Sudorese Média por Modalidade"
                                            }
                                        </p>
                                    </div>

                                    {/* Sort tabs */}
                                    <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg text-[9px] sm:text-[10px] font-semibold shrink-0">
                                        <button 
                                            onClick={() => setSortBy('count')} 
                                            className={`px-2 py-0.5 sm:py-1 rounded-md transition-all cursor-pointer ${sortBy === 'count' ? 'bg-white text-gray-800 shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            Frequência
                                        </button>
                                        <button 
                                            onClick={() => setSortBy('rate')} 
                                            className={`px-2 py-0.5 sm:py-1 rounded-md transition-all cursor-pointer ${sortBy === 'rate' ? 'bg-white text-gray-800 shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            Média
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-1 relative">
                                    {/* EIXO Y (L/h) */}
                                    <div className="flex flex-col justify-between h-36 sm:h-44 lg:h-48 mr-2.5 text-gray-400 text-[9px] sm:text-xs pb-5 shrink-0 select-none font-mono">
                                        <span className="font-semibold text-gray-300">L/h</span>
                                        {scaleSteps.map((step, idx) => (
                                            <span key={idx}>{step === 0 ? "0" : step.toFixed(1).replace(".", ",")}</span>
                                        ))}
                                    </div>

                                    <div className="relative flex-1 min-w-0">
                                        {/* BORDAS DE GRID */}
                                        <div className="absolute left-0 top-0 h-36 sm:h-44 lg:h-48 border-l border-gray-100"></div>
                                        <div className="absolute left-0 top-36 sm:top-44 lg:top-48 w-full border-b border-gray-100"></div>

                                        {/* BARRAS DE DADOS */}
                                        <div className="flex items-end justify-around h-36 sm:h-44 lg:h-48 pl-2 sm:pl-4 gap-2 sm:gap-3 relative">
                                            {modalityMetrics.slice(0, 5).map((m, idx) => {
                                                const heightPct = maxScale > 0 ? (m.averageSweatRate / maxScale) * 100 : 0;
                                                const isHovered = hoveredBar === m.modality;
                                                return (
                                                    <div 
                                                        key={m.modality} 
                                                        className="flex flex-col items-center justify-end h-full flex-1 min-w-0 relative"
                                                        onMouseEnter={() => setHoveredBar(m.modality)}
                                                        onMouseLeave={() => setHoveredBar(null)}
                                                    >
                                                        {/* Floating interactive tooltip */}
                                                        {isHovered && (
                                                            <div className="absolute bottom-[98%] mb-1 bg-gray-900/95 backdrop-blur-sm text-white text-[9px] sm:text-[10px] px-2.5 py-1.5 rounded-xl shadow-xl z-20 flex flex-col pointer-events-none min-w-[125px] border border-gray-700 animate-fadeIn transition-all duration-150">
                                                                <span className="font-bold text-red-400">{m.modality}</span>
                                                                <span className="font-semibold mt-0.5">Média: {m.averageSweatRate.toFixed(2).replace(".", ",")} L/h</span>
                                                                <span className="text-gray-400 text-[9px] mt-0.5">{m.count} {m.count === 1 ? "avaliação" : "avaliações"}</span>
                                                            </div>
                                                        )}

                                                        <span className={`text-[9px] sm:text-xs font-bold text-gray-700 mb-1 transition-all duration-200 ${isHovered ? 'scale-110 text-red-500' : ''}`}>
                                                            {m.averageSweatRate.toFixed(2).replace(".", ",")}
                                                        </span>

                                                        <div 
                                                            style={{ height: `${Math.max(3, heightPct)}%` }}
                                                            className={`w-full max-w-[40px] ${colors[idx % colors.length]} rounded-t-md transition-all duration-300 shadow-sm cursor-pointer hover:brightness-105 active:scale-x-95 ${isHovered ? 'ring-2 ring-white shadow-md scale-x-105 filter saturate-120' : 'opacity-90'}`}
                                                        ></div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* LEGENDAS DO EIXO X */}
                                        <div className="flex justify-around pl-2 sm:pl-4 mt-2 gap-2 sm:gap-3">
                                            {modalityMetrics.slice(0, 5).map((m) => (
                                                <p key={m.modality} className="text-[9px] sm:text-xs text-gray-500 text-center flex-1 font-semibold truncate" title={m.modality}>
                                                    {m.modality}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GRÁFICO 2: DISTRIBUIÇÃO DAS AVALIAÇÕES POR MODALIDADE */}
                            <div className="border border-gray-200/80 rounded-2xl bg-white p-4 flex flex-col min-w-0 shadow-sm">
                                <div className="flex items-center gap-2.5 justify-center mb-5 border-b border-gray-100 pb-3">
                                    <div className="text-red-500 text-lg sm:text-xl shrink-0 flex items-center">
                                        {icons.grafico2}
                                    </div>

                                    <p className="text-sm sm:text-base font-bold text-gray-800 tracking-tight text-center leading-none">
                                        {role === 'NUTRITIONIST'
                                            ? "Distribuição das Avaliações por Modalidade"
                                            : "Minhas Avaliações por Modalidade"
                                        }
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-3 sm:gap-6 flex-1 min-w-0">
                                    {/* DONUT CHART */}
                                    <div 
                                        style={{ background: conicGradientString }}
                                        className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full shrink-0 shadow-inner transition-all duration-700 hover:scale-[1.02]"
                                    >
                                        <div className="absolute inset-3 sm:inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-sm p-1">
                                            {hoveredLegend ? (() => {
                                                const m = modalityMetrics.find(metric => metric.modality === hoveredLegend);
                                                if (!m) return null;
                                                return (
                                                    <div className="flex flex-col items-center justify-center leading-none text-center">
                                                        <span className="text-red-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider truncate max-w-[50px] sm:max-w-[75px] mb-0.5">
                                                            {m.modality}
                                                        </span>
                                                        <span className="text-xs sm:text-lg lg:text-xl font-black text-gray-800 my-0.5">
                                                            {m.percentage.toFixed(1).replace(".", ",")}%
                                                        </span>
                                                        <span className="text-gray-400 text-[7px] sm:text-[8px] font-semibold uppercase tracking-tight truncate max-w-[50px] sm:max-w-[70px]">
                                                            {m.count} {m.count === 1 ? "sessão" : "sessões"}
                                                        </span>
                                                    </div>
                                                );
                                            })() : (
                                                <div className="flex flex-col items-center justify-center leading-none text-center">
                                                    <span className="text-gray-400 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider mb-0.5">
                                                        Total
                                                    </span>
                                                    <span className="text-sm sm:text-2xl lg:text-3xl font-extrabold text-gray-800 leading-none">
                                                        {totalEvals}
                                                    </span>
                                                    <span className="text-[7px] sm:text-[8px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                                                        Avaliações
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BADGES / LIST OF MODALITIES */}
                                    <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1">
                                        {modalityMetrics.slice(0, 5).map((m, idx) => {
                                            const isHovered = hoveredLegend === m.modality;
                                            return (
                                                <div 
                                                    key={m.modality} 
                                                    className={`flex items-center justify-between gap-3 min-w-0 py-1 px-2 rounded-lg transition-all duration-150 cursor-pointer ${isHovered ? 'bg-red-50/50 scale-[1.02] border-l-2 border-l-red-500 shadow-sm' : 'hover:bg-gray-50/40'}`}
                                                    onMouseEnter={() => setHoveredLegend(m.modality)}
                                                    onMouseLeave={() => setHoveredLegend(null)}
                                                >
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${colors[idx % colors.length]} shrink-0 shadow-sm transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}></div>

                                                        <p className={`text-[10px] sm:text-xs lg:text-[13px] font-semibold truncate transition-colors duration-150 ${isHovered ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                                                            {m.modality} ({m.count})
                                                        </p>
                                                    </div>

                                                    <p className={`text-[10px] sm:text-xs lg:text-[13px] font-bold shrink-0 font-mono transition-colors duration-150 ${isHovered ? 'text-red-500 font-black' : 'text-gray-400'}`}>
                                                        {m.percentage.toFixed(1).replace(".", ",")}%
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 min-h-0">
                        {/* CHART 3: TENDÊNCIA DE SUDORESE (SVG LINE CHART) */}
                        <div className="border border-gray-200/80 rounded-2xl bg-white p-4 sm:p-5 flex flex-col relative shadow-sm font-sans min-w-0">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-red-500 text-lg sm:text-xl shrink-0 flex items-center">
                                        {icons.setinhaCrescimento}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight leading-none">
                                        Tendência de Sudorese Recente
                                    </h3>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                                    Histórico de Registros
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col justify-center relative min-h-[160px] pb-2">
                                {/* SVG Line/Area Trend Chart */}
                                {(() => {
                                    const chronologicalEvals = [...evaluations]
                                        .sort((a, b) => new Date(a.dataAvaliacao).getTime() - new Date(b.dataAvaliacao).getTime())
                                        .slice(-6);

                                    if (chronologicalEvals.length === 0) {
                                        return <p className="text-gray-400 text-xs text-center py-8">Nenhum dado de tendência.</p>;
                                    }

                                    const width = 500;
                                    const height = 160;
                                    const paddingX = 40;
                                    const paddingY = 20;

                                    const stepX = (width - paddingX * 2) / Math.max(1, chronologicalEvals.length - 1);
                                    
                                    const sweatRates = chronologicalEvals.map(e => e.taxaSudorese);
                                    const maxSweat = Math.max(...sweatRates, 2.0);
                                    const minSweat = Math.min(...sweatRates, 0.5);
                                    const deltaSweat = maxSweat - minSweat || 1.0;

                                    const points = chronologicalEvals.map((e, idx) => {
                                        const x = paddingX + idx * stepX;
                                        const y = height - paddingY - ((e.taxaSudorese - minSweat) / deltaSweat) * (height - paddingY * 2);
                                        return { x, y, data: e };
                                    });

                                    const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                                    const areaD = points.length > 0 ? `${lineD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z` : '';

                                    const gridLines = [
                                        { y: paddingY, value: maxSweat },
                                        { y: height / 2, value: (minSweat + maxSweat) / 2 },
                                        { y: height - paddingY, value: minSweat }
                                    ];

                                    return (
                                        <div className="relative w-full h-full min-h-[140px]">
                                            <svg className="w-full h-full min-h-[140px]" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                                                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                                                    </linearGradient>
                                                    <linearGradient id="trendLineGradient" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="#ef4444" />
                                                        <stop offset="100%" stopColor="#f97316" />
                                                    </linearGradient>
                                                </defs>

                                                {/* Grid Horizontal Reference Lines */}
                                                {gridLines.map((line, idx) => (
                                                    <g key={idx}>
                                                        <line 
                                                            x1={paddingX} 
                                                            y1={line.y} 
                                                            x2={width - paddingX} 
                                                            y2={line.y} 
                                                            stroke="#f1f5f9" 
                                                            strokeWidth={1} 
                                                            strokeDasharray="4 4"
                                                        />
                                                        <text 
                                                            x={paddingX - 8} 
                                                            y={line.y + 3} 
                                                            fill="#94a3b8" 
                                                            fontSize="8" 
                                                            textAnchor="end"
                                                            className="font-mono font-semibold"
                                                        >
                                                            {line.value.toFixed(1).replace(".", ",")}
                                                        </text>
                                                    </g>
                                                ))}

                                                {/* Area Path */}
                                                {points.length > 1 && (
                                                    <path d={areaD} fill="url(#trendAreaGradient)" className="transition-all duration-500" />
                                                )}

                                                {/* Line Path */}
                                                {points.length > 1 && (
                                                    <path 
                                                        d={lineD} 
                                                        fill="none" 
                                                        stroke="url(#trendLineGradient)" 
                                                        strokeWidth={2.5} 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                        className="transition-all duration-500"
                                                    />
                                                )}

                                                {/* Data Points */}
                                                {points.map((p, idx) => {
                                                    const isHovered = hoveredTrendPoint === idx;
                                                    return (
                                                        <g key={idx} className="cursor-pointer">
                                                            {/* Hittarget circle */}
                                                            <circle 
                                                                cx={p.x} 
                                                                cy={p.y} 
                                                                r={12} 
                                                                fill="transparent" 
                                                                onMouseEnter={() => setHoveredTrendPoint(idx)}
                                                                onMouseLeave={() => setHoveredTrendPoint(null)}
                                                            />
                                                            {/* Small dot inside */}
                                                            <circle 
                                                                cx={p.x} 
                                                                cy={p.y} 
                                                                r={isHovered ? 6 : 4.5} 
                                                                fill={isHovered ? "#ef4444" : "#ffffff"} 
                                                                stroke="#ef4444" 
                                                                strokeWidth={isHovered ? 2.5 : 2}
                                                                className="transition-all duration-200"
                                                            />
                                                        </g>
                                                    );
                                                })}
                                            </svg>

                                            {/* Interactive Custom Floating Tooltip */}
                                            {hoveredTrendPoint !== null && points[hoveredTrendPoint] && (() => {
                                                const p = points[hoveredTrendPoint];
                                                const dateObj = new Date(p.data.dataAvaliacao);
                                                return (
                                                    <div 
                                                        style={{ 
                                                            left: `${(p.x / width) * 100}%`,
                                                            top: `${(p.y / height) * 100 - 15}%` 
                                                        }}
                                                        className="absolute -translate-x-1/2 -translate-y-full bg-gray-900/95 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-xl text-[10px] sm:text-xs shadow-xl border border-gray-700 pointer-events-none z-30 flex flex-col items-center gap-0.5 transition-all duration-150 animate-fadeIn"
                                                    >
                                                        <span className="font-bold text-red-400">{p.data.atletaNome}</span>
                                                        <span className="font-semibold text-white">{p.data.taxaSudorese.toFixed(2).replace(".", ",")} L/h</span>
                                                        <span className="text-[9px] text-gray-400 font-medium">
                                                            {dateObj.getDate()}/{dateObj.getMonth() + 1} - {p.data.modality}
                                                        </span>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* COLUMN 2: RECENT EVALUATIONS */}
                        <div className="min-h-0 overflow-hidden">
                            {loading ? (
                                <p className="text-gray-500 p-4">Carregando avaliações...</p>
                            ) : (
                                <CardAvaliacoes
                                    avaliacoes={evaluations.slice(0, 10)}
                                    onView={(av) => setSelectedAvaliacao(av)}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </main>

            {/* OVERLAY MODAL DE DETALHES DA AVALIAÇÃO */}
            {selectedAvaliacao && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 transform scale-100">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b border-gray-200 px-6 py-5 sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shrink-0">
                                    <span className="text-2xl font-bold">{selectedAvaliacao.atletaNome ? selectedAvaliacao.atletaNome[0].toUpperCase() : "A"}</span>
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                                        Detalhes da Avaliação
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                        Atleta: <span className="font-semibold text-gray-700">{selectedAvaliacao.atletaNome}</span> • {formatFullDate(selectedAvaliacao.dataAvaliacao)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAvaliacao(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2 text-2xl cursor-pointer"
                                aria-label="Fechar"
                            >
                                {icons.fechar}
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex flex-col gap-6">
                            
                            {/* Grid 1: Principais Métricas em Destaque */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Taxa de Sudorese */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Taxa de Sudorese</span>
                                    <div className="mt-2 flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-green-600">
                                            {selectedAvaliacao.taxaSudorese.toFixed(2).replace(".", ",")}
                                        </span>
                                        <span className="text-sm font-bold text-green-700">L/h</span>
                                    </div>
                                    <p className="text-[11px] text-green-600 mt-2 font-medium">Volumetria de suor perdida por hora de atividade</p>
                                </div>

                                {/* Peso e Perda Hídrica */}
                                <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Variação de Peso</span>
                                    <div className="mt-2">
                                        <div className="text-base sm:text-lg font-bold text-blue-800">
                                            {selectedAvaliacao.currentWeight.toFixed(1).replace(".", ",")} kg → {selectedAvaliacao.finalWeight.toFixed(1).replace(".", ",")} kg
                                        </div>
                                        <div className="text-sm font-semibold text-blue-600 mt-0.5">
                                            {(() => {
                                                const diff = selectedAvaliacao.currentWeight - selectedAvaliacao.finalWeight;
                                                const pct = (diff / selectedAvaliacao.currentWeight) * 100;
                                                if (diff > 0) {
                                                    return `Perda: -${diff.toFixed(2).replace(".", ",")} kg (-${pct.toFixed(2).replace(".", ",")}% )`;
                                                } else if (diff < 0) {
                                                    return `Ganho: +${Math.abs(diff).toFixed(2).replace(".", ",")} kg (+${Math.abs(pct).toFixed(2).replace(".", ",")}% )`;
                                                }
                                                return "Sem alteração de peso";
                                            })()}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-blue-600 mt-2 font-medium">Percentual de desidratação (limite recomendado: 2%)</p>
                                </div>

                                {/* Duração do Treino */}
                                <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Tempo de Sessão</span>
                                    <div className="mt-2 flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-red-600">
                                            {formatDuration(selectedAvaliacao.durationSeconds)}
                                        </span>
                                        {selectedAvaliacao.plannedDurationMin && (
                                            <span className="text-xs sm:text-sm font-medium text-red-700">
                                                (Planejado: {selectedAvaliacao.plannedDurationMin} min)
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-red-600 mt-2 font-medium">Modalidade praticada: <span className="font-bold">{selectedAvaliacao.modality}</span></p>
                                </div>
                            </div>

                            {/* Grid 2: Detalhes do Treino & Ambiente */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Informações do Exercício */}
                                <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-3 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-2">
                                        🏃‍♂️ Informações do Exercício
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs sm:text-sm">
                                        <div>
                                            <span className="text-gray-400 block">Esporte / Modalidade</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.modality}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Local da Prática</span>
                                            <span className="font-semibold text-gray-700">
                                                {selectedAvaliacao.isOutdoor === undefined ? "Não informado" : selectedAvaliacao.isOutdoor ? "Ao ar livre (Outdoor)" : "Ambiente fechado (Indoor)"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Percepção de Esforço (PSE)</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.perceivedIntensity || "Não informado"}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Tipo de Vestimenta</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.clothingType || "Não informado"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Condições Ambientais */}
                                <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-3 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-2">
                                        ☀️ Clima & Ambiente
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs sm:text-sm">
                                        <div>
                                            <span className="text-gray-400 block">Temperatura</span>
                                            <span className="font-semibold text-gray-700">
                                                {selectedAvaliacao.temperature !== undefined ? `${selectedAvaliacao.temperature.toString().replace(".", ",")} °C` : "Não informado"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Umidade Relativa</span>
                                            <span className="font-semibold text-gray-700">
                                                {selectedAvaliacao.humidity !== undefined ? `${selectedAvaliacao.humidity} %` : "Não informado"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Sensação Térmica</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.thermalSensation || "Não informado"}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Exposição Solar</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.solarExposure || "Não informado"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid 3: Hidratação e Parâmetros Fisiológicos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ingestão de Fluidos e Perdas */}
                                <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-3 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-2">
                                        💧 Registro de Hidratação
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs sm:text-sm">
                                        <div>
                                            <span className="text-gray-400 block">Líquidos Ingeridos</span>
                                            <span className="font-semibold text-gray-700">{selectedAvaliacao.liquidIngested} mL</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Água nos Alimentos</span>
                                            <span className="font-semibold text-gray-700">
                                                {selectedAvaliacao.foodIntakeWater !== undefined ? `${selectedAvaliacao.foodIntakeWater} mL` : "0 mL"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Urina Durante Treino</span>
                                            <span className="font-semibold text-gray-700">
                                                {selectedAvaliacao.urineOutputDuringML !== undefined ? `${selectedAvaliacao.urineOutputDuringML} mL` : "0 mL"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Histórico de Hidratação</span>
                                            <span className="font-semibold text-gray-700 block truncate max-w-[150px]" title={selectedAvaliacao.recentHydrationHistory || "Nenhum"}>
                                                {selectedAvaliacao.recentHydrationHistory || "Não informado"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fisiologia & Urina */}
                                <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-3 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-2">
                                        🧪 Marcadores Fisiológicos
                                    </h3>
                                    <div className="flex flex-col gap-4 text-xs sm:text-sm">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-gray-400 block">Nível de Sede (Basal)</span>
                                                <span className="font-semibold text-gray-700">Nível {selectedAvaliacao.thirstLevel} de 5</span>
                                            </div>
                                            <div className="flex gap-1.5 mt-1">
                                                {[1, 2, 3, 4, 5].map((lvl) => (
                                                    <div 
                                                        key={lvl} 
                                                        className={`w-4 h-4 rounded-full border transition-all ${lvl <= selectedAvaliacao.thirstLevel ? 'bg-red-500 border-red-500 scale-110 shadow-sm' : 'bg-gray-200 border-gray-300'}`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-gray-400 block">Coloração da Urina (Basal)</span>
                                                    <span className="font-semibold text-gray-700">Escala {selectedAvaliacao.urineColor} • {getUrineColorLabel(selectedAvaliacao.urineColor)}</span>
                                                </div>
                                                <div 
                                                    style={{ backgroundColor: getUrineColorHex(selectedAvaliacao.urineColor) }}
                                                    className="w-12 h-8 rounded-lg border border-gray-300 shadow-inner shrink-0"
                                                    title={`Urina cor escala ${selectedAvaliacao.urineColor}`}
                                                ></div>
                                            </div>
                                            
                                            {/* Visualizador de Escala de Urina Completo */}
                                            <div className="flex justify-between gap-1 mt-3">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((score) => (
                                                    <div 
                                                        key={score} 
                                                        style={{ backgroundColor: getUrineColorHex(score) }}
                                                        className={`flex-1 h-3 rounded-sm border transition-all ${score === selectedAvaliacao.urineColor ? 'border-gray-800 scale-y-125 shadow-sm ring-1 ring-gray-600' : 'border-gray-300 opacity-60'}`}
                                                        title={`Escala ${score}`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sintomas e Pós-Exercício */}
                            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-4 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2 flex items-center gap-2">
                                    ⚠️ Sintomas & Pós-Exercício
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                                    <div>
                                        <span className="text-gray-400 block mb-1.5 font-medium">Sintomas Basais (Pré-Treino)</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedAvaliacao.preSymptoms && selectedAvaliacao.preSymptoms.length > 0 ? (
                                                selectedAvaliacao.preSymptoms.map((sym) => (
                                                    <span key={sym} className="px-2.5 py-1 bg-gray-200 text-gray-700 font-medium rounded-full text-xs border border-gray-300 shadow-sm">
                                                        {sym}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic">Nenhum sintoma relatado</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block mb-1.5 font-medium">Sintomas Pós-Treino</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedAvaliacao.postSymptoms && selectedAvaliacao.postSymptoms.length > 0 ? (
                                                selectedAvaliacao.postSymptoms.map((sym) => (
                                                    <span key={sym} className="px-2.5 py-1 bg-red-50 text-red-600 font-semibold rounded-full text-xs border border-red-100 shadow-sm">
                                                        {sym}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 font-medium italic">Nenhum sintoma pós-treino</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm border-t border-gray-200 pt-3">
                                    <div>
                                        <span className="text-gray-400 block">Roupa Encharcada?</span>
                                        <span className="font-semibold text-gray-700">
                                            {selectedAvaliacao.soakedClothing === undefined ? "Não informado" : selectedAvaliacao.soakedClothing ? "Sim" : "Não"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Trocou de Roupa Durante?</span>
                                        <span className="font-semibold text-gray-700">
                                            {selectedAvaliacao.clothingChanged === undefined ? "Não informado" : selectedAvaliacao.clothingChanged ? "Sim" : "Não"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block">Tolerância Gastrointestinal (GI)</span>
                                        <span className="font-semibold text-gray-700">{selectedAvaliacao.giTolerance || "Não informado"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Observações / Anotações */}
                            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50 flex flex-col gap-2 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
                                    📝 Observações Adicionais
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                                    {selectedAvaliacao.observations || "Nenhuma observação registrada para esta avaliação."}
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-3xl flex justify-end">
                            <button
                                onClick={() => setSelectedAvaliacao(null)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-sm"
                            >
                                Fechar Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
