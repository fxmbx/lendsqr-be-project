import { ILogger } from '@modules/logger/logger.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

interface IError {
  message: string;
  code?: any;
  statusCode?: number;
}
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const req = ctx.getRequest();
    const error: IError = this.getGenericError(exception);

    const code = error.statusCode ?? this.getStatusCode(exception);

    this.logMessage(req, error, code, exception);

    response.status(code).json({
      statusCode: code,
      message: code === 500 ? 'Something went wrong' : error.message,
      code: error.code,
      error: true,
    });
  }

  private getGenericError(exception: any): IError {
    return exception instanceof HttpException
      ? (exception.getResponse() as IError)
      : this.getDbError(exception);
  }

  private getStatusCode(exception: any): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : this.getDbError(exception).code;
  }

  private getDbError(err: any): IError {
    switch (err?.errno) {
      case 1062:
        return {
          message: 'Duplicate entry. This record already exists.',
          code: err.errno,
          statusCode: 409,
        };
      default:
        return {
          message: err.message,
          code: 1003,
          statusCode: 500,
        };
    }
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ): void {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code ? message.code : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code ? message.code : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
