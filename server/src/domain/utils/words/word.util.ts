import { words } from './set.json';

export const getRandomSetOfWords = (length = 5, userSet: string[]) => {
  const set: typeof words = [];

  while (set.length < length) {
    const word = words[Math.floor(Math.random() * words.length) % words.length];

    if (set.indexOf(word) < 0 && userSet.indexOf(word.id) < 0) {
      set.push(word);
    }
  }

  return set;
};

export const getWordById = (id: string) => {
  return words.find((word) => word.id === id);
};
