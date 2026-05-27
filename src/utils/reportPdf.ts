import type { AvaliacaoResponse } from "../services/api";

const escapeHtml = (value: unknown) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const formatNumber = (value?: number, suffix = "") => {
    if (value === undefined || value === null || Number.isNaN(value)) return "Não informado";
    return `${value.toFixed(2).replace(".", ",")}${suffix}`;
};

const formatInteger = (value?: number, suffix = "") => {
    if (value === undefined || value === null || Number.isNaN(value)) return "Não informado";
    return `${Math.round(value)}${suffix}`;
};

const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return "Não informado";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}min`;
    return `${minutes}min`;
};

const formatDate = (isoString?: string) => {
    if (!isoString) return "Não informado";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "Não informado";
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatBoolean = (value?: boolean) => {
    if (value === undefined) return "Não informado";
    return value ? "Sim" : "Não";
};

const formatList = (items?: string[]) => {
    if (!items || items.length === 0) return "Nenhum relato";
    return items.join(", ");
};

const formatWeightVariation = (avaliacao: AvaliacaoResponse) => {
    if (!avaliacao.currentWeight) return "Não informado";
    const diff = avaliacao.currentWeight - avaliacao.finalWeight;
    const pct = (diff / avaliacao.currentWeight) * 100;
    if (diff > 0) {
        return `Perda de ${diff.toFixed(2).replace(".", ",")} kg (${pct.toFixed(2).replace(".", ",")}%)`;
    }
    if (diff < 0) {
        return `Ganho de ${Math.abs(diff).toFixed(2).replace(".", ",")} kg (${Math.abs(pct).toFixed(2).replace(".", ",")}%)`;
    }
    return "Sem variação de massa";
};

const row = (label: string, value: unknown) => `
    <div class="row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value || "Não informado")}</strong>
    </div>
`;

const section = (title: string, rows: string) => `
    <section>
        <h2>${escapeHtml(title)}</h2>
        <div class="rows">${rows}</div>
    </section>
`;

export function buildAvaliacaoReportHtml(avaliacao: AvaliacaoResponse) {
    const generatedAt = new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return `<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <title>Relatório - ${escapeHtml(avaliacao.atletaNome)}</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #f4f4f4;
            color: #1f2937;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.45;
        }
        main {
            width: min(920px, calc(100% - 32px));
            margin: 24px auto;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            overflow: hidden;
        }
        header {
            padding: 28px 32px;
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            color: #fff;
        }
        header p { margin: 6px 0 0; color: #fee2e2; font-size: 13px; }
        h1 { margin: 0; font-size: 26px; }
        .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 20px 32px 4px;
        }
        .metric {
            border: 1px solid #fee2e2;
            border-radius: 14px;
            padding: 14px;
            background: #fff7f7;
        }
        .metric span {
            display: block;
            color: #6b7280;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .04em;
            text-transform: uppercase;
        }
        .metric strong {
            display: block;
            margin-top: 6px;
            color: #991b1b;
            font-size: 22px;
        }
        section { padding: 18px 32px; }
        h2 {
            margin: 0 0 12px;
            font-size: 15px;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: .05em;
        }
        .rows {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 16px;
        }
        .row {
            border-bottom: 1px solid #f3f4f6;
            padding-bottom: 8px;
        }
        .row span {
            display: block;
            color: #6b7280;
            font-size: 12px;
        }
        .row strong {
            display: block;
            margin-top: 2px;
            color: #1f2937;
            font-size: 13px;
        }
        .notes {
            white-space: pre-wrap;
            color: #374151;
            font-size: 13px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            padding: 14px;
            background: #f9fafb;
        }
        footer {
            padding: 14px 32px 24px;
            color: #6b7280;
            font-size: 11px;
        }
        @media print {
            body { background: #fff; }
            main {
                width: 100%;
                margin: 0;
                border: 0;
                border-radius: 0;
            }
            .summary, section, header, footer { padding-left: 22px; padding-right: 22px; }
        }
    </style>
</head>
<body>
    <main>
        <header>
            <h1>Relatório de Avaliação do Atleta</h1>
            <p>Sistema São Camilo • Gerado em ${escapeHtml(generatedAt)}</p>
        </header>

        <div class="summary">
            <div class="metric"><span>Atleta</span><strong>${escapeHtml(avaliacao.atletaNome)}</strong></div>
            <div class="metric"><span>Sudorese</span><strong>${escapeHtml(formatNumber(avaliacao.taxaSudorese, " L/h"))}</strong></div>
            <div class="metric"><span>Duração</span><strong>${escapeHtml(formatDuration(avaliacao.durationSeconds))}</strong></div>
        </div>

        ${section("Sessão", [
            row("Data da avaliação", formatDate(avaliacao.dataAvaliacao)),
            row("Modalidade", avaliacao.modality),
            row("Duração planejada", avaliacao.plannedDurationMin ? `${avaliacao.plannedDurationMin} min` : "Não informado"),
            row("Percepção de esforço", avaliacao.perceivedIntensity),
            row("Tipo de vestimenta", avaliacao.clothingType),
            row("Local", avaliacao.isOutdoor === undefined ? "Não informado" : avaliacao.isOutdoor ? "Ao ar livre" : "Ambiente fechado"),
        ].join(""))}

        ${section("Hidratação e Massa Corporal", [
            row("Peso inicial", formatNumber(avaliacao.currentWeight, " kg")),
            row("Peso final", formatNumber(avaliacao.finalWeight, " kg")),
            row("Variação de massa", formatWeightVariation(avaliacao)),
            row("Líquidos ingeridos", formatInteger(avaliacao.liquidIngested, " mL")),
            row("Água dos alimentos", formatInteger(avaliacao.foodIntakeWater, " mL")),
            row("Urina durante sessão", formatInteger(avaliacao.urineOutputDuringML, " mL")),
            row("Histórico recente de hidratação", avaliacao.recentHydrationHistory),
            row("Tolerância gastrointestinal", avaliacao.giTolerance),
        ].join(""))}

        ${section("Ambiente e Marcadores", [
            row("Temperatura", formatNumber(avaliacao.temperature, " °C")),
            row("Umidade relativa", formatInteger(avaliacao.humidity, "%")),
            row("Sensação térmica", avaliacao.thermalSensation),
            row("Condição de vento", avaliacao.windCondition),
            row("Exposição solar", avaliacao.solarExposure),
            row("Cor da urina", avaliacao.urineColor ? `Escala ${avaliacao.urineColor}` : "Não informado"),
            row("Nível de sede", avaliacao.thirstLevel ? `Nível ${avaliacao.thirstLevel} de 5` : "Não informado"),
            row("Roupa encharcada", formatBoolean(avaliacao.soakedClothing)),
            row("Troca de roupa", formatBoolean(avaliacao.clothingChanged)),
        ].join(""))}

        ${section("Sintomas", [
            row("Pré-treino", formatList(avaliacao.preSymptoms)),
            row("Pós-treino", formatList(avaliacao.postSymptoms)),
        ].join(""))}

        <section>
            <h2>Observações registradas</h2>
            <div class="notes">${escapeHtml(avaliacao.observations || "Nenhuma observação registrada para esta avaliação.")}</div>
        </section>

        <footer>
            Relatório informativo gerado a partir dos dados registrados no perfil de avaliação do atleta.
        </footer>
    </main>
</body>
</html>`;
}

export function openAvaliacaoPdf(avaliacao: AvaliacaoResponse) {
    const reportWindow = window.open("", "_blank", "width=960,height=720");

    if (!reportWindow) {
        window.alert("Não foi possível abrir o relatório. Verifique se o navegador bloqueou pop-ups.");
        return;
    }

    reportWindow.document.open();
    reportWindow.document.write(buildAvaliacaoReportHtml(avaliacao));
    reportWindow.document.close();
    reportWindow.focus();

    setTimeout(() => {
        reportWindow.print();
    }, 350);
}
