import { AuthStrategies, AuthStrategy } from './../enums/authStrategy.enum';
import { genRandomId } from './id.util';
import { getRandomSetOfImages } from './images/image.util';
import { getRandomSetOfNumbers } from './numbers/number.util';
import { getRandomSetOfWords } from './words/word.util';

const strategies = {
  [AuthStrategies.ImageSet]: getRandomSetOfImages,
  [AuthStrategies.Math]: getRandomSetOfNumbers,
  [AuthStrategies.WordSet]: getRandomSetOfWords,
};

export const getRandomSet = (
  length = 5,
  authStrategy: AuthStrategy,
  userSet: string[],
) => {
  const strategy = strategies[authStrategy];

  return strategy(length, userSet);
};

export const groupAuthSet = (
  authSet: ReturnType<typeof getRandomSet>,
  itemsByGroup = 2,
) => {
  itemsByGroup = itemsByGroup < 1 ? 2 : itemsByGroup;

  const groupSet: (typeof authSet)[] = [];

  for (let i = 0, k = -1; i < authSet.length; i++) {
    if (i % itemsByGroup === 0) {
      k++;
      groupSet[k] = [];
    }

    groupSet[k].push(authSet[i] as any);
  }

  return groupSet.map((item) => {
    return {
      id: genRandomId(),
      item,
    };
  });
};
