import { DomainEvent } from "../events/DomainEvent";
import { DomainEvents } from "../events/DomainEvents ";
import { BaseEntity, EntityModel } from "./BaseEntity";

export abstract class AggregateRoot<props extends EntityModel> extends BaseEntity<props> {
    private _domainEvents: DomainEvent[] = []

    get domainEvents(): DomainEvent[] {
      return this._domainEvents
    }
  
    protected addDomainEvent(domainEvent: DomainEvent): void {
      this._domainEvents.push(domainEvent)
      DomainEvents.markAggregateForDispatch(this)
    }
  
    public clearEvents() {
      this._domainEvents = []
    }
}