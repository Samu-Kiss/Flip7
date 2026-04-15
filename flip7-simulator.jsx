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
    background: "none",
    border: "none",
    borderBottom: tab === id ? "2px solid #a78bfa" : "2px solid transparent",
    color: tab === id ? "#a78bfa" : "#475569",
    padding: "11px 13px",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    fontWeight: 600,
    whiteSpace: "nowrap"
  });

  return (
    <div style={mainStyles.page}>
      <div style={mainStyles.header}>
        <div style={mainStyles.shell}>
          <div style={mainStyles.headerTitleRow}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#a78bfa", letterSpacing: -1 }}>FLIP</span>
            <span style={{ fontSize: 40, fontWeight: 900, color: "#f9a8d4", letterSpacing: -2 }}>7</span>
            <span style={{ fontSize: 12, color: "#7c3aed", marginLeft: 4, fontWeight: 600 }}>PROBABILITY ENGINE</span>
          </div>
          <p style={{ color: "#6d28d9", fontSize: 11, margin: "2px 0 0" }}>
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
