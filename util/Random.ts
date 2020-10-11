export const generateRandomNumber = (min = 1, max = 100) =>
  Math.floor(Math.random() * max + min);

export const coinFlip = () => generateRandomNumber(1, 100) % 2 === 1;
