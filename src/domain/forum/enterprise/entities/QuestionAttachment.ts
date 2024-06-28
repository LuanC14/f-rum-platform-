import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity";
import { EntityID } from "src/core/entities/EntityID";

interface QuestionAttachmentModel extends EntityModel {
    questionId: EntityID
    attachmentId: EntityID
  }

export class QuestionAttachment extends BaseEntity<QuestionAttachmentModel> {
  get questionId() {
    return this.properties.questionId
  }

  get attachmentId() {
    return this.properties.attachmentId
  }
}