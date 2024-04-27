import { EntityID } from "./EntityID"

interface BaseModel {
    id?: EntityID
}

export class BaseEntity<ObjectModel extends BaseModel> {
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