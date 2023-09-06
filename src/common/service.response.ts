import { HttpStatus } from '@nestjs/common';

export interface IServiceResponse<T> {
  result?: T;
  status?: number | HttpStatus;
}
