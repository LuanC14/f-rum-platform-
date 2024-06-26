import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity" 
import { EntityID } from "src/core/entities/EntityID" 

export interface InstructorModel extends EntityModel {
    name: string
}

export class Instructor extends BaseEntity<InstructorModel> {
    get name(): string {
        return this.properties.name
    }
}

