import React from "react";
import { buildDeck } from "../../data";
import { calcBustProbOnNumber } from "../../logic";
import { CardBadge } from "../common";
import { statsTabStyles } from "./styles/statsTabStyles";

export function StatsTab() {
  const specialCards = {
    modifiers: [
      { card: { type: "modifier", value: 2, label: "+2" }, count: 1 },
      { card: { type: "modifier", value: 4, label: "+4" }, count: 1 },
      { card: { type: "modifier", value: 6, label: "+6" }, count: 1 },
      { card: { type: "modifier", value: 8, label: "+8" }, count: 2 },
      { card: { type: "modifier", value: 10, label: "+10" }, count: 1 },
      { card: { type: "modifier", value: "x2", label: "x2" }, count: 1 }
    ],
    actions: [
      { card: { type: "action", value: "freeze", label: "Freeze" }, count: 3 },
      { card: { type: "action", value: "flip3", label: "Flip 3" }, count: 3 },
      { card: { type: "action", value: "chance", label: "❤ Vida extra" }, count: 3 }
    ]
  };

  return (
    <div>
      <h3 style={{ color: "#a78bfa", fontWeight: 800, margin: "0 0 16px", fontSize: 16 }}>Anatomia del Mazo</h3>
      <div style={statsTabStyles.sectionCardSpaced}>
        <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 10 }}>COMPOSICION (95 cartas)</div>
        <div style={statsTabStyles.numbersGrid}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
            const count = n === 0 ? 1 : n;
            return (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ marginBottom: 2 }}>
                  <CardBadge card={{ type: "number", value: n }} />
                </div>
                <div style={{ fontSize: 9, color: "#64748b" }}>{count}x</div>
                <div style={{ fontSize: 8, color: "#475569" }}>{((count / 95) * 100).toFixed(1)}%</div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 11, color: "#93c5fd", fontWeight: 800, marginBottom: 8 }}>CARTAS ESPECIALES</div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: "#86efac", fontWeight: 700, marginBottom: 6 }}>MODIFICADORES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {specialCards.modifiers.map(({ card, count }, i) => (
              <div key={`mod-${i}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CardBadge card={card} />
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>x{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: "#93c5fd", fontWeight: 700, marginBottom: 6 }}>ACCIONES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {specialCards.actions.map(({ card, count }, i) => (
              <div key={`act-${i}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CardBadge card={card} />
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>x{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={statsTabStyles.tripletGrid}>
          {["Numericas", "Modificadores", "Acciones"].map((label, i) => {
            const vals = ["79", "7", "9"];
            const cols = ["#818cf8", "#4ade80", "#60a5fa"];
            return (
              <div
                key={label}
                style={{ background: "#070710", border: `1px solid ${cols[i]}33`, borderRadius: 8, padding: "8px", textAlign: "center" }}
              >
                <div style={{ fontSize: 18, fontWeight: 900, color: cols[i] }}>{vals[i]}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={statsTabStyles.sectionCardSpaced}>
        <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 10 }}>PROBABILIDAD DE BUST (mazo completo)</div>
        {[
          { cards: 1, nums: [7] },
          { cards: 2, nums: [5, 7] },
          { cards: 3, nums: [3, 5, 7] },
          { cards: 4, nums: [2, 4, 7, 9] },
          { cards: 5, nums: [1, 3, 5, 8, 10] },
          { cards: 6, nums: [1, 2, 4, 6, 9, 11] }
        ].map(row => {
          const r = [...buildDeck()];
          row.nums.forEach(n => {
            const idx = r.findIndex(c => c.type === "number" && c.value === n);
            if (idx !== -1) r.splice(idx, 1);
          });
          const bp = calcBustProbOnNumber(r, row.nums);
          const col = bp < 0.1 ? "#4ade80" : bp < 0.2 ? "#a3e635" : bp < 0.3 ? "#fbbf24" : bp < 0.4 ? "#f97316" : "#ef4444";
          return (
            <div key={row.cards} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 60, fontSize: 11, color: "#94a3b8" }}>{row.cards} cartas</div>
              <div style={{ flex: 1, background: "#0a0a14", borderRadius: 4, height: 14, overflow: "hidden" }}>
                <div style={{ width: `${(bp * 100).toFixed(1)}%`, background: col, height: "100%" }} />
              </div>
              <div style={{ width: 42, textAlign: "right", fontSize: 12, fontWeight: 700, color: col }}>
                {(bp * 100).toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>

      <div style={statsTabStyles.sectionCard}>
        <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, marginBottom: 10 }}>DATOS CLAVE</div>
        {[
          ["Cartas altas (8-12)", "son el 61.5% del mazo numerico", "⚠️"],
          ["Carta mas probable", "12 (12.65% de todas las cartas)", "🎯"],
          ["Flip 7 requiere", "exactamente 7 numeros unicos", "🎉"],
          ["Score promedio Flip 7", "~42 pts de numeros + 15 bonus", "💰"],
          ["Riesgo fatal", ">40% bust = casi siempre STAY", "🛑"],
          ["Zona segura", "<15% bust = generalmente HIT", "✅"]
        ].map(([title, detail, icon]) => (
          <div key={title} style={statsTabStyles.keyFactRow}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#c7d2fe" }}>{title}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
