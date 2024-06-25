import { BaseEntity } from "src/core/entities/BaseEntity";
import { EntityID } from "src/core/entities/EntityID";

export interface AnswerCommentModel {
    id?: EntityID
    authorId: EntityID
    answerId: EntityID
    content: string
    createdAt: Date
    updatedAt: Date
}

export class AnswerComment extends BaseEntity<AnswerCommentModel> {
    get answerId() {
        return this.properties.answerId
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