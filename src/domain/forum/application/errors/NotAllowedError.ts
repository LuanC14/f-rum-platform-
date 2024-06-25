import { UseCaseError } from "src/core/errors/UseCaseError";

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
      super('Not allowed')
    }
  }