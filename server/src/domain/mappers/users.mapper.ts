import { UserEntity } from '../entities/user.entity';
import { AuthStrategies, AuthStrategy } from '../enums/authStrategy.enum';
import { getImageById } from '../utils/images/image.util';
import { getWordById } from '../utils/words/word.util';

export const userEntityToResponseUser = (user: UserEntity) => {
  const set = userSetToAuthSet(user.authSet, user.authStrategy);
  return {
    ...user,
    authSet: set,
  };
};

export const userSetToAuthSet = (
  authSet: string[],
  authStrategy: AuthStrategy,
) => {
  const sets = {
    [AuthStrategies.ImageSet]: authSet.map((item) => getImageById(item)),
    [AuthStrategies.Math]: authSet,
    [AuthStrategies.WordSet]: authSet.map((item) => getWordById(item)),
  };
  return sets[authStrategy];
};
