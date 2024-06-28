import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity";
import { EntityID } from "src/core/entities/EntityID";

interface AnswerAttachmentModel extends EntityModel {
    answerId: EntityID
    attachmentId: EntityID
  }

export class AnswerAttachment extends BaseEntity<AnswerAttachmentModel> {
  get answerId() {
    return this.properties.answerId
  }

  get attachmentId() {
    return this.properties.attachmentId
  }
}