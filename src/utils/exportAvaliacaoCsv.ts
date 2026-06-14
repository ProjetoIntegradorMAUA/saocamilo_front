import type { AvaliacaoResponse } from "../services/api";
import { getAvaliacaoMetrics, getHydrationRiskProfile, getUrineColorLabel } from "./hydrationMetrics";

const csvEscape = (value: unknown) => {
    const text = String(value ?? "");
    if (/[;"\n\r]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
};

const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return date.toLocaleString("pt-BR");
};

const formatDurationMin = (seconds?: number) =>
    seconds && seconds > 0 ? Math.round(seconds / 60) : "";

export function exportAvaliacoesCsv(avaliacoes: AvaliacaoResponse[]) {
    const headers = [
        "Atleta",
        "Data",
        "Modalidade",
        "Ambiente",
        "Duração (min)",
        "Taxa de sudorese (L/h)",
        "Perda hídrica ajustada (L)",
        "Variação de massa (%)",
        "Balanço hídrico (mL)",
        "Ingestão recomendada (mL/h)",
        "Líquidos ingeridos (mL)",
        "Água de alimentos (mL)",
        "Urina durante sessão (mL)",
        "Cor da urina",
        "Sede basal",
        "Temperatura (°C)",
        "Umidade (%)",
        "Risco",
        "Alertas",
    ];

    const rows = avaliacoes.map((avaliacao) => {
        const metrics = getAvaliacaoMetrics(avaliacao);
        const risk = getHydrationRiskProfile(avaliacao);

        return [
            avaliacao.atletaNome,
            formatDate(avaliacao.dataAvaliacao),
            avaliacao.modality || "Não informado",
            avaliacao.isOutdoor === undefined ? "Não informado" : avaliacao.isOutdoor ? "Outdoor" : "Indoor",
            formatDurationMin(avaliacao.durationSeconds),
            metrics.sweatRateLh.toFixed(2).replace(".", ","),
            metrics.adjustedFluidLossL.toFixed(3).replace(".", ","),
            metrics.bodyMassLossPct.toFixed(2).replace(".", ","),
            metrics.hydrationBalance,
            metrics.recommendedIntakeMLh,
            metrics.fluidIntakeML,
            metrics.foodWaterML,
            metrics.urineOutputML,
            `Escala ${avaliacao.urineColor} - ${getUrineColorLabel(avaliacao.urineColor)}`,
            avaliacao.thirstLevel ? `${avaliacao.thirstLevel}/5` : "Não informado",
            avaliacao.temperature ?? "",
            avaliacao.humidity ?? "",
            risk.label,
            metrics.alerts.join(" | "),
        ];
    });

    const csv = [headers, ...rows]
        .map((row) => row.map(csvEscape).join(";"))
        .join("\r\n");

    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateTag = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `avaliacoes-hidratacao-${dateTag}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
