import { DomainEvents } from "src/core/events/DomainEvents "
import { EventHandler } from "src/core/events/EventHandler"
import { AnswerCreatedEvent } from "src/domain/forum/enterprise/events/AnswerCreateadEvent"

export class OnAnswerCreated implements EventHandler {
    constructor() {
      this.setupSubscriptions()
    }
  
    setupSubscriptions(): void {
      DomainEvents.register(
        this.sendNewAnswerNotification.bind(this),
        AnswerCreatedEvent.name,
      )
    }
  
    private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
      console.log(answer)
    }
  }