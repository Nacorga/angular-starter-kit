export enum ErrorName {
  ExpectedError = 'ExpectedError',
}

export class ExpectedError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly details?: any,
  ) {
    super(message);
    this.name = ErrorName.ExpectedError;

    Object.setPrototypeOf(this, ExpectedError.prototype);
  }
}
