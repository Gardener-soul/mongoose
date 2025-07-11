export class DuplicateKeyError extends Error {
    constructor(public readonly detail?: unknown) {
      super('Duplicate key error');
      this.name = 'DuplicateKeyError';
    }
  }
  
  export class ValidationFailedError extends Error {
    constructor(public readonly detail?: unknown) {
      super('Schema validation failed');
      this.name = 'ValidationFailedError';
    }
  }
  