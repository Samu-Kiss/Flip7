import React, { useState } from "react";
import { cardColors } from "../../data";
import "./cardBadge.css";

export function CardBadge({ card, size = "md" }) {
  const isNum = card.type === "number";
  const isAction = card.type === "action";
  const accent = isNum ? cardColors[card.value] || "#64748b" : isAction ? "#1e40af" : "#065f46";

  const rawValue = isNum ? String(card.value) : String(card.label || card.value);
  const isExtraLife = /vida extra|2da oport\.?|chance/i.test(rawValue);
  const compactValue = isExtraLife ? "❤" : rawValue;
  const cornerValue = compactValue.length > 3 ? compactValue.slice(0, 2).toUpperCase() : compactValue;

  const isSmall = size === "sm";
  const dims = isSmall
    ? { width: 40, height: 56, marginRight: 3, marginBottom: 3 }
    : { width: 52, height: 72, marginRight: 5, marginBottom: 5 };

  const centerFontSize = isSmall
    ? compactValue.length >= 6
      ? 8
      : compactValue.length >= 4
        ? 9
        : 14
    : compactValue.length >= 6
      ? 10
      : compactValue.length >= 4
        ? 12
        : 20;

  const cardStyle = {
    width: dims.width,
    height: dims.height,
    marginRight: dims.marginRight,
    marginBottom: dims.marginBottom,
    display: "inline-flex",
    position: "relative",
    borderRadius: 10,
    border: `2px solid ${accent}`,
    boxSizing: "border-box",
    background: "linear-gradient(165deg,#ffffff 0%,#f1f5f9 50%,#dbeafe 100%)",
    boxShadow: "0 8px 18px rgba(2,6,23,0.45), inset 0 1px 0 rgba(255,255,255,0.85)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    verticalAlign: "middle"
  };

  return (
    <span className="card-badge-scene">
      <span className="card-badge-face" style={cardStyle}>
      <span
        style={{
          position: "absolute",
          top: 4,
          left: 5,
          color: accent,
          fontSize: isSmall ? 7 : 9,
          fontWeight: 900,
          letterSpacing: -0.2
        }}
      >
        {cornerValue}
      </span>

      <span
        style={{
          color: accent,
          fontSize: centerFontSize,
          fontWeight: 900,
          letterSpacing: compactValue.length > 4 ? 0 : -0.4,
          lineHeight: 1,
          textAlign: "center",
          padding: "0 3px"
        }}
      >
        {compactValue}
      </span>

      <span
        style={{
          position: "absolute",
          right: 5,
          bottom: 4,
          transform: "rotate(180deg)",
          color: accent,
          fontSize: isSmall ? 7 : 9,
          fontWeight: 900,
          letterSpacing: -0.2
        }}
      >
        {cornerValue}
      </span>
      </span>
    </span>
  );
}

export function StrategyBar({ shouldHit, reason, expectedScoreIfHit }) {
  return (
    <div
      style={{
        background: shouldHit ? "#052e16" : "#1a0e00",
        border: `1px solid ${shouldHit ? "#166534" : "#92400e"}`,
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10
      }}
    >
      <span style={{ fontSize: 20 }}>{shouldHit ? "🟢" : "🟠"}</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13, color: shouldHit ? "#4ade80" : "#fbbf24" }}>
          Estrategia optima: {shouldHit ? "HIT" : "STAY"}
        </div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
          {reason} · EV si hit: {expectedScoreIfHit.toFixed(1)} pts
        </div>
      </div>
    </div>
  );
}

export function CardPicker({ onPickMine, onPickOther, numberCountsRemaining, myRealNumbers, onUndo, canUndo = false }) {
  const [mode, setMode] = useState("mine");

  const pick = card => {
    if (mode === "mine") onPickMine(card);
    else onPickOther(card);
  };

  return (
    <div style={{ background: "#070714", border: "1px solid #1e1b4b", borderRadius: 12, padding: 14, marginBottom: 14 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#475569", fontWeight: 700 }}>Carta que salio:</span>
        <button
          onClick={() => setMode("mine")}
          style={{
            background: mode === "mine" ? "#4f46e5" : "#0f172a",
            border: `1px solid ${mode === "mine" ? "#6366f1" : "#1e1b4b"}`,
            color: mode === "mine" ? "#fff" : "#64748b",
            padding: "4px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 700
          }}
        >
          🙋 Mi mano
        </button>
        <button
          onClick={() => setMode("other")}
          style={{
            background: mode === "other" ? "#1e3a5f" : "#0f172a",
            border: `1px solid ${mode === "other" ? "#1d4ed8" : "#1e1b4b"}`,
            color: mode === "other" ? "#60a5fa" : "#64748b",
            padding: "4px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 700
          }}
        >
          👁 Otro / descarte
        </button>
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={!canUndo}
            style={{
              marginLeft: "auto",
              background: "#1e1b4b",
              border: "1px solid #312e81",
              color: canUndo ? "#818cf8" : "#334155",
              padding: "4px 10px",
              borderRadius: 6,
              cursor: canUndo ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: 700
            }}
          >
            ↶ Undo
          </button>
        )}
      </div>
      <div style={{ fontSize: 10, color: "#334155", marginBottom: 10 }}>
        {mode === "mine" ? "Toca el numero o carta que recibiste:" : "Carta que salio del mazo para otro jugador o fue descartada:"}
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 700, marginBottom: 6 }}>NUMEROS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
            const left = numberCountsRemaining[n] || 0;
            const inHand = myRealNumbers.includes(n);
            const exhausted = left <= 0;
            return (
              <button
                key={n}
                onClick={() => !exhausted && pick({ type: "number", value: n })}
                style={{
                  background: "transparent",
                  border: inHand ? "2px solid #fff" : "2px solid transparent",
                  borderRadius: 10,
                  padding: 2,
                  cursor: exhausted ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  fontWeight: 900,
                  opacity: exhausted ? 0.3 : 1,
                  width: 56,
                  textAlign: "center",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                <CardBadge card={{ type: "number", value: n }} size="sm" />
                <div style={{ fontSize: 8, color: exhausted ? "#2a2a3a" : "#94a3b8", lineHeight: 1 }}>x{left}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: "#065f46", fontWeight: 700, marginBottom: 6 }}>MODIFICADORES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {[
            { v: 2, l: "+2" },
            { v: 4, l: "+4" },
            { v: 6, l: "+6" },
            { v: 8, l: "+8 (a)" },
            { v: 8, l: "+8 (b)" },
            { v: 10, l: "+10" },
            { v: "x2", l: "x2" }
          ].map((m, i) => (
            <button
              key={i}
              onClick={() => pick({ type: "modifier", value: m.v, label: m.l })}
              style={{
                background: "transparent",
                border: "2px solid transparent",
                borderRadius: 10,
                padding: 2,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 800,
                fontSize: 12,
                width: 56,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CardBadge card={{ type: "modifier", value: m.v, label: m.l }} size="sm" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, color: "#1e40af", fontWeight: 700, marginBottom: 6 }}>ACCIONES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {[
            { v: "freeze", l: "Freeze" },
            { v: "flip3", l: "Flip 3" },
            { v: "chance", l: "❤ Vida extra" }
          ].map(a => (
            <button
              key={a.v}
              onClick={() => pick({ type: "action", value: a.v, label: a.l })}
              style={{
                background: "transparent",
                border: "2px solid transparent",
                borderRadius: 10,
                padding: 2,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: 11,
                width: 56,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CardBadge card={{ type: "action", value: a.v, label: a.l }} size="sm" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
