import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.message;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        // Handle class-validator array of messages
        if (Array.isArray(resp['message'])) {
          message = (resp['message'] as string[]).join(', ');
        } else if (typeof resp['message'] === 'string') {
          message = resp['message'];
        }
        if (typeof resp['error'] === 'string') {
          error = resp['error'];
        } else {
          error = exception.name;
        }
      }
    } else if (this.isTypeOrmConnectionError(exception)) {
      // Handle database connection errors
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Database tidak dapat diakses. Coba lagi nanti.';
      error = 'Service Unavailable';
    } else if (exception instanceof Error) {
      message = exception.message || 'Internal server error';
      error = 'Internal Server Error';
    }

    // TIDAK mengekspos stack trace ke client
    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }

  private isTypeOrmConnectionError(exception: unknown): boolean {
    if (exception instanceof Error) {
      const typeOrmErrorCodes = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT'];
      return typeOrmErrorCodes.some((code) => exception.message.includes(code));
    }
    return false;
  }
}
