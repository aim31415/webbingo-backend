import { HttpException, HttpStatus } from '@nestjs/common';

export class WebbingoError extends HttpException {
  context: Record<string, any>;

  constructor(
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    context: Record<string, any> = {},
  ) {
    super({ message, context }, status);
    this.context = context;
  }
}

export class RuntimeError extends WebbingoError {
  constructor(message: string, context: Record<string, any> = {}) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, context);
  }
}

export class NotFoundError extends WebbingoError {
  constructor(message: string, context: Record<string, any> = {}) {
    super(message, HttpStatus.NOT_FOUND, context);
  }
}

export class ValidationError extends WebbingoError {
  constructor(message: string, context: Record<string, any> = {}) {
    super(message, HttpStatus.BAD_REQUEST, context);
  }
}

export class AccessDeniedError extends WebbingoError {
  constructor(message: string, context: Record<string, any> = {}) {
    super(message, HttpStatus.FORBIDDEN, context);
  }
}

export class DuplicateEntryError extends WebbingoError {
  constructor(message: string, context: Record<string, any> = {}) {
    super(message, HttpStatus.CONFLICT, context);
  }
}
