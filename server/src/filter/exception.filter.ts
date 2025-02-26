import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { LoggerService } from '../logger/custom.logger'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  private static handleResponse(response: Response, exception: HttpException | QueryFailedError | Error): void {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      statusCode = exception.getStatus();

      // Check if the response contains validation errors
      if (Array.isArray(exceptionResponse['message']) && exceptionResponse['message'][0]?.constraints) {
        responseBody = {
          statusCode,
          error: exceptionResponse['error'] || 'Validation Error',
          message: exceptionResponse['message'].map((error) => {
            return {
              property: error.property,
              errors: Object.values(error.constraints),
            };
          }),
        };
      } else {
        responseBody = exceptionResponse;
      }
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        message: exception.stack,
      };
    }

    response.status(statusCode).json(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    // Handling error message and logging
    this.handleMessage(exception);

    // Response to client
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception: HttpException | QueryFailedError | Error): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message);
  }
}
