import logoSaoCamilo from "../assets/logo_saocamilo_completo.svg";
import type { AvaliacaoResponse } from "../services/api";
import {
    getAvaliacaoMetrics,
    getHydrationRiskProfile,
    getUrineColorHex,
    getUrineColorLabel,
    URINE_COLOR_SCALE,
} from "./hydrationMetrics";

const MAUA_LOGO_URL = "https://www.aeamesp.org.br/wp-content/uploads/2017/08/LOGO-MAU%C3%81-IMT-300x191.png";

const escapeHtml = (value: unknown) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const formatNumber = (value?: number, digits = 2, suffix = "") => {
    if (value === undefined || value === null || Number.isNaN(value)) return "Não informado";
    return `${value.toFixed(digits).replace(".", ",")}${suffix}`;
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

const metricCard = (label: string, value: string, note?: string, emphasis = false) => `
    <div class="metric-card ${emphasis ? "metric-card--emphasis" : ""}">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        ${note ? `<small>${escapeHtml(note)}</small>` : ""}
    </div>
`;

const row = (label: string, value: unknown) => `
    <div class="row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value || "Não informado")}</strong>
    </div>
`;

const section = (title: string, eyebrow: string, content: string) => `
    <section class="section">
        <div class="section-title">
            <span>${escapeHtml(eyebrow)}</span>
            <h2>${escapeHtml(title)}</h2>
        </div>
        ${content}
    </section>
`;

const getBalancePosition = (balance: number) => {
    const min = -2000;
    const max = 1000;
    const clamped = Math.max(min, Math.min(max, balance));
    return ((clamped - min) / (max - min)) * 100;
};

const getWeightBarWidth = (current: number, final: number) => {
    const max = Math.max(current, final, 1);
    return {
        current: Math.max(8, (current / max) * 100),
        final: Math.max(8, (final / max) * 100),
    };
};

const getCompositionSlices = (fluid: number, food: number, urine: number) => {
    const total = Math.max(fluid + food + urine, 1);
    return {
        fluid: (fluid / total) * 100,
        food: (food / total) * 100,
        urine: (urine / total) * 100,
    };
};

const getGeneratedAt = () =>
    new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export function buildAvaliacaoReportHtml(avaliacao: AvaliacaoResponse) {
    const metrics = getAvaliacaoMetrics(avaliacao);
    const risk = getHydrationRiskProfile(avaliacao);
    const balancePosition = getBalancePosition(metrics.hydrationBalance);
    const weightBars = getWeightBarWidth(avaliacao.currentWeight, avaliacao.finalWeight);
    const composition = getCompositionSlices(metrics.fluidIntakeML, metrics.foodWaterML, metrics.urineOutputML);
    const saoCamiloLogoUrl = new URL(logoSaoCamilo, window.location.origin).href;

    const massVariationText =
        metrics.massDeltaKg > 0
            ? `Perda de ${formatNumber(metrics.massDeltaKg, 2, " kg")}`
            : metrics.massDeltaKg < 0
                ? `Ganho de ${formatNumber(Math.abs(metrics.massDeltaKg), 2, " kg")}`
                : "Sem variação";

    return `<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <title>Relatório de Hidratação - ${escapeHtml(avaliacao.atletaNome)}</title>
    <style>
        @page { size: A4; margin: 12mm; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #edf0f3;
            color: #172033;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.42;
        }
        main {
            width: min(960px, calc(100% - 24px));
            margin: 18px auto;
            background: #ffffff;
            border: 1px solid #dde3ea;
            box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
            overflow: hidden;
        }
        header {
            padding: 26px 30px 24px;
            background:
                linear-gradient(135deg, rgba(141, 21, 31, 0.96), rgba(183, 28, 28, 0.94)),
                #9f1724;
            color: #ffffff;
        }
        .brand-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 24px;
        }
        .logos {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .logo-box {
            width: 128px;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 10px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.42);
        }
        .logo-box img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .doc-meta {
            text-align: right;
            font-size: 11px;
            color: rgba(255,255,255,0.78);
            text-transform: uppercase;
            letter-spacing: .08em;
            font-weight: 700;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: 0;
            line-height: 1.05;
        }
        .subtitle {
            margin: 8px 0 0;
            max-width: 720px;
            color: rgba(255,255,255,0.84);
            font-size: 13px;
        }
        .risk-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 14px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.16);
            border: 1px solid rgba(255,255,255,0.26);
            font-weight: 800;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .05em;
        }
        .content { padding: 22px 30px 28px; }
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 18px;
        }
        .metric-card {
            min-height: 92px;
            border: 1px solid #e3e8ef;
            border-radius: 8px;
            padding: 12px;
            background: #f9fafb;
        }
        .metric-card--emphasis {
            border-color: #f0c8cc;
            background: #fff6f7;
        }
        .metric-card span {
            display: block;
            color: #657084;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: .06em;
            text-transform: uppercase;
        }
        .metric-card strong {
            display: block;
            margin-top: 7px;
            color: #8d151f;
            font-size: 19px;
            line-height: 1.08;
        }
        .metric-card small {
            display: block;
            margin-top: 6px;
            color: #6b7280;
            font-size: 11px;
        }
        .section {
            break-inside: avoid;
            border-top: 1px solid #edf0f3;
            padding-top: 18px;
            margin-top: 18px;
        }
        .section-title {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
        }
        .section-title span {
            color: #a51d2a;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: .14em;
            text-transform: uppercase;
        }
        h2 {
            margin: 0;
            color: #172033;
            font-size: 17px;
        }
        .rows {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px 14px;
        }
        .row {
            border: 1px solid #edf0f3;
            border-radius: 8px;
            padding: 10px 11px;
            background: #ffffff;
        }
        .row span {
            display: block;
            color: #6b7280;
            font-size: 11px;
            font-weight: 700;
        }
        .row strong {
            display: block;
            margin-top: 4px;
            color: #202938;
            font-size: 12px;
        }
        .chart-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        .chart-card {
            border: 1px solid #e3e8ef;
            border-radius: 8px;
            padding: 14px;
            background: #ffffff;
            min-height: 150px;
        }
        .chart-card h3 {
            margin: 0 0 12px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: #475569;
        }
        .balance-track {
            position: relative;
            height: 14px;
            border-radius: 999px;
            background: linear-gradient(90deg, #dc2626 0%, #f59e0b 45%, #22c55e 100%);
            margin: 34px 0 10px;
        }
        .balance-marker {
            position: absolute;
            top: -8px;
            left: ${balancePosition}%;
            width: 4px;
            height: 30px;
            border-radius: 999px;
            background: #111827;
            box-shadow: 0 0 0 3px rgba(17,24,39,0.12);
        }
        .axis {
            display: flex;
            justify-content: space-between;
            color: #6b7280;
            font-size: 10px;
            font-weight: 700;
        }
        .bar-row {
            display: grid;
            grid-template-columns: 76px 1fr 64px;
            align-items: center;
            gap: 8px;
            margin: 9px 0;
            font-size: 11px;
            color: #475569;
            font-weight: 700;
        }
        .bar {
            height: 12px;
            border-radius: 999px;
            background: #e5e7eb;
            overflow: hidden;
        }
        .bar-fill {
            height: 100%;
            border-radius: 999px;
            background: #8d151f;
        }
        .stack {
            display: flex;
            height: 18px;
            overflow: hidden;
            border-radius: 999px;
            background: #e5e7eb;
        }
        .stack span:nth-child(1) { background: #2563eb; width: ${composition.fluid}%; }
        .stack span:nth-child(2) { background: #22c55e; width: ${composition.food}%; }
        .stack span:nth-child(3) { background: #f59e0b; width: ${composition.urine}%; }
        .legend {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 12px;
            margin-top: 10px;
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
        }
        .legend i {
            display: inline-block;
            width: 9px;
            height: 9px;
            border-radius: 2px;
            margin-right: 4px;
        }
        .urine-scale {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 4px;
            margin-top: 10px;
        }
        .urine-chip {
            height: 30px;
            border-radius: 6px;
            border: 1px solid rgba(15,23,42,0.14);
            position: relative;
        }
        .urine-chip.active {
            outline: 2px solid #111827;
            outline-offset: 2px;
        }
        .urine-chip span {
            position: absolute;
            inset: auto 0 4px;
            text-align: center;
            font-size: 9px;
            font-weight: 900;
            color: #111827;
        }
        .formula {
            border: 1px solid #f0c8cc;
            background: #fff8f8;
            border-radius: 8px;
            padding: 13px 14px;
            color: #4b5563;
            font-size: 12px;
        }
        .formula strong {
            display: block;
            margin-bottom: 5px;
            color: #8d151f;
            font-size: 13px;
        }
        .alerts {
            display: grid;
            gap: 8px;
        }
        .alert {
            border: 1px solid #f5c2c7;
            border-left: 4px solid #b91c1c;
            border-radius: 8px;
            padding: 10px 12px;
            background: #fff6f7;
            color: #7f1d1d;
            font-size: 12px;
            font-weight: 700;
        }
        .recommendation {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .rec-box {
            border: 1px solid #dbeafe;
            background: #f8fbff;
            border-radius: 8px;
            padding: 13px;
        }
        .rec-box span {
            color: #475569;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: .06em;
        }
        .rec-box strong {
            display: block;
            margin-top: 7px;
            color: #1d4ed8;
            font-size: 20px;
        }
        .notes {
            white-space: pre-wrap;
            color: #374151;
            font-size: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 12px;
            background: #f9fafb;
        }
        footer {
            margin-top: 20px;
            padding-top: 14px;
            border-top: 1px solid #edf0f3;
            color: #6b7280;
            font-size: 10px;
        }
        .close-bar {
            background: #ffffff;
            border-bottom: 1px solid #dde3ea;
            padding: 12px;
            display: flex;
            justify-content: center;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .close-btn {
            background: #9f1724;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }
        .close-btn:hover {
            background: #82121c;
        }
        @media print {
            .no-print { display: none !important; }
            body { background: #ffffff; }
            main {
                width: 100%;
                margin: 0;
                border: 0;
                box-shadow: none;
            }
            header { padding: 18px 20px; }
            .content { padding: 18px 20px 0; }
            .section { margin-top: 14px; padding-top: 14px; }
            .metric-grid { gap: 8px; }
        }
    </style>
</head>
<body>
    <div class="close-bar no-print">
        <button onclick="window.close()" class="close-btn">
            ✕ Fechar Relatório
        </button>
    </div>
    <main>
        <header>
            <div class="brand-row">
                <div class="logos">
                    <div class="logo-box"><img src="${escapeHtml(saoCamiloLogoUrl)}" alt="São Camilo" /></div>
                    <div class="logo-box"><img src="${escapeHtml(MAUA_LOGO_URL)}" alt="Instituto Mauá de Tecnologia" /></div>
                </div>
                <div class="doc-meta">Relatório técnico<br />Gerado em ${escapeHtml(getGeneratedAt())}</div>
            </div>
            <h1>Relatório de Avaliação Hídrica</h1>
            <p class="subtitle">Síntese individual de resposta ao exercício, ingestão realizada, perda hídrica estimada e sinais operacionais de risco para revisão profissional.</p>
            <div class="risk-pill">${escapeHtml(risk.label)} · ${escapeHtml(risk.description)}</div>
        </header>

        <div class="content">
            <div class="metric-grid">
                ${metricCard("Atleta", avaliacao.atletaNome || "Não informado", "Identificação por nome registrado", true)}
                ${metricCard("Taxa de sudorese", formatNumber(metrics.sweatRateLh, 2, " L/h"), "Estimativa ajustada", true)}
                ${metricCard("Balanço hídrico", formatInteger(metrics.hydrationBalance, " mL"), metrics.hydrationBalance < 0 ? "Déficit estimado" : "Superávit estimado")}
                <div class="metric-card">
                    <span>Cor da urina</span>
                    <strong style="display:flex;align-items:center;gap:8px;">
                        <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${getUrineColorHex(avaliacao.urineColor)};border:2px solid rgba(0,0,0,0.15);flex-shrink:0;"></span>
                        Escala ${escapeHtml(String(avaliacao.urineColor || "-"))} — ${escapeHtml(getUrineColorLabel(avaliacao.urineColor))}
                    </strong>
                    <small>Classificação basal pré-exercício</small>
                </div>
                ${metricCard("Modalidade", avaliacao.modality || "Não informado", formatDate(avaliacao.dataAvaliacao))}
                ${metricCard("Duração real", formatDuration(avaliacao.durationSeconds), avaliacao.plannedDurationMin ? `Planejado: ${avaliacao.plannedDurationMin} min` : "Planejado não informado")}
                ${metricCard("Variação de massa", massVariationText, formatNumber(metrics.bodyMassLossPct, 2, "%"))}
                ${metricCard("Ingestão alvo", formatInteger(metrics.recommendedIntakeMLh, " mL/h"), "Baseada na taxa estimada")}
            </div>

            ${section("Resumo executivo", "Síntese", `
                <div class="rows">
                    ${row("Data da avaliação", formatDate(avaliacao.dataAvaliacao))}
                    ${row("Ambiente", avaliacao.isOutdoor === undefined ? "Não informado" : avaliacao.isOutdoor ? "Ao ar livre" : "Ambiente fechado")}
                    ${row("Percepção de esforço", avaliacao.perceivedIntensity)}
                    ${row("Massa corporal pré", formatNumber(avaliacao.currentWeight, 2, " kg"))}
                    ${row("Massa corporal pós", formatNumber(avaliacao.finalWeight, 2, " kg"))}
                    ${row("Perda hídrica ajustada", formatNumber(metrics.adjustedFluidLossL, 3, " L"))}
                    ${row("Líquidos ingeridos", formatInteger(metrics.fluidIntakeML, " mL"))}
                    ${row("Água de alimentos", formatInteger(metrics.foodWaterML, " mL"))}
                    ${row("Urina durante a sessão", formatInteger(metrics.urineOutputML, " mL"))}
                </div>
            `)}

            ${section("Visualização dos indicadores", "Gráficos", `
                <div class="chart-grid">
                    <div class="chart-card">
                        <h3>Balanço hídrico da sessão</h3>
                        <div class="balance-track"><span class="balance-marker"></span></div>
                        <div class="axis"><span>-2000 mL</span><span>Equilíbrio</span><span>+1000 mL</span></div>
                        <p class="subtitle" style="color:#64748b;margin-top:12px;">Resultado: <strong>${escapeHtml(formatInteger(metrics.hydrationBalance, " mL"))}</strong></p>
                    </div>
                    <div class="chart-card">
                        <h3>Comparação de massa corporal</h3>
                        <div class="bar-row"><span>Pré</span><div class="bar"><div class="bar-fill" style="width:${weightBars.current}%"></div></div><strong>${escapeHtml(formatNumber(avaliacao.currentWeight, 1, " kg"))}</strong></div>
                        <div class="bar-row"><span>Pós</span><div class="bar"><div class="bar-fill" style="width:${weightBars.final}%;background:#64748b;"></div></div><strong>${escapeHtml(formatNumber(avaliacao.finalWeight, 1, " kg"))}</strong></div>
                    </div>
                    <div class="chart-card">
                        <h3>Composição do balanço</h3>
                        <div class="stack"><span></span><span></span><span></span></div>
                        <div class="legend">
                            <span><i style="background:#2563eb"></i>Líquidos: ${escapeHtml(formatInteger(metrics.fluidIntakeML, " mL"))}</span>
                            <span><i style="background:#22c55e"></i>Alimentos: ${escapeHtml(formatInteger(metrics.foodWaterML, " mL"))}</span>
                            <span><i style="background:#f59e0b"></i>Urina: ${escapeHtml(formatInteger(metrics.urineOutputML, " mL"))}</span>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h3>Escala de cor da urina</h3>
                        <div class="urine-scale">
                            ${URINE_COLOR_SCALE.map((item) => `
                                <div class="urine-chip ${item.score === avaliacao.urineColor ? "active" : ""}" style="background:${escapeHtml(getUrineColorHex(item.score))}">
                                    <span>${item.score}</span>
                                </div>
                            `).join("")}
                        </div>
                        <p class="subtitle" style="color:#64748b;margin-top:12px;">Classificação: <strong>${escapeHtml(getUrineColorLabel(avaliacao.urineColor))}</strong></p>
                    </div>
                </div>
            `)}

            ${section("Detalhamento técnico", "Cálculo", `
                <div class="formula">
                    <strong>Fórmula aplicada</strong>
                    Perda hídrica ajustada (L) = (massa pré - massa pós) + ((líquidos + água dos alimentos) / 1000) - (urina durante a sessão / 1000).<br />
                    Nesta avaliação: (${escapeHtml(formatNumber(avaliacao.currentWeight, 2))} - ${escapeHtml(formatNumber(avaliacao.finalWeight, 2))}) + ((${metrics.fluidIntakeML} + ${metrics.foodWaterML}) / 1000) - (${metrics.urineOutputML} / 1000) = ${escapeHtml(formatNumber(metrics.adjustedFluidLossL, 3, " L"))}.
                </div>
                <div class="rows" style="margin-top:12px;">
                    ${row("Taxa de sudorese estimada", formatNumber(metrics.sweatRateLh, 2, " L/h"))}
                    ${row("Variação percentual de massa", formatNumber(metrics.bodyMassLossPct, 2, "%"))}
                    ${row("Balanço hídrico", formatInteger(metrics.hydrationBalance, " mL"))}
                    ${row("Temperatura", formatNumber(avaliacao.temperature, 1, " °C"))}
                    ${row("Umidade relativa", formatInteger(avaliacao.humidity, "%"))}
                    ${row("Exposição solar", avaliacao.solarExposure)}
                    ${row("Sensação térmica", avaliacao.thermalSensation)}
                    ${row("Condição de vento", avaliacao.windCondition)}
                    ${row("Vestimenta/equipamento", avaliacao.clothingType)}
                </div>
            `)}

            ${section("Alertas técnicos", "Triagem", `
                <div class="alerts">
                    ${metrics.alerts.length > 0
                        ? metrics.alerts.map((alert) => `<div class="alert">${escapeHtml(alert)}</div>`).join("")
                        : `<div class="alert" style="border-color:#bbf7d0;border-left-color:#16a34a;background:#f0fdf4;color:#166534;">Nenhum alerta operacional crítico identificado nos dados registrados.</div>`
                    }
                </div>
            `)}

            ${section("Recomendações individualizadas", "Feedforward", `
                <div class="recommendation">
                    <div class="rec-box">
                        <span>Faixa alvo por hora</span>
                        <strong>${escapeHtml(formatInteger(metrics.recommendedIntakeMLh, " mL/h"))}</strong>
                    </div>
                    <div class="rec-box">
                        <span>Fracionamento prático</span>
                        <strong>${escapeHtml(formatInteger(metrics.recommendationEvery15Min, " mL"))} / 15 min</strong>
                    </div>
                </div>
                <div class="rows" style="margin-top:12px;">
                    ${row("A cada 10 minutos", formatInteger(metrics.recommendationEvery10Min, " mL"))}
                    ${row("A cada 15 minutos", formatInteger(metrics.recommendationEvery15Min, " mL"))}
                    ${row("A cada 20 minutos", formatInteger(metrics.recommendationEvery20Min, " mL"))}
                    ${row("Histórico recente de hidratação", avaliacao.recentHydrationHistory)}
                    ${row("Tolerância gastrointestinal", avaliacao.giTolerance)}
                    ${row("Roupa encharcada / troca", `${formatBoolean(avaliacao.soakedClothing)} / ${formatBoolean(avaliacao.clothingChanged)}`)}
                </div>
            `)}

            ${section("Sintomas e observações", "Registro clínico", `
                <div class="rows">
                    ${row("Sintomas pré-sessão", formatList(avaliacao.preSymptoms))}
                    ${row("Sintomas pós-sessão", formatList(avaliacao.postSymptoms))}
                    ${row("Nível de sede basal", avaliacao.thirstLevel ? `Nível ${avaliacao.thirstLevel} de 5` : "Não informado")}
                </div>
                <div class="notes" style="margin-top:12px;">${escapeHtml(avaliacao.observations || "Nenhuma observação registrada para esta avaliação.")}</div>
            `)}

            <footer>
                Relatório informativo gerado pelo sistema São Camilo / Instituto Mauá de Tecnologia. As estimativas dependem da qualidade da coleta, não configuram diagnóstico e não substituem avaliação individual de nutricionista, médico ou profissional habilitado.
            </footer>
        </div>
    </main>
</body>
</html>`;
}

export function openAvaliacaoPdf(avaliacao: AvaliacaoResponse) {
    const reportWindow = window.open("", "_blank", "width=1040,height=760");

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
    }, 600);
}
