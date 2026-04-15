// Deck/data constants for Flip 7
export function buildDeck() {
  const deck = [];
  deck.push({ type: "number", value: 0 });
  for (let n = 1; n <= 12; n++) {
    for (let i = 0; i < n; i++) deck.push({ type: "number", value: n });
  }

  [2, 4, 6, 8, 8, 10].forEach(v => deck.push({ type: "modifier", value: v, label: `+${v}` }));
  deck.push({ type: "modifier", value: "x2", label: "x2" });

  for (let i = 0; i < 3; i++) deck.push({ type: "action", value: "freeze", label: "Freeze" });
  for (let i = 0; i < 3; i++) deck.push({ type: "action", value: "flip3", label: "Flip 3" });
  for (let i = 0; i < 3; i++) deck.push({ type: "action", value: "chance", label: "❤ Vida extra" });

  return deck;
}

export const cardColors = {
  0: "#64748b",
  1: "#6366f1",
  2: "#8b5cf6",
  3: "#a855f7",
  4: "#ec4899",
  5: "#ef4444",
  6: "#f97316",
  7: "#f59e0b",
  8: "#eab308",
  9: "#84cc16",
  10: "#22c55e",
  11: "#14b8a6",
  12: "#06b6d4"
};

export function buildNumberCounts() {
  const counts = { 0: 1 };
  for (let n = 1; n <= 12; n++) counts[n] = n;
  return counts;
}
