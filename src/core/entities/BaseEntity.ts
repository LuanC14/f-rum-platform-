import { EntityID } from "./EntityID"

export interface EntityModel {
    id?: EntityID
}

export class BaseEntity<ObjectModel extends EntityModel> {
    private id: EntityID
    protected properties: ObjectModel

    get Id() {
        return this.id
    }

    constructor(properties: ObjectModel) {
        this.id = properties.id ?? new EntityID()
        this.properties = properties
    }

}