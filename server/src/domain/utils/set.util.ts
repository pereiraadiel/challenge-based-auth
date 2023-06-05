import { AuthStrategies, AuthStrategy } from './../enums/authStrategy.enum';
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
