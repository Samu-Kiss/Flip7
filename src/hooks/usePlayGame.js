import { useState, useCallback, useEffect, useRef } from "react";
import { buildDeck } from "../data";
import { shuffle, calcBustProbOnNumber, calcScore, getStrategyAdvice } from "../logic";

export function usePlayGame() {
  const [deck, setDeck] = useState(() => shuffle(buildDeck()));
  const [deckIdx, setDeckIdx] = useState(0);
  const [myNumbers, setMyNumbers] = useState([]);
  const [myModifiers, setMyModifiers] = useState([]);
  const [hasSecondChance, setHasSecondChance] = useState(false);
  const [gameState, setGameState] = useState("playing");
  const [log, setLog] = useState([]);
  const logRef = useRef(null);

  const remaining = deck.slice(deckIdx);
  const bustProb = calcBustProbOnNumber(remaining, myNumbers);
  const currentScore = calcScore(myNumbers, myModifiers);
  const strategy = gameState === "playing" ? getStrategyAdvice(remaining, myNumbers, myModifiers) : null;

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const addLog = (msg, type = "info") => {
    setLog(l => [...l, { msg, type, id: Date.now() + Math.random() }]);
  };

  const resetGame = () => {
    setDeck(shuffle(buildDeck()));
    setDeckIdx(0);
    setMyNumbers([]);
    setMyModifiers([]);
    setHasSecondChance(false);
    setGameState("playing");
    setLog([]);
  };

  const drawCard = useCallback(() => {
    if (gameState !== "playing" || deckIdx >= deck.length) return;

    const card = deck[deckIdx];
    const newIdx = deckIdx + 1;
    setDeckIdx(newIdx);

    if (card.type === "number") {
      if (myNumbers.includes(card.value)) {
        if (hasSecondChance) {
          setHasSecondChance(false);
          addLog(`❤ Vida extra usada! Descartado: ${card.value}`, "warn");
        } else {
          setGameState("busted");
          addLog(`BUST! Sacaste ${card.value} — ya lo tenias. Score: 0`, "error");
        }
      } else {
        const n2 = [...myNumbers, card.value];
        setMyNumbers(n2);
        addLog(`Numero ${card.value} — Score: ${calcScore(n2, myModifiers)}`, "success");
        if (n2.length >= 7) {
          setGameState("flip7");
          addLog(`FLIP 7! Score final: ${calcScore(n2, myModifiers)}`, "success");
        }
      }
    } else if (card.type === "modifier") {
      const m2 = [...myModifiers, card.value];
      setMyModifiers(m2);
      addLog(`Modificador: ${card.label} — Score: ${calcScore(myNumbers, m2)}`, "info");
    } else if (card.value === "freeze") {
      setGameState("stayed");
      addLog(`Freeze! Banqueaste con ${currentScore} pts`, "warn");
    } else if (card.value === "flip3") {
      addLog("Flip 3!", "warn");
      let idx = newIdx;
      let nums = [...myNumbers];
      let mods = [...myModifiers];
      let sc = hasSecondChance;
      let bustedInFlip = false;

      for (let i = 0; i < 3 && idx < deck.length; i++) {
        const c = deck[idx++];
        if (c.type === "number") {
          if (nums.includes(c.value)) {
            if (sc) {
              sc = false;
              addLog(`❤ Vida extra en Flip3: ${c.value}`, "warn");
            } else {
              bustedInFlip = true;
              addLog(`BUST en Flip3: ${c.value}`, "error");
              break;
            }
          } else {
            nums = [...nums, c.value];
            addLog(`  ${i + 1}/3: ${c.value}`, "info");
          }
        } else if (c.type === "modifier") {
          mods = [...mods, c.value];
          addLog(`  ${i + 1}/3: ${c.label}`, "info");
        } else if (c.value === "chance") {
          sc = true;
          addLog(`  ${i + 1}/3: ❤ Vida extra!`, "info");
        }

        if (nums.length >= 7) {
          setGameState("flip7");
          addLog("FLIP 7 en Flip3!", "success");
          break;
        }
      }

      setDeckIdx(idx);
      setMyNumbers(nums);
      setMyModifiers(mods);
      setHasSecondChance(sc);
      if (bustedInFlip) setGameState("busted");
    } else if (card.value === "chance") {
      if (hasSecondChance) addLog("Ya tienes ❤ Vida extra. Descartada.", "warn");
      else {
        setHasSecondChance(true);
        addLog("❤ Vida extra guardada", "success");
      }
    }
  }, [gameState, deckIdx, deck, myNumbers, myModifiers, hasSecondChance, currentScore]);

  const stay = () => {
    if (gameState !== "playing") return;
    setGameState("stayed");
    addLog(`STAY — ${currentScore} pts`, "success");
  };

  return {
    myNumbers,
    myModifiers,
    hasSecondChance,
    gameState,
    log,
    logRef,
    remaining,
    bustProb,
    currentScore,
    strategy,
    resetGame,
    drawCard,
    stay
  };
}
