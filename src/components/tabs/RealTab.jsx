import React from "react";
import { bpBg, bpColor } from "../../logic";
import { CardBadge, StrategyBar, CardPicker } from "../common";
import { realTabStyles } from "./styles/realTabStyles";

export function RealTab({
  realScore,
  realBustProb,
  myRealNumbers,
  realRemainingDeck,
  realStrategy,
  realState,
  resetRound,
  fullResetReal,
  realHasChance,
  myRealModifiers,
  addToMyHand,
  registerOtherCard,
  numberCountsRemaining,
  realStay,
  seenCards,
  undoLastSeen,
  realLog,
  realLogRef
}) {
  return (
    <div>
      <div style={realTabStyles.helpBox}>
        <strong style={{ color: "#c4b5fd" }}>Como usar:</strong>{" "}
        <span style={{ color: "#cbd5e1" }}>
          Registra cada carta que sale del mazo, ya sea tuya o de otro jugador. El motor calcula probabilidades exactas
          sobre el mazo restante. Las cartas vistas no regresan hasta que hagas reset del mazo.
        </span>
      </div>

      <div style={realTabStyles.statsGrid}>
        <div style={realTabStyles.statCard}>
          <div style={{ fontSize: 9, color: "#6366f1", fontWeight: 700 }}>MI SCORE</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#a78bfa" }}>{realScore}</div>
        </div>
        <div style={{ ...realTabStyles.statCard, background: bpBg(realBustProb), border: `1px solid ${bpColor(realBustProb)}33` }}>
          <div style={{ fontSize: 9, color: bpColor(realBustProb), fontWeight: 700 }}>RIESGO BUST</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: bpColor(realBustProb) }}>{(realBustProb * 100).toFixed(1)}%</div>
        </div>
        <div style={realTabStyles.statCard}>
          <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>CARTAS</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#94a3b8" }}>{myRealNumbers.length}/7</div>
        </div>
        <div style={realTabStyles.statCard}>
          <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>MAZO REST.</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#94a3b8" }}>{realRemainingDeck.length}</div>
        </div>
      </div>

      {realStrategy && realState === "playing" && <StrategyBar {...realStrategy} />}

      {realState !== "playing" && (
        <div
          style={{
            ...realTabStyles.gameOverBox,
            background: realState === "busted" ? "#1a0000" : realState === "flip7" ? "#052e16" : "#0f172a",
            border: `1px solid ${
              realState === "busted" ? "#7f1d1d" : realState === "flip7" ? "#166534" : "#312e81"
            }`
          }}
        >
          <div style={{ fontSize: 20, marginBottom: 4 }}>
            {realState === "busted" ? "BUST" : realState === "flip7" ? "FLIP 7!" : "STAY"}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 10 }}>
            {realState === "busted" ? "0 puntos esta ronda" : `Score: ${realScore} pts`}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={resetRound}
              style={{
                background: "#4f46e5",
                border: "none",
                color: "#fff",
                padding: "7px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: 11
              }}
            >
              Nueva ronda (mismo mazo)
            </button>
            <button
              onClick={fullResetReal}
              style={{
                background: "#1e1b4b",
                border: "1px solid #312e81",
                color: "#a78bfa",
                padding: "7px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: 11
              }}
            >
              Reset mazo completo
            </button>
          </div>
        </div>
      )}

      <div style={realTabStyles.handCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "#4f46e5", fontWeight: 700 }}>TU MANO</div>
          {realHasChance && (
            <span
              style={{
                background: "#1e3a5f",
                color: "#60a5fa",
                padding: "2px 8px",
                borderRadius: 5,
                fontSize: 10,
                fontWeight: 700
              }}
            >
              ❤ Vida extra
            </span>
          )}
        </div>
        <div style={{ minHeight: 30 }}>
          {myRealNumbers.length === 0 ? (
            <span style={{ color: "#64748b", fontSize: 12 }}>Sin cartas aun...</span>
          ) : (
            myRealNumbers.map((n, i) => <CardBadge key={i} card={{ type: "number", value: n }} />)
          )}
        </div>
        {myRealModifiers.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10, color: "#065f46", fontWeight: 700, marginBottom: 4 }}>MODIFICADORES</div>
            {myRealModifiers.map((m, i) => (
              <CardBadge key={i} card={{ type: "modifier", value: m, label: m === "x2" ? "x2" : `+${m}` }} />
            ))}
          </div>
        )}
      </div>

      {realState === "playing" && (
        <CardPicker
          onPickMine={addToMyHand}
          onPickOther={registerOtherCard}
          numberCountsRemaining={numberCountsRemaining}
          myRealNumbers={myRealNumbers}
          onUndo={undoLastSeen}
          canUndo={seenCards.length > 0}
        />
      )}

      {realState === "playing" && myRealNumbers.length > 0 && (
        <button
          onClick={realStay}
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#065f46,#047857)",
            border: "none",
            color: "#fff",
            padding: "12px",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 800,
            fontSize: 14,
            marginBottom: 12,
            letterSpacing: 1
          }}
        >
          STAY - banquear {realScore} pts
        </button>
      )}

      <div style={realTabStyles.controlsRow}>
        <button
          onClick={fullResetReal}
          style={{
            width: "100%",
            background: "#1a0a0a",
            border: "1px solid #7f1d1d",
            color: "#f87171",
            padding: "8px",
            borderRadius: 8,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 700
          }}
        >
          Reset mazo completo
        </button>
      </div>

      <div ref={realLogRef} style={realTabStyles.logBox}>
        {realLog.length === 0 ? (
          <span style={{ color: "#64748b" }}>Historial de la partida...</span>
        ) : (
          [...realLog].reverse().map(e => (
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
                          : "#94a3b8",
                marginBottom: 2,
                lineHeight: 1.5
              }}
            >
              {e.msg}
            </div>
          ))
        )}
      </div>
      <div style={{ fontSize: 9, color: "#64748b", marginTop: 5, textAlign: "center" }}>
        Cartas vistas: {seenCards.length} - Restantes en mazo: {realRemainingDeck.length}
      </div>
    </div>
  );
}
