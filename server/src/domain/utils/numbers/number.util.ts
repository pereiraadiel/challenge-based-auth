export const getRandomSetOfNumbers = (length = 5, userSet: string[]) => {
  const set: number[] = [];

  while (set.length < length) {
    const num = Math.floor(Math.random() * 98) + 1;

    if (set.indexOf(num) < 0 && userSet.indexOf(num.toString()) < 0) {
      set.push(num);
    }
  }

  return set;
};
