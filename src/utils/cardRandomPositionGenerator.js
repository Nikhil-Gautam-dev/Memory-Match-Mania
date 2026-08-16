export function randomCardPostionGenerator(N) {
  const randomPosArr = [];
  const pairNumbers = [];

  for (let i = 0; i < N - 1; i++) {
    const pairNumber = Math.floor(Math.random() * 100);
    randomPosArr.push(pairNumber);
    randomPosArr.push(pairNumber);
    pairNumbers.push(pairNumber);
  }
  for (let i = 0; i < N * N - 2 * (N - 1); i++) {
    randomPosArr.push(Math.floor(Math.random() * 100));
  }

  for (let i = randomPosArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomPosArr[i], randomPosArr[j]] = [randomPosArr[j], randomPosArr[i]];
  }

  return {
    randomPosArr: randomPosArr,
    pairNumbers: pairNumbers,
  };
}

