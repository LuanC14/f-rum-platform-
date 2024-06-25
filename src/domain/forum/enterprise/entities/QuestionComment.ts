import { BaseEntity } from "src/core/entities/BaseEntity";
import { EntityID } from "src/core/entities/EntityID";

interface QuestionCommentModel {
  id?: EntityID
  authorId: EntityID
  questionId: EntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends BaseEntity<QuestionCommentModel> {
  get questionId() {
    return this.properties.questionId
  }

  get authorId() {
    return this.properties.authorId
  }

  get content() {
    return this.properties.content
  }

  get createdAt() {
    return this.properties.createdAt
  }

  get updatedAt() {
    return this.properties.updatedAt
  }

  private setUpdate() {
    this.properties.updatedAt = new Date()
  }

  set content(content: string) {
    this.properties.content = content
    this.setUpdate()
  }
}