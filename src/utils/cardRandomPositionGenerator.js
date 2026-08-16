const CARD_AVATARS = [
  "🚀", "👾", "💎", "⚡", "🍕", "🎨", "🏆", "🦄", 
  "🌟", "🔥", "🔮", "🎯", "🎮", "🛸", "👑", "🎲",
  "🧩", "🪐", "💣", "⚡", "🌈", "👻", "🌶️", "🎸"
];

export function getCardAvatar(number) {
  if (number === -1) return "⭐"; // Wildcard Star Tile
  if (typeof number !== "number") return "❓";
  const index = Math.abs(number) % CARD_AVATARS.length;
  return CARD_AVATARS[index];
}

export function randomCardPostionGenerator(N) {
  const randomPosArr = [];
  const pairNumbers = [];

  const totalCards = N * N;
  const numPairs = Math.floor(totalCards / 2);

  // Generate distinct pair numbers
  const usedNumbers = new Set();
  while (pairNumbers.length < numPairs) {
    const num = Math.floor(Math.random() * 90) + 1;
    if (!usedNumbers.has(num)) {
      usedNumbers.add(num);
      pairNumbers.push(num);
      randomPosArr.push(num);
      randomPosArr.push(num);
    }
  }

  // If odd number of cards (e.g., 3x3 = 9 cards), add 1 Wildcard tile (-1)
  if (totalCards % 2 !== 0) {
    randomPosArr.push(-1);
  }

  // Shuffle using Fisher-Yates algorithm
  for (let i = randomPosArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomPosArr[i], randomPosArr[j]] = [randomPosArr[j], randomPosArr[i]];
  }

  return {
    randomPosArr: randomPosArr,
    pairNumbers: pairNumbers,
  };
}



