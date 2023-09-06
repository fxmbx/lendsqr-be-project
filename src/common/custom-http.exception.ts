import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message?: string, statusCode?: number, code?: number) {
    super(
      {
        message: message ?? 'badRequest',
        code: code ?? 1013,
        statusCode: statusCode ?? HttpStatus.BAD_REQUEST,
        error: true,
      },
      statusCode ?? HttpStatus.BAD_REQUEST,
    );
  }
}
