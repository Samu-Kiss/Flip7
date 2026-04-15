import { useState, useEffect, useRef } from "react";
import { buildDeck, buildNumberCounts } from "../data";
import { calcBustProbOnNumber, calcScore, getStrategyAdvice } from "../logic";

export function useRealGame() {
  const [seenCards, setSeenCards] = useState([]);
  const [myRealNumbers, setMyRealNumbers] = useState([]);
  const [myRealModifiers, setMyRealModifiers] = useState([]);
  const [realHasChance, setRealHasChance] = useState(false);
  const [realState, setRealState] = useState("playing");
  const [realLog, setRealLog] = useState([]);
  const realLogRef = useRef(null);

  const realRemainingDeck = (() => {
    const pool = [...buildDeck()];
    seenCards.forEach(sc => {
      const idx = pool.findIndex(c => c.type === sc.type && String(c.value) === String(sc.value));
      if (idx !== -1) pool.splice(idx, 1);
    });
    return pool;
  })();

  const numberCountsRemaining = (() => {
    const counts = buildNumberCounts();
    seenCards.forEach(sc => {
      if (sc.type === "number") counts[sc.value] = Math.max(0, (counts[sc.value] || 0) - 1);
    });
    return counts;
  })();

  const realBustProb = calcBustProbOnNumber(realRemainingDeck, myRealNumbers);
  const realScore = calcScore(myRealNumbers, myRealModifiers);
  const realStrategy =
    realState === "playing" ? getStrategyAdvice(realRemainingDeck, myRealNumbers, myRealModifiers) : null;

  useEffect(() => {
    if (realLogRef.current) realLogRef.current.scrollTop = realLogRef.current.scrollHeight;
  }, [realLog]);

  const addRealLog = (msg, type = "info") => {
    setRealLog(l => [...l, { msg, type, id: Date.now() + Math.random() }]);
  };

  const registerSeen = card => setSeenCards(s => [...s, card]);

  const undoLastSeen = () => {
    if (seenCards.length === 0) return;
    const last = seenCards[seenCards.length - 1];
    setSeenCards(s => s.slice(0, -1));
    if (last.type === "number" && myRealNumbers[myRealNumbers.length - 1] === last.value) {
      setMyRealNumbers(n => n.slice(0, -1));
    }
    addRealLog(`Deshecho: ${last.type === "number" ? last.value : last.label}`, "warn");
  };

  const addToMyHand = card => {
    if (realState !== "playing") return;
    registerSeen(card);

    if (card.type === "number") {
      if (myRealNumbers.includes(card.value)) {
        if (realHasChance) {
          setRealHasChance(false);
          addRealLog(`❤ Vida extra usada! Descartado: ${card.value}`, "warn");
        } else {
          setRealState("busted");
          addRealLog(`BUST! Numero ${card.value} repetido. Score: 0`, "error");
        }
      } else {
        const n2 = [...myRealNumbers, card.value];
        setMyRealNumbers(n2);
        addRealLog(`Mi carta: ${card.value} — Score: ${calcScore(n2, myRealModifiers)}`, "success");
        if (n2.length >= 7) {
          setRealState("flip7");
          addRealLog(`FLIP 7! Score: ${calcScore(n2, myRealModifiers)}`, "success");
        }
      }
    } else if (card.type === "modifier") {
      const m2 = [...myRealModifiers, card.value];
      setMyRealModifiers(m2);
      addRealLog(`Modificador propio: ${card.label} — Score: ${calcScore(myRealNumbers, m2)}`, "info");
    } else if (card.value === "freeze") {
      setRealState("stayed");
      addRealLog(`Freeze! Score final: ${realScore}`, "warn");
    } else if (card.value === "chance") {
      if (realHasChance) addRealLog("Ya tienes ❤ Vida extra.", "warn");
      else {
        setRealHasChance(true);
        addRealLog("❤ Vida extra guardada", "success");
      }
    } else if (card.value === "flip3") {
      addRealLog("Flip 3 — registra las 3 cartas que salieron", "warn");
    }
  };

  const registerOtherCard = card => {
    registerSeen(card);
    addRealLog(`Vista: ${card.type === "number" ? card.value : card.label || card.value} (otro jugador)`, "info");
  };

  const realStay = () => {
    setRealState("stayed");
    addRealLog(`STAY — ${realScore} pts`, "success");
  };

  const resetRound = () => {
    setMyRealNumbers([]);
    setMyRealModifiers([]);
    setRealHasChance(false);
    setRealState("playing");
    setRealLog([]);
  };

  const fullResetReal = () => {
    setSeenCards([]);
    setMyRealNumbers([]);
    setMyRealModifiers([]);
    setRealHasChance(false);
    setRealState("playing");
    setRealLog([]);
  };

  return {
    seenCards,
    myRealNumbers,
    myRealModifiers,
    realHasChance,
    realState,
    realLog,
    realLogRef,
    realRemainingDeck,
    numberCountsRemaining,
    realBustProb,
    realScore,
    realStrategy,
    undoLastSeen,
    addToMyHand,
    registerOtherCard,
    realStay,
    resetRound,
    fullResetReal
  };
}
