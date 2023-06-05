import { ExceptionMessages } from './../enums/exceptionMessage.enum';
import { ExceptionCodes } from './../enums/exceptionCode.enum';
import { Exception } from './exception';

export class UnprocessableEntityException extends Exception {
  constructor(context: typeof Exception.prototype.context) {
    super({
      code: ExceptionCodes.unprocessableEntity,
      context,
      exception: ExceptionMessages.unprocessableEntity,
    });
  }
}
