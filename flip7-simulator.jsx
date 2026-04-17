import React, { useState } from "react";
import { usePlayGame, useRealGame, useSimEngine } from "./src/hooks";
import { RealTab, PlayTab, StatsTab, SimTab, GuideTab } from "./src/components/tabs";
import { mainStyles } from "./src/components/tabs/styles/mainStyles";

export default function Flip7Simulator() {
  const [tab, setTab] = useState("real");

  const play = usePlayGame();
  const real = useRealGame();
  const sim = useSimEngine();

  const tabStyle = id => ({
    background: tab === id ? "linear-gradient(180deg,#1e1b4b,#111827)" : "#111827",
    border: tab === id ? "1px solid #6366f1" : "1px solid #475569",
    borderBottom: tab === id ? "2px solid #a78bfa" : "2px solid #64748b",
    color: tab === id ? "#ddd6fe" : "#94a3b8",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "inherit",
    fontWeight: 700,
    whiteSpace: "nowrap",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 6,
    marginRight: 6,
    boxShadow: tab === id ? "0 4px 14px rgba(99,102,241,0.2)" : "none",
    transition: "all 160ms ease"
  });

  return (
    <div style={mainStyles.page}>
      <div style={mainStyles.header}>
        <div style={mainStyles.shell}>
          <div style={mainStyles.headerTitleRow}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#a78bfa", letterSpacing: -1 }}>FLIP</span>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#f9a8d4", letterSpacing: -2 }}>7</span>
            <span style={{ fontSize: 14, color: "#c4b5fd", marginLeft: 4, fontWeight: 700 }}>PROBABILITY ENGINE</span>
          </div>
          <p style={{ color: "#a78bfa", fontSize: 13, margin: "4px 0 0" }}>
            Estrategia optima por EV - Monte Carlo - 95 cartas
          </p>
        </div>
      </div>

      <div style={mainStyles.tabsOuter}>
        <div style={mainStyles.tabsInner}>
          <button style={tabStyle("real")} onClick={() => setTab("real")}>Partida Real</button>
          <button style={tabStyle("play")} onClick={() => setTab("play")}>Simulador</button>
          <button style={tabStyle("guide")} onClick={() => setTab("guide")}>Como jugar</button>
          <button style={tabStyle("stats")} onClick={() => setTab("stats")}>Probabilidades</button>
          <button style={tabStyle("sim")} onClick={() => setTab("sim")}>Monte Carlo</button>
        </div>
      </div>

      <div style={mainStyles.content}>
        {tab === "real" && <RealTab {...real} />}
        {tab === "play" && <PlayTab {...play} />}
        {tab === "guide" && <GuideTab />}
        {tab === "stats" && <StatsTab />}
        {tab === "sim" && <SimTab {...sim} />}
      </div>
    </div>
  );
}
