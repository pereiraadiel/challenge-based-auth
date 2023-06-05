import { ExceptionCode } from '../enums/exceptionCode.enum';
import { ExceptionMessage } from '../enums/exceptionMessage.enum';

type ExceptionContext = {
  [key: string]: string | number | boolean;
  service: string;
};

export class Exception {
  code: ExceptionCode;
  context: string | ExceptionContext;
  exception: ExceptionMessage;

  constructor(exception: Exception) {
    Object.assign(this, exception);
  }
}
