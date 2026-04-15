import { buildDeck } from "../data";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function calcBustProbOnNumber(remainingDeck, myNumbers) {
  const mySet = new Set(myNumbers);
  const busting = remainingDeck.filter(c => c.type === "number" && mySet.has(c.value)).length;
  return remainingDeck.length > 0 ? busting / remainingDeck.length : 0;
}

export function calcScore(numbers, modifiers) {
  const numSum = numbers.reduce((a, b) => a + b, 0);
  let score = numSum;
  const hasX2 = modifiers.includes("x2");
  if (hasX2) score = numSum * 2;
  const bonuses = modifiers.filter(m => m !== "x2").reduce((a, b) => a + (parseInt(b, 10) || 0), 0);
  score += bonuses;
  if (numbers.length >= 7) score += 15;
  return score;
}

export function getStrategyAdvice(remainingDeck, myNumbers, myModifiers) {
  const bustProb = calcBustProbOnNumber(remainingDeck, myNumbers);
  const currentScore = calcScore(myNumbers, myModifiers);
  const safeProb = 1 - bustProb;
  const mySet = new Set(myNumbers);
  const safeCards = remainingDeck.filter(c => c.type === "number" && !mySet.has(c.value));
  const avgNewNum = safeCards.length > 0 ? safeCards.reduce((s, c) => s + c.value, 0) / safeCards.length : 0;
  const expectedScoreIfHit = safeProb * (currentScore + avgNewNum);
  const shouldHit = expectedScoreIfHit > (currentScore || 1) && bustProb < 0.5;

  let reason = "";
  if (bustProb >= 0.5) reason = `Riesgo critico: ${(bustProb * 100).toFixed(0)}% bust`;
  else if (bustProb >= 0.3) reason = `Riesgo alto: ${(bustProb * 100).toFixed(0)}% bust`;
  else if (bustProb >= 0.15) reason = `Riesgo moderado: ${(bustProb * 100).toFixed(0)}% bust`;
  else reason = `Riesgo bajo: ${(bustProb * 100).toFixed(0)}% bust`;

  return { shouldHit, bustProb, expectedScoreIfHit, reason };
}

export function simulateOptimalStrategy(trials = 50000) {
  let totalScore = 0;
  let busts = 0;
  let flip7s = 0;
  const scores = new Array(200).fill(0);

  for (let t = 0; t < trials; t++) {
    const deck = shuffle(buildDeck());
    let deckIdx = 0;
    const myNumbers = [];
    const myModifiers = [];
    let hasSecondChance = false;
    let busted = false;

    while (deckIdx < deck.length && myNumbers.length < 7) {
      const remaining = deck.slice(deckIdx);
      const bustP = calcBustProbOnNumber(remaining, myNumbers);
      const cs = calcScore(myNumbers, myModifiers);
      if (bustP > 0.25 && cs >= 20) break;
      if (bustP > 0.4) break;

      const card = deck[deckIdx++];
      if (card.type === "number") {
        if (myNumbers.includes(card.value)) {
          if (hasSecondChance) {
            hasSecondChance = false;
          } else {
            busted = true;
            break;
          }
        } else {
          myNumbers.push(card.value);
        }
      } else if (card.type === "modifier") {
        myModifiers.push(card.value);
      } else if (card.value === "chance") {
        hasSecondChance = true;
      }
    }

    if (busted) {
      busts++;
    } else {
      const s = calcScore(myNumbers, myModifiers);
      totalScore += s;
      if (myNumbers.length >= 7) flip7s++;
      const bucket = Math.min(Math.floor(s / 5) * 5, 195);
      scores[bucket] = (scores[bucket] || 0) + 1;
    }
  }

  return {
    avgScore: totalScore / (trials - busts),
    bustRate: busts / trials,
    flip7Rate: flip7s / trials,
    scoreDistribution: scores
  };
}

export const bpColor = bp => (bp < 0.15 ? "#22c55e" : bp < 0.3 ? "#f59e0b" : bp < 0.5 ? "#f97316" : "#ef4444");

export const bpBg = bp => (bp < 0.15 ? "#052e16" : bp < 0.3 ? "#1c1400" : bp < 0.5 ? "#1a0e00" : "#1a0000");
