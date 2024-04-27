import { BaseEntity } from "../core/entities/BaseEntity"
import { EntityID } from "../core/entities/EntityID"

export interface InstructorModel {
    id?: EntityID
    name: string
}

export class Instructor extends BaseEntity<InstructorModel> {
    get name(): string {
        return this.properties.name
    }
}

