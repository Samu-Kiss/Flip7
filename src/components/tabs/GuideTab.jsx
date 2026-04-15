import React from "react";
import { guideTabStyles } from "./styles/guideTabStyles";
import "./styles/guideTabAnimations.css";

const flow = [
  {
    step: "1",
    title: "Roba una carta",
    body: "Si sale un numero nuevo, lo agregas a tu mano y sube tu score.",
    accent: "#818cf8"
  },
  {
    step: "2",
    title: "Evita repetidos",
    body: "Si te sale un numero que ya tienes, haces BUST y pierdes la ronda (salvo Vida extra).",
    accent: "#f87171"
  },
  {
    step: "3",
    title: "Decide HIT o STAY",
    body: "Puedes seguir robando para más puntos o plantarte y guardar lo acumulado.",
    accent: "#fbbf24"
  },
  {
    step: "4",
    title: "Consigue Flip 7",
    body: "Si juntas 7 numeros unicos, activas bonus de +15 y normalmente una ronda gigante.",
    accent: "#4ade80"
  }
];

const cardTypes = [
  {
    title: "Numeros",
    subtitle: "Base del score",
    body: "Sumas sus valores. Repetir uno ya visto causa BUST.",
    bg: "#111827",
    border: "#334155",
    color: "#a5b4fc"
  },
  {
    title: "Modificadores",
    subtitle: "Boost de puntos",
    body: "+2,+4,+6,+8,+10 y x2. Se aplican al total de la mano.",
    bg: "#052e16",
    border: "#166534",
    color: "#86efac"
  },
  {
    title: "Acciones",
    subtitle: "Efecto especial",
    body: "Freeze te planta, Flip 3 acelera la ronda y Vida extra te salva un bust.",
    bg: "#0c1f3f",
    border: "#1d4ed8",
    color: "#93c5fd"
  }
];

export function GuideTab() {
  const numberExamples = [
    { kind: "number", value: "3", color: "#a855f7" },
    { kind: "number", value: "7", color: "#f59e0b" },
    { kind: "number", value: "11", color: "#14b8a6" }
  ];

  const modifierExamples = [
    { kind: "modifier", value: "+4", color: "#059669" },
    { kind: "modifier", value: "x2", color: "#047857" }
  ];

  const actionExamples = [
    { kind: "action", value: "Freeze", color: "#1d4ed8" },
    { kind: "action", value: "Flip 3", color: "#1e40af" },
    { kind: "action", value: "❤", color: "#2563eb" }
  ];

  const RealCard = ({ card, delay = 0, tilt = 0 }) => (
    <div className="guide-card-scene" style={{ animationDelay: `${delay}ms`, transform: `rotate(${tilt}deg)` }}>
      <div className="guide-card" style={{ borderColor: card.color }}>
        {(() => {
          const compact = card.value.length > 5 ? card.value.replace("Flip 3", "F3") : card.value;
          const corner = compact.length > 3 ? compact.slice(0, 2).toUpperCase() : compact;
          const fontSize = compact.length >= 4 ? 14 : 22;

          return (
            <>
              <div className="guide-card-gloss" />
              <div className="guide-card-corner guide-card-corner-top" style={{ color: card.color }}>
                {corner}
              </div>
              <div className="guide-card-center" style={{ color: card.color, fontSize, letterSpacing: compact.length >= 4 ? 0 : -0.5 }}>
                {compact}
              </div>
              <div className="guide-card-corner guide-card-corner-bottom" style={{ color: card.color }}>
                {corner}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );

  return (
    <div>
      <div style={guideTabStyles.introCard}>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#c4b5fd", marginBottom: 6 }}>Como funciona Flip 7</div>
        <div style={{ fontSize: 12, color: "#a5b4fc", lineHeight: 1.6 }}>
          Flip 7 es un juego de riesgo: quieres construir una mano grande, pero cada robo aumenta la probabilidad de bust.
          La clave es balancear ambicion y control.
        </div>
      </div>

      <div style={guideTabStyles.flowGrid}>
        {flow.map(item => (
          <div key={item.step} style={guideTabStyles.flowCard}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  width: 24,
                  height: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  background: item.accent,
                  color: "#0b1020",
                  fontWeight: 900,
                  fontSize: 12
                }}
              >
                {item.step}
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0" }}>{item.title}</span>
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <div style={guideTabStyles.cardTypesWrap}>
        <div style={{ fontSize: 12, color: "#c7d2fe", fontWeight: 800, marginBottom: 10 }}>Tipos de cartas</div>
        <div style={guideTabStyles.cardTypesGrid}>
          {cardTypes.map(type => (
            <div
              key={type.title}
              style={{
                ...guideTabStyles.typeCard,
                background: type.bg,
                borderColor: type.border
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, color: type.color }}>{type.title}</div>
              <div style={{ fontSize: 10, color: "#64748b", margin: "2px 0 6px" }}>{type.subtitle}</div>
              <div style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.5 }}>{type.body}</div>

              <div style={guideTabStyles.miniDeckRow}>
                {type.title === "Numeros" &&
                  numberExamples.map((card, i) => <RealCard key={i} card={card} delay={i * 120} tilt={-6 + i * 6} />)}
                {type.title === "Modificadores" &&
                  modifierExamples.map((card, i) => <RealCard key={i} card={card} delay={i * 120} tilt={-4 + i * 8} />)}
                {type.title === "Acciones" &&
                  actionExamples.map((card, i) => <RealCard key={i} card={card} delay={i * 120} tilt={-8 + i * 8} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={guideTabStyles.tipsCard}>
        <div style={{ fontSize: 12, color: "#93c5fd", fontWeight: 800, marginBottom: 8 }}>Mini estrategia practica</div>
        <div style={guideTabStyles.tipsGrid}>
          <div style={guideTabStyles.tipRow}>Riesgo &lt; 15%: normalmente puedes presionar HIT.</div>
          <div style={guideTabStyles.tipRow}>Riesgo 15-30%: depende de tu score actual.</div>
          <div style={guideTabStyles.tipRow}>Riesgo &gt; 40%: casi siempre conviene STAY.</div>
          <div style={guideTabStyles.tipRow}>Con ❤ Vida extra, puedes tolerar un poco mas de riesgo.</div>
        </div>
      </div>

      <div style={guideTabStyles.demoCard}>
        <div style={{ fontSize: 12, color: "#c7d2fe", fontWeight: 800, marginBottom: 8 }}>Ejemplo de ronda</div>
        <div style={guideTabStyles.demoRow}>
          <span style={{ ...guideTabStyles.demoBadge, background: "#1e293b", color: "#93c5fd" }}>Inicio</span>
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>Mano vacia, score 0.</span>
        </div>
        <div style={guideTabStyles.demoRow}>
          <span style={{ ...guideTabStyles.demoBadge, background: "#312e81", color: "#c4b5fd" }}>Hit #1</span>
          <RealCard card={{ kind: "number", value: "7", color: "#f59e0b" }} delay={120} tilt={-4} />
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>Score = 7.</span>
        </div>
        <div style={guideTabStyles.demoRow}>
          <span style={{ ...guideTabStyles.demoBadge, background: "#312e81", color: "#c4b5fd" }}>Hit #2</span>
          <RealCard card={{ kind: "modifier", value: "+4", color: "#059669" }} delay={220} tilt={-2} />
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>Score = 11.</span>
        </div>
        <div style={guideTabStyles.demoRow}>
          <span style={{ ...guideTabStyles.demoBadge, background: "#7f1d1d", color: "#fecaca" }}>Hit #3</span>
          <RealCard card={{ kind: "number", value: "7", color: "#f59e0b" }} delay={320} tilt={2} />
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>Repetido -&gt; BUST si no tienes Vida extra.</span>
        </div>

        <div style={{ ...guideTabStyles.demoRow, marginTop: 6 }}>
          <span style={{ ...guideTabStyles.demoBadge, background: "#0c1f3f", color: "#93c5fd" }}>Salvado</span>
          <RealCard card={{ kind: "action", value: "❤", color: "#2563eb" }} delay={420} tilt={4} />
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>Consumes la oportunidad y sigues vivo.</span>
        </div>

        <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>Por eso la app calcula riesgo en tiempo real.</div>
      </div>
    </div>
  );
}
