/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export const successResponse = (
  data: any,
  message = 'Request successful',
  statusCode = 200,
): ServiceResponse<any> => ({
  success: true,
  message,
  data,
  statusCode,
});

export const errorResponse = (
  message = 'Request failed',
  statusCode = 400,
): ServiceResponse<any> => ({
  success: false,
  message,
  data: null,
  statusCode,
});
