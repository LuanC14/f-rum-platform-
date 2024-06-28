import { BaseEntity, EntityModel } from "./BaseEntity";

export abstract class AggregateRoot<props extends EntityModel> extends BaseEntity<props> {
}