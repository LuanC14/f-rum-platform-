import { UseCaseError } from "src/core/errors/UseCaseError";

export class ResourceNotFoundError extends Error implements UseCaseError {
    constructor() {
      super('Resource not found')
    }
  }