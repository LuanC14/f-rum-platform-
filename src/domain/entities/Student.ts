import { BaseEntity } from "../core/entities/BaseEntity"
import { EntityID } from "../core/entities/EntityID"

interface StudentModel {
    id?: EntityID
    name: string
}

export class Student extends BaseEntity<StudentModel> {
    get name(): string {
        return this.properties.name
    }
}