import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity" 

interface StudentModel extends EntityModel {
    name: string
}

export class Student extends BaseEntity<StudentModel> {
    get name(): string {
        return this.properties.name
    }
}