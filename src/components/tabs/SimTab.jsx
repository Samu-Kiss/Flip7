import React from "react";
import { CardBadge } from "../common";
import { simTabStyles } from "./styles/simTabStyles";
import "./styles/simLoading.css";

export function SimTab({ simRunning, runSimulation, simResults, simRounds, setSimRounds }) {
  const loadingCards = [
    { type: "number", value: 7 },
    { type: "modifier", value: "x2", label: "x2" },
    { type: "action", value: "chance", label: "❤ Vida extra" }
  ];

  const roundsText = Number(simRounds || 0).toLocaleString();

  const onRoundsInput = e => {
    const raw = e.target.value;
    const numeric = raw.replace(/[^\d]/g, "");
    setSimRounds(numeric === "" ? "" : Number(numeric));
  };

  const applyPreset = rounds => setSimRounds(rounds);

  const chartBuckets = simResults
    ? simResults.scoreDistribution
        .map((count, bucket) => ({ bucket, count }))
        .filter(({ bucket }) => bucket % 5 === 0)
    : [];

  const maxCount = chartBuckets.length > 0 ? Math.max(1, ...chartBuckets.map(({ count }) => count)) : 1;

  return (
    <div>
      <h3 style={{ color: "#a78bfa", fontWeight: 800, margin: "0 0 4px", fontSize: 16 }}>Simulacion Monte Carlo</h3>
      <p style={{ color: "#94a3b8", fontSize: 12, margin: "0 0 12px" }}>{roundsText} rondas con estrategia optima</p>

      <div style={simTabStyles.explainerCard}>
        <div style={simTabStyles.explainerTitle}>COMO FUNCIONA Y PARA QUE SIRVE</div>
        <div style={simTabStyles.explainerText}>
          Monte Carlo repite la ronda miles de veces con mazos barajados aleatoriamente para estimar resultados reales,
          no solo casos ideales.
        </div>
        <div style={simTabStyles.explainerList}>
          <div style={simTabStyles.explainerItem}>
            <span style={simTabStyles.explainerDot}>1</span>
            <span>Simula muchas partidas completas con la misma estrategia de decision.</span>
          </div>
          <div style={simTabStyles.explainerItem}>
            <span style={simTabStyles.explainerDot}>2</span>
            <span>Calcula promedio de score, frecuencia de bust y probabilidad de Flip 7.</span>
          </div>
          <div style={simTabStyles.explainerItem}>
            <span style={simTabStyles.explainerDot}>3</span>
            <span>Te ayuda a validar si conviene jugar agresivo o conservar puntos con STAY.</span>
          </div>
        </div>
      </div>

      <div style={simTabStyles.settingsCard}>
        <div style={simTabStyles.settingsTitle}>AJUSTES DE SIMULACION</div>
        <div style={simTabStyles.settingsControls}>
          <label style={simTabStyles.settingsLabel} htmlFor="sim-rounds-input">
            Rondas
          </label>
          <input
            id="sim-rounds-input"
            type="text"
            inputMode="numeric"
            value={simRounds}
            onChange={onRoundsInput}
            disabled={simRunning}
            style={simTabStyles.roundsInput}
            placeholder="50000"
          />
          {[10000, 50000, 100000].map(preset => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              disabled={simRunning}
              style={{
                ...simTabStyles.presetButton,
                opacity: simRunning ? 0.45 : 1,
                borderColor: Number(simRounds) === preset ? "#6366f1" : "#1e1b4b",
                color: Number(simRounds) === preset ? "#c7d2fe" : "#94a3b8"
              }}
            >
              {preset.toLocaleString()}
            </button>
          ))}
        </div>
        <div style={simTabStyles.settingsHint}>Rango recomendado: 10,000 - 100,000 (min 1,000 / max 500,000).</div>
      </div>

      <button
        onClick={runSimulation}
        disabled={simRunning}
        style={{
          background: simRunning ? "#1e1b4b" : "linear-gradient(135deg,#4f46e5,#7c3aed)",
          border: "none",
          color: simRunning ? "#6366f1" : "#fff",
          padding: "12px 28px",
          borderRadius: 10,
          cursor: simRunning ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontWeight: 800,
          fontSize: 14,
          marginBottom: 20
        }}
      >
        {simRunning ? "Simulando..." : "CORRER SIMULACION"}
      </button>

      {simRunning && (
        <div style={simTabStyles.loadingPanel}>
          <div className="sim-loading-deck">
            {loadingCards.map((card, i) => (
              <div key={`${card.type}-${i}`} className={`sim-loading-card-slot sim-loading-card-${i + 1}`}>
                <CardBadge card={card} />
              </div>
            ))}
          </div>
          <div style={simTabStyles.loadingTitle}>Corriendo simulacion</div>
          <div style={simTabStyles.loadingHint}>Barajando y resolviendo miles de rondas optimas...</div>
          <div className="sim-loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {simResults && (
        <div>
          <div style={simTabStyles.topGrid}>
            {[
              ["Score Promedio", simResults.avgScore.toFixed(1), "#a78bfa"],
              ["Tasa Bust", (simResults.bustRate * 100).toFixed(1) + "%", "#f87171"],
              ["Tasa Flip 7", (simResults.flip7Rate * 100).toFixed(1) + "%", "#4ade80"]
            ].map(([label, val, col]) => (
              <div key={label} style={simTabStyles.statCard}>
                <div style={{ fontSize: 24, fontWeight: 900, color: col }}>{val}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={simTabStyles.chartCard}>
            <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 12 }}>DISTRIBUCION DE SCORES</div>
            <div style={simTabStyles.chartBarsRow}>
              {chartBuckets.map(({ count, bucket }) => {
                const h = (count / maxCount) * 70;
                const hue = Math.floor((bucket / 200) * 260);
                return (
                  <div key={bucket} style={simTabStyles.chartBarCell}>
                    <div
                      style={{
                        width: "100%",
                        height: h,
                        background: `hsl(${250 - hue},70%,60%)`,
                        borderRadius: "2px 2px 0 0",
                        minHeight: count > 0 ? 2 : 0
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={simTabStyles.chartLabelsRow}>
              {chartBuckets.map(({ bucket }) => (
                <div key={`label-${bucket}`} style={simTabStyles.chartLabelCell}>
                  {bucket % 20 === 0 ? bucket : ""}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>Puntos por ronda</div>
          </div>
          <div style={simTabStyles.conclusionsCard}>
            <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 10 }}>CONCLUSIONES</div>
            {[
              { icon: "🎯", title: "Umbral de parada", body: "STAY cuando bust >25% con score >= 20, o siempre si bust >40%." },
              { icon: "📈", title: "Score esperado", body: `${simResults.avgScore.toFixed(1)} pts promedio sin bust.` },
              {
                icon: "💥",
                title: "Frecuencia bust",
                body: `${(simResults.bustRate * 100).toFixed(1)}% de rondas terminan en bust con estrategia optima.`
              },
              {
                icon: "🌟",
                title: "Flip 7 es raro",
                body: `Solo el ${(simResults.flip7Rate * 100).toFixed(2)}% - no lo persigas a toda costa.`
              },
              {
                icon: "🧠",
                title: "Memoria importa",
                body: "Rastrear que numeros salieron (tab Partida Real) reduce el riesgo real calculado."
              }
            ].map(({ icon, title, body }) => (
              <div key={title} style={simTabStyles.conclusionRow}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#c7d2fe" }}>{title}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
