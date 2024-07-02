import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity"
import { EntityID } from "src/core/entities/EntityID"
import { AnswerAttachmentList } from "./watched-lists/AnswerAttachmentList"

export interface AnswerModel extends EntityModel {
    content: string
    authorId: EntityID
    questionId: EntityID
    attachments: AnswerAttachmentList
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends BaseEntity<AnswerModel> {
    get content(): string {
        return this.properties.content
    }
    get authorId(): EntityID {
        return this.properties.authorId
    }
    get questionId(): EntityID {
        return this.properties.questionId
    }

    get createdAt(): Date {
        return this.properties.createdAt
    }

    get updatedAt(): Date | undefined {
        return this.properties.updatedAt
    }

    get AnswerAttachmentList() {
        return this.properties.attachments ?? new AnswerAttachmentList()
    }

    get resume() {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    set content(content: string) {
        this.properties.content = content
        this.setUpdate()
    }

    set attachments(attachments: AnswerAttachmentList) {
        this.properties.attachments = attachments
        this.setUpdate()
    }

    private setUpdate() {
        this.properties.updatedAt = new Date()
    }

}