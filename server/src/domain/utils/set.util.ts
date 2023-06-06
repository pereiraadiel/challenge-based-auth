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

  const matriz = [];
  let row = [];

  for (let i = 0; i < authSet.length; i++) {
    row.push(authSet[i]);

    if (row.length === itemsByGroup || i === authSet.length - 1) {
      matriz.push(row);
      row = [];
    }
  }

  return matriz.map((item) => {
    return {
      id: genRandomId(),
      item,
    };
  });
};
