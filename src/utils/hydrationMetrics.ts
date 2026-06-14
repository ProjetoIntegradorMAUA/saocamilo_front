import type { AvaliacaoResponse } from "../services/api";

export type HydrationRiskLevel = "LOW" | "ATTENTION" | "HIGH";

export const URINE_COLOR_SCALE = [
    { score: 1, color: "#F8F5CF", label: "Bem hidratado" },
    { score: 2, color: "#F4E66A", label: "Bem hidratado" },
    { score: 3, color: "#F5C84A", label: "Adequado" },
    { score: 4, color: "#E7A928", label: "Atenção" },
    { score: 5, color: "#C98618", label: "Atenção" },
    { score: 6, color: "#9A6417", label: "Desidratação provável" },
    { score: 7, color: "#70481B", label: "Alto risco" },
    { score: 8, color: "#4A321C", label: "Alto risco" },
];

const isFiniteNumber = (value: unknown): value is number =>
    typeof value === "number" && Number.isFinite(value);

const round = (value: number, digits = 2) => {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
};

const getDurationHours = (avaliacao: AvaliacaoResponse) =>
    avaliacao.durationSeconds > 0 ? avaliacao.durationSeconds / 3600 : 0;

export const getUrineColorHex = (score?: number) =>
    URINE_COLOR_SCALE.find((item) => item.score === score)?.color || "#F8F5CF";

export const getUrineColorLabel = (score?: number) => {
    if (!score) return "Não informado";
    return URINE_COLOR_SCALE.find((item) => item.score === score)?.label || "Não informado";
};

export function getAvaliacaoMetrics(avaliacao: AvaliacaoResponse) {
    const durationHours = getDurationHours(avaliacao);
    const massDeltaKg = avaliacao.currentWeight - avaliacao.finalWeight;
    const fluidIntakeML = avaliacao.liquidIngested || 0;
    const foodWaterML = avaliacao.foodIntakeWater || 0;
    const urineOutputML = avaliacao.urineOutputDuringML || 0;
    const totalIntakeML = fluidIntakeML + foodWaterML;

    const adjustedFluidLossL = isFiniteNumber(avaliacao.adjustedFluidLossL)
        ? avaliacao.adjustedFluidLossL
        : massDeltaKg + totalIntakeML / 1000 - urineOutputML / 1000;

    const sweatRateLh = isFiniteNumber(avaliacao.taxaSudorese)
        ? avaliacao.taxaSudorese
        : durationHours > 0
            ? Math.max(0, adjustedFluidLossL / durationHours)
            : 0;

    const bodyMassLossPct = isFiniteNumber(avaliacao.bodyMassLossPct)
        ? avaliacao.bodyMassLossPct
        : avaliacao.currentWeight > 0
            ? (massDeltaKg / avaliacao.currentWeight) * 100
            : 0;

    const hydrationBalance = isFiniteNumber(avaliacao.hydrationBalance)
        ? avaliacao.hydrationBalance
        : totalIntakeML - adjustedFluidLossL * 1000;

    const recommendedIntakeMLh = isFiniteNumber(avaliacao.recommendedIntakeMLh)
        ? avaliacao.recommendedIntakeMLh
        : Math.max(0, sweatRateLh * 1000);

    const technicalAlerts = buildTechnicalAlerts(avaliacao, {
        sweatRateLh,
        bodyMassLossPct,
        hydrationBalance,
    });

    return {
        durationHours,
        massDeltaKg: round(massDeltaKg, 2),
        fluidIntakeML,
        foodWaterML,
        urineOutputML,
        totalIntakeML,
        adjustedFluidLossL: round(adjustedFluidLossL, 3),
        sweatRateLh: round(sweatRateLh, 2),
        bodyMassLossPct: round(bodyMassLossPct, 2),
        hydrationBalance: round(hydrationBalance, 0),
        recommendedIntakeMLh: round(recommendedIntakeMLh, 0),
        recommendationEvery10Min: round(recommendedIntakeMLh / 6, 0),
        recommendationEvery15Min: round(recommendedIntakeMLh / 4, 0),
        recommendationEvery20Min: round(recommendedIntakeMLh / 3, 0),
        alerts: Array.from(new Set([...(avaliacao.alerts || []), ...technicalAlerts])),
    };
}

function buildTechnicalAlerts(
    avaliacao: AvaliacaoResponse,
    metrics: { sweatRateLh: number; bodyMassLossPct: number; hydrationBalance: number }
) {
    const alerts: string[] = [];

    if (metrics.sweatRateLh > 2.5) {
        alerts.push("ALERTA: Taxa de sudorese muito alta (> 2,5 L/h). Monitoramento intensivo recomendado.");
    }

    if (metrics.bodyMassLossPct > 2) {
        alerts.push(`ALERTA: Perda de massa corporal acima de 2% (${metrics.bodyMassLossPct.toFixed(1)}%). Risco operacional de desidratação significativa.`);
    }

    if (metrics.bodyMassLossPct < -1 || metrics.hydrationBalance > 1000) {
        alerts.push("ALERTA: Possível superingestão hídrica. Avaliar risco de desconforto gastrointestinal e hiponatremia associada ao exercício.");
    }

    if (avaliacao.urineColor >= 6) {
        alerts.push("ALERTA: Cor da urina elevada (escala >= 6). Sinal operacional de hipoidratação basal.");
    } else if (avaliacao.urineColor >= 4) {
        alerts.push("AVISO: Cor da urina intermediária. Reforçar monitoramento da hidratação pré-sessão.");
    }

    if (avaliacao.thirstLevel >= 4) {
        alerts.push("AVISO: Sede basal elevada. Considerar revisão do plano hídrico antes da próxima sessão.");
    }

    if (
        isFiniteNumber(avaliacao.temperature) &&
        isFiniteNumber(avaliacao.humidity) &&
        avaliacao.temperature >= 30 &&
        avaliacao.humidity >= 60
    ) {
        alerts.push("AVISO: Ambiente quente e úmido. Condição associada a maior carga térmica e risco de perda hídrica.");
    }

    if (avaliacao.soakedClothing && !avaliacao.clothingChanged) {
        alerts.push("AVISO: Roupa encharcada sem troca na pesagem pós. A taxa de sudorese pode estar subestimada.");
    }

    return alerts;
}

export function getHydrationRiskProfile(avaliacao: AvaliacaoResponse) {
    const metrics = getAvaliacaoMetrics(avaliacao);
    const postSymptomsCount = avaliacao.postSymptoms?.length || 0;

    let score = 0;
    if (metrics.bodyMassLossPct > 2) score += 3;
    else if (metrics.bodyMassLossPct > 1) score += 1;

    if (metrics.sweatRateLh > 2.5) score += 3;
    else if (metrics.sweatRateLh > 1.8) score += 1;

    if (avaliacao.urineColor >= 7) score += 3;
    else if (avaliacao.urineColor >= 4) score += 1;

    if (avaliacao.thirstLevel >= 4) score += 1;
    if (postSymptomsCount >= 2) score += 2;
    else if (postSymptomsCount === 1) score += 1;

    if (isFiniteNumber(avaliacao.temperature) && avaliacao.temperature >= 32) score += 1;
    if (isFiniteNumber(avaliacao.humidity) && avaliacao.humidity >= 70) score += 1;
    if (metrics.bodyMassLossPct < -1 || metrics.hydrationBalance > 1000) score += 2;

    let level: HydrationRiskLevel = "LOW";
    if (score >= 4) level = "HIGH";
    else if (score >= 2) level = "ATTENTION";

    const labels: Record<HydrationRiskLevel, string> = {
        LOW: "Baixo risco",
        ATTENTION: "Atenção",
        HIGH: "Alto risco",
    };

    const descriptions: Record<HydrationRiskLevel, string> = {
        LOW: "Sessão sem sinais operacionais críticos nos dados registrados.",
        ATTENTION: "Há marcadores que justificam monitoramento e ajuste do plano hídrico.",
        HIGH: "Há combinação de marcadores que exige revisão profissional antes de repetir o protocolo.",
    };

    return {
        level,
        label: labels[level],
        description: descriptions[level],
        score,
        metrics,
    };
}

export const getRiskBadgeClasses = (level: HydrationRiskLevel) => {
    if (level === "HIGH") return "bg-red-50 text-red-700 border-red-200";
    if (level === "ATTENTION") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
};

export const mean = (values: number[]) =>
    values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

export const median = (values: number[]) => {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
    return sorted[middle];
};
