import React from "react";
import { bpBg, bpColor } from "../../logic";
import { CardBadge, StrategyBar } from "../common";
import { playTabStyles } from "./styles/playTabStyles";

export function PlayTab({
  currentScore,
  bustProb,
  myNumbers,
  strategy,
  gameState,
  resetGame,
  myModifiers,
  hasSecondChance,
  drawCard,
  stay,
  log,
  logRef,
  remaining
}) {
  return (
    <div>
      <div style={playTabStyles.topGrid}>
        <div style={playTabStyles.statCard}>
          <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 700, marginBottom: 4 }}>SCORE</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#a78bfa" }}>{currentScore}</div>
        </div>
        <div style={{ ...playTabStyles.statCard, background: bpBg(bustProb), border: `1px solid ${bpColor(bustProb)}33` }}>
          <div style={{ fontSize: 10, color: bpColor(bustProb), fontWeight: 700, marginBottom: 4 }}>RIESGO BUST</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: bpColor(bustProb) }}>{(bustProb * 100).toFixed(1)}%</div>
        </div>
        <div style={playTabStyles.statCard}>
          <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, marginBottom: 4 }}>CARTAS</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#94a3b8" }}>{myNumbers.length}/7</div>
        </div>
      </div>

      {strategy && gameState === "playing" && <StrategyBar {...strategy} />}

      {gameState !== "playing" && (
        <div
          style={{
            ...playTabStyles.gameOverBox,
            background: gameState === "busted" ? "#1a0000" : gameState === "flip7" ? "#052e16" : "#0f172a",
            border: `1px solid ${
              gameState === "busted" ? "#7f1d1d" : gameState === "flip7" ? "#166534" : "#312e81"
            }`
          }}
        >
          <div style={{ fontSize: 22, marginBottom: 4 }}>
            {gameState === "busted" ? "BUST" : gameState === "flip7" ? "FLIP 7!" : "STAY"}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>
            {gameState === "busted" ? "0 puntos" : `Score: ${currentScore} pts`}
          </div>
          <button
            onClick={resetGame}
            style={{
              background: "#4f46e5",
              border: "none",
              color: "#fff",
              padding: "8px 24px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: 13
            }}
          >
            Nueva ronda
          </button>
        </div>
      )}

      <div style={playTabStyles.handCard}>
        <div style={{ fontSize: 11, color: "#4f46e5", fontWeight: 700, marginBottom: 8 }}>TUS CARTAS</div>
        <div style={{ minHeight: 32 }}>
          {myNumbers.length === 0 ? (
            <span style={{ color: "#334155", fontSize: 12 }}>Sin cartas aun...</span>
          ) : (
            myNumbers.map((n, i) => <CardBadge key={i} card={{ type: "number", value: n }} />)
          )}
        </div>
        {myModifiers.length > 0 && (
          <>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, margin: "8px 0 4px" }}>MODIFICADORES</div>
            {myModifiers.map((m, i) => (
              <CardBadge key={i} card={{ type: "modifier", value: m, label: m === "x2" ? "x2" : `+${m}` }} />
            ))}
          </>
        )}
        {hasSecondChance && (
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                background: "#1e3a5f",
                color: "#60a5fa",
                padding: "3px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700
              }}
            >
              ❤ Vida extra
            </span>
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <div style={playTabStyles.actionsGrid}>
          <button
            onClick={drawCard}
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              border: "none",
              color: "#fff",
              padding: "14px",
              borderRadius: 10,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: 1
            }}
          >
            HIT
          </button>
          <button
            onClick={stay}
            disabled={myNumbers.length === 0}
            style={{
              background: myNumbers.length === 0 ? "#1e1b4b" : "linear-gradient(135deg,#065f46,#047857)",
              border: "none",
              color: myNumbers.length === 0 ? "#334155" : "#fff",
              padding: "14px",
              borderRadius: 10,
              cursor: myNumbers.length === 0 ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: 1
            }}
          >
            STAY
          </button>
        </div>
      )}

      <div ref={logRef} style={playTabStyles.logBox}>
        {log.length === 0 ? (
          <span style={{ color: "#334155" }}>Historial...</span>
        ) : (
          [...log].reverse().map(e => (
            <div
              key={e.id}
              style={{
                color:
                  e.type === "error"
                    ? "#f87171"
                    : e.type === "success"
                      ? "#4ade80"
                      : e.type === "warn"
                        ? "#fbbf24"
                        : "#64748b",
                marginBottom: 2,
                lineHeight: 1.5
              }}
            >
              {e.msg}
            </div>
          ))
        )}
      </div>
      <div style={{ fontSize: 10, color: "#334155", marginTop: 8, textAlign: "center" }}>
        Restantes: {remaining.length} - Numeros disponibles: {remaining.filter(c => c.type === "number" && !myNumbers.includes(c.value)).length}
      </div>
    </div>
  );
}
