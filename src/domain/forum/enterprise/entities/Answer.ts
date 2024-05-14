import { BaseEntity } from "src/core/entities/BaseEntity" 
import { EntityID } from "src/core/entities/EntityID" 

export interface AnswerModel {
    id?: EntityID
    content: string
    authorId: EntityID
    questionId: EntityID
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

    private setUpdate() {
        this.properties.updatedAt = new Date()
    }

}