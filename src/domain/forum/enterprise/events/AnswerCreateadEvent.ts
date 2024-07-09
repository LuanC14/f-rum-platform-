import { DomainEvent } from "src/core/events/DomainEvent"
import { Answer } from "../entities/Answer"
import { EntityID } from "src/core/entities/EntityID"

export class AnswerCreatedEvent implements DomainEvent {
    public ocurredAt: Date
    public answer: Answer
  
    constructor(answer: Answer) {
      this.answer = answer
      this.ocurredAt = new Date()
    }
  
    getAggregateId(): EntityID {
      return this.answer.Id
    }
  }