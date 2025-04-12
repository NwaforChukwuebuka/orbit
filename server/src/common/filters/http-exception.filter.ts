// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errorResponse, ServiceResponse } from '../utils/resp.util';
import { LoggerService } from '../utils/logger.service';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService();
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as ServiceResponse<any>)?.message || 'Unexpected error';
    }
    this.logger.error(message, exception);

    const errorRes = errorResponse(message, status);
    response.status(status).json(errorRes);
  }
}
