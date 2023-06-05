import { ExceptionMessages } from './../enums/exceptionMessage.enum';
import { ExceptionCodes } from './../enums/exceptionCode.enum';
import { Exception } from './exception';

export class UnauthorizedException extends Exception {
  constructor(context: typeof Exception.prototype.context) {
    super({
      code: ExceptionCodes.unauthorized,
      context,
      exception: ExceptionMessages.unauthorized,
    });
  }
}
