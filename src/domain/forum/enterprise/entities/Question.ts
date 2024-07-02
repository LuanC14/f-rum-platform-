import dayjs from "dayjs"
import { EntityModel } from "src/core/entities/BaseEntity"
import { EntityID } from "src/core/entities/EntityID"
import { Slug } from "./value-objects/Slug"
import { AggregateRoot } from "src/core/entities/AggregateRoot"
import { QuestionAttachmentList } from "./watched-lists/QuestionAttachmentList"

export interface QuestionModel extends EntityModel {
    title: string
    slug: Slug
    content: string
    authorId: EntityID
    bestAnswerID?: EntityID
    attachments?: QuestionAttachmentList
    createdAt: Date
    updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionModel> {
    get title(): string {
        return this.properties.title
    }
    get slug(): Slug {
        return this.properties.slug
    }
    get content(): string {
        return this.properties.content
    }
    get authorId(): EntityID {
        return this.properties.authorId
    }

    get bestAnswerID() {
        return this.properties.bestAnswerID ?? null
    }

    get attachments() {
        return this.properties.attachments ?? new QuestionAttachmentList()
    }

    get createdAt() {
        return this.properties.createdAt
    }

    get updatedAt() {
        return this.properties.updatedAt
    }

    get resume() {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    // Retorna se foi criado rencetemente ou nao
    get isNew(): boolean {
        return dayjs().diff(this.properties.createdAt, 'days') <= 3
    }


    set title(title: string) {
        this.properties.title = title
        this.properties.slug = Slug.createFromText(title)
        this.setUpdate()
    }

    set content(content: string) {
        this.properties.content = content
        this.setUpdate()
    }

    set bestAnswerId(bestAnswerId: EntityID) {
        this.properties.bestAnswerID = bestAnswerId
        this.setUpdate()
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.properties.attachments = attachments
        this.setUpdate()
    }

    private setUpdate() {
        this.properties.updatedAt = new Date()
    }
}