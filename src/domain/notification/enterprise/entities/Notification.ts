import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity"
import { EntityID } from "src/core/entities/EntityID"


export interface NotificationModel extends EntityModel {
  recipientId: EntityID
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends BaseEntity<NotificationModel> {
  get recipientId() {
    return this.properties.recipientId
  }

  get title() {
    return this.properties.title
  }

  get content() {
    return this.properties.content
  }

  get readAt() {
    return this.properties.readAt
  }

  get createdAt() {
    return this.properties.createdAt
  }

  read() {
    this.properties.readAt = new Date()
  }

}
