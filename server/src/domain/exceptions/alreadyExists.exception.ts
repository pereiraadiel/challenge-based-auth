import { ExceptionMessages } from './../enums/exceptionMessage.enum';
import { ExceptionCodes } from './../enums/exceptionCode.enum';
import { Exception } from './exception';

export class AlreadyExistsException extends Exception {
  constructor(context: typeof Exception.prototype.context) {
    super({
      code: ExceptionCodes.alreadyExists,
      context,
      exception: ExceptionMessages.alreadyExists,
    });
  }
}
