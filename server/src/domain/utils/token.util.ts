import { TokenRepositoryContract } from '../contracts/repositories/tokenRepository.contract';
import { UserEntity } from '../entities/user.entity';
import { NotFoundException } from '../exceptions/notFound.exception';
import { base64decode, base64encode, genRandomId } from './id.util';

export const genToken = (user: UserEntity) => {
  return base64encode(user.username.concat('|').concat(genRandomId(12)));
};

export const validateToken = async (
  token: string,
  tokenRepository: TokenRepositoryContract,
) => {
  try {
    const storedToken = await tokenRepository.get(token);
    if (!storedToken) throw new NotFoundException(token);

    const [username, sessionId] = base64decode(token).split('|');

    return {
      username,
      sessionId,
    };
  } catch (error) {
    throw new NotFoundException(token);
  }
};
