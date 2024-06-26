import dayjs from "dayjs"
import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity"
import { EntityID } from "src/core/entities/EntityID"
import { Slug } from "./value-objects/Slug"

export interface QuestionModel extends EntityModel {
    title: string
    slug: Slug
    content: string
    authorId: EntityID
    bestAnswerID?: EntityID
    createdAt: Date
    updatedAt?: Date
}

export class Question extends BaseEntity<QuestionModel> {
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

    private setUpdate() {
        this.properties.updatedAt = new Date()
    }
}
