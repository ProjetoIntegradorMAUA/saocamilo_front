import { useEffect, useRef, useState } from "react";
import { type AvaliacaoResponse } from "../services/api";

interface RecentSweatTrendChartProps {
    evaluations: AvaliacaoResponse[];
}

export default function RecentSweatTrendChart({ evaluations }: RecentSweatTrendChartProps) {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
    const [animate, setAnimate] = useState(false);
    const [pathLength, setPathLength] = useState(1000);
    const pathRef = useRef<SVGPathElement>(null);
    const glowPathRef = useRef<SVGPathElement>(null);

    // Sort chronologically and slice the last 6 entries
    const chronologicalEvals = [...evaluations]
        .sort((a, b) => new Date(a.dataAvaliacao).getTime() - new Date(b.dataAvaliacao).getTime())
        .slice(-6);

    useEffect(() => {
        // Trigger drawing animations on mount or when data changes
        setAnimate(false);
        const timer = setTimeout(() => {
            if (pathRef.current) {
                const len = pathRef.current.getTotalLength();
                setPathLength(len);
            }
            setAnimate(true);
        }, 100);
        return () => clearTimeout(timer);
    }, [evaluations]);

    if (chronologicalEvals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center min-h-[180px]">
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Nenhum dado de tendência disponível.</p>
            </div>
        );
    }

    const width = 500;
    const height = 160;
    const paddingX = 40;
    const paddingY = 22;

    const stepX = (width - paddingX * 2) / Math.max(1, chronologicalEvals.length - 1);
    const sweatRates = chronologicalEvals.map((e) => e.taxaSudorese);
    
    // Scale calculations
    const maxSweat = Math.max(...sweatRates, 2.0);
    const minSweat = Math.min(...sweatRates, 0.5);
    const deltaSweat = maxSweat - minSweat || 1.0;

    // Coordinate mapping
    const points = chronologicalEvals.map((e, idx) => {
        const x = paddingX + idx * stepX;
        const y = height - paddingY - ((e.taxaSudorese - minSweat) / deltaSweat) * (height - paddingY * 2);
        return { x, y, data: e };
    });

    // Spline curve generator (cubic bezier interpolation)
    const lineD = points.reduce((acc, p, idx, arr) => {
        if (idx === 0) return `M ${p.x} ${p.y}`;
        const prev = arr[idx - 1];
        const cpX1 = prev.x + (p.x - prev.x) / 3;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (2 * (p.x - prev.x)) / 3;
        const cpY2 = p.y;
        return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
    }, "");

    // Area under the spline curve
    const areaD = points.length > 1
        ? `${lineD} L ${points[points.length - 1].x} ${height - paddingY + 2} L ${points[0].x} ${height - paddingY + 2} Z`
        : "";

    // Grid reference lines values
    const gridLines = [
        { y: paddingY, value: maxSweat },
        { y: (paddingY + height - paddingY) / 2, value: (minSweat + maxSweat) / 2 },
        { y: height - paddingY, value: minSweat },
    ];

    // CSS Keyframe and Style Declarations to keep the component fully self-contained
    const animationStyles = `
        @keyframes drawPath {
            from {
                stroke-dashoffset: ${pathLength};
            }
            to {
                stroke-dashoffset: 0;
            }
        }
        @keyframes fadeSpark {
            0% { opacity: 1; }
            85% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            70% {
                transform: translate(-50%, -50%) scale(1.2);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        @keyframes pulseAura {
            0% {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0.5;
            }
            100% {
                transform: translate(-50%, -50%) scale(2.2);
                opacity: 0;
            }
        }
        .theme-dark .grid-line {
            stroke: rgba(255, 255, 255, 0.05);
        }
        .theme-dark .axis-text {
            fill: #4b5563;
        }
    `;

    return (
        <div className="relative w-full h-[180px] select-none font-sans">
            {/* Inject dynamic CSS animation definitions */}
            <style>{animationStyles}</style>

            {/* Background SVG Grid and Paths */}
            <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox={`0 0 ${width} ${height}`} 
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Area under line gradient */}
                    <linearGradient id="sweatAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                        <stop offset="50%" stopColor="#ef4444" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Main stroke gradient */}
                    <linearGradient id="sweatLineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="50%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>

                    {/* Laser glow filter */}
                    <filter id="laserGlow" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid reference horizontal lines */}
                {gridLines.map((line, idx) => (
                    <g key={idx}>
                        <line
                            x1={paddingX}
                            y1={line.y}
                            x2={width - paddingX}
                            y2={line.y}
                            className="grid-line"
                            stroke="#f1f5f9"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                        />
                        <text
                            x={paddingX - 8}
                            y={line.y + 3}
                            className="axis-text"
                            fill="#94a3b8"
                            fontSize="8.5"
                            fontWeight="600"
                            textAnchor="end"
                            fontFamily="monospace"
                        >
                            {line.value.toFixed(1).replace(".", ",")}
                        </text>
                    </g>
                ))}

                {/* Vertical helper grid lines when a dot is hovered */}
                {hoveredPoint !== null && points[hoveredPoint] && (
                    <line
                        x1={points[hoveredPoint].x}
                        y1={paddingY}
                        x2={points[hoveredPoint].x}
                        y2={height - paddingY}
                        stroke="#ef4444"
                        strokeWidth={1.5}
                        opacity={0.3}
                        strokeDasharray="2 2"
                    />
                )}

                {/* Glowing area under the curve */}
                {points.length > 1 && areaD && (
                    <path
                        d={areaD}
                        fill="url(#sweatAreaGradient)"
                        className="transition-opacity duration-1000 ease-out"
                        style={{
                            opacity: animate ? 1 : 0,
                            transitionDelay: "1.2s",
                        }}
                    />
                )}

                {/* Underlying thicker glow path for neon bloom */}
                {points.length > 1 && lineD && (
                    <path
                        ref={glowPathRef}
                        d={lineD}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={6.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.16}
                        style={{
                            strokeDasharray: pathLength,
                            strokeDashoffset: animate ? 0 : pathLength,
                            animation: animate ? `drawPath 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                        }}
                    />
                )}

                {/* Foreground sharp bright line */}
                {points.length > 1 && lineD && (
                    <path
                        ref={pathRef}
                        d={lineD}
                        fill="none"
                        stroke="url(#sweatLineGradient)"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: pathLength,
                            strokeDashoffset: animate ? 0 : pathLength,
                            animation: animate ? `drawPath 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards` : "none",
                        }}
                    />
                )}

                {/* Spark/Laser head following the curve */}
                {animate && points.length > 1 && lineD && (
                    <g
                        style={{
                            animation: "fadeSpark 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                        }}
                    >
                        {/* Outer shining bloom */}
                        <circle r="7.5" fill="#f87171" opacity="0.65" filter="url(#laserGlow)" />
                        {/* Ultra bright white core */}
                        <circle r="3.2" fill="#ffffff" />
                        <animateMotion
                            dur="1.5s"
                            repeatCount="1"
                            path={lineD}
                            keyTimes="0;1"
                            keySplines="0.4 0 0.2 1"
                            calcMode="spline"
                            fill="freeze"
                        />
                    </g>
                )}
            </svg>

            {/* Non-distorted HTML Elements Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {points.map((p, idx) => {
                    const isHovered = hoveredPoint === idx;
                    const leftPct = `${(p.x / width) * 100}%`;
                    const topPct = `${(p.y / height) * 100}%`;
                    
                    // Delay based on drawing speed to make dots spring out sequentially
                    const animationDelay = `${(idx / Math.max(1, points.length - 1)) * 1.2}s`;

                    return (
                        <div
                            key={idx}
                            style={{
                                left: leftPct,
                                top: topPct,
                                animation: animate ? `popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards` : "none",
                                animationDelay: animationDelay,
                                opacity: 0, // Controlled by popIn keyframe
                            }}
                            className="absolute pointer-events-auto cursor-pointer"
                        >
                            {/* Hover ripple trigger */}
                            <div
                                className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent z-10"
                                onMouseEnter={() => setHoveredPoint(idx)}
                                onMouseLeave={() => setHoveredPoint(null)}
                            >
                                {/* Static outer shadow circle */}
                                <div 
                                    className={`w-3.5 h-3.5 rounded-full bg-white border-2 border-red-500 shadow-md transition-all duration-300 ${
                                        isHovered ? "scale-125 border-red-600 bg-red-50 shadow-lg" : ""
                                    }`}
                                />
                            </div>

                            {/* Active pulsating neon ring on hover */}
                            {isHovered && (
                                <div 
                                    style={{
                                        animation: "pulseAura 1.4s infinite cubic-bezier(0.25, 0, 0, 1)",
                                    }}
                                    className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-red-400 pointer-events-none z-0"
                                />
                            )}
                        </div>
                    );
                })}

                {/* Premium Glassmorphic Tooltip */}
                {hoveredPoint !== null && points[hoveredPoint] && (() => {
                    const p = points[hoveredPoint];
                    const dateObj = new Date(p.data.dataAvaliacao);
                    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });

                    // Determine positioning to keep it centered over the node
                    const leftPct = `${(p.x / width) * 100}%`;
                    const topPct = `${(p.y / height) * 100 - 10}%`;

                    return (
                        <div
                            style={{
                                left: leftPct,
                                top: topPct,
                            }}
                            className="absolute -translate-x-1/2 -translate-y-full bg-slate-950/90 theme-dark:bg-slate-900/95 backdrop-blur-md text-white px-3 py-2.5 rounded-2xl text-xs shadow-2xl border border-white/10 pointer-events-none z-40 flex flex-col items-center gap-1 transition-all duration-200 animate-fadeIn min-w-[145px]"
                        >
                            <div className="w-full flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-1">
                                <span className="font-bold text-gray-200 text-[10px] truncate max-w-[85px]">
                                    {p.data.atletaNome || "Atleta"}
                                </span>
                                <span className="text-[8px] text-red-400 font-extrabold bg-red-500/10 px-2 py-0.5 rounded shrink-0">
                                    {p.data.modality}
                                </span>
                            </div>
                            
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-sm font-black text-emerald-400 font-sans tracking-tight">
                                    {p.data.taxaSudorese.toFixed(2).replace(".", ",")}
                                </span>
                                <span className="text-[9px] font-extrabold text-emerald-500">L/h</span>
                            </div>

                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                                📅 {formattedDate}
                            </span>

                            {/* Down arrow pointing to the marker */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/90 theme-dark:border-t-slate-900/95" />
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
