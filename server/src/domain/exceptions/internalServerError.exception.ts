import { ExceptionMessages } from './../enums/exceptionMessage.enum';
import { ExceptionCodes } from './../enums/exceptionCode.enum';
import { Exception } from './exception';

export class InternalServerErrorException extends Exception {
  constructor(context: typeof Exception.prototype.context) {
    super({
      code: ExceptionCodes.serverError,
      context,
      exception: ExceptionMessages.serverError,
    });
  }
}
