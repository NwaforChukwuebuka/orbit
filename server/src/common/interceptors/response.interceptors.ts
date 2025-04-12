/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { successResponse, ServiceResponse } from '../utils/resp.util';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ServiceResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ServiceResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const message =
          (data as ServiceResponse<T>)?.message || 'Operation successful';
        const responseData =
          (data as ServiceResponse<T>)?.data !== undefined
            ? (data as ServiceResponse<T>)?.data
            : data;
        const statusCode = (data as ServiceResponse<T>)?.statusCode || 200;

        return successResponse(responseData, message, statusCode);
      }),
    );
  }
}
