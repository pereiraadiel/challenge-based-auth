import { Exception } from '../exceptions/exception';
import { InternalServerErrorException } from '../exceptions/internalServerError.exception';

export abstract class Service {
  abstract SERVICE_NAME: string;

  protected catchException(
    exception: any,
    context: typeof Exception.prototype.context = null,
  ) {
    console.error(exception);
    if (exception instanceof Exception) {
      if (typeof context === 'string') {
        exception.context = {
          param: context,
          service: this.SERVICE_NAME,
        };
      }
      throw exception;
    }

    throw new InternalServerErrorException({
      service: this.SERVICE_NAME,
    });
  }
}
