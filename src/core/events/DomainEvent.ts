import { EntityID } from "../entities/EntityID"

export interface DomainEvent {
    ocurredAt: Date
    getAggregateId(): EntityID
  }