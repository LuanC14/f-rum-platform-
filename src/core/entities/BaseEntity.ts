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

    public equals(entity: BaseEntity<any>) {
        if (entity === this) {
          return true
        }
    
        if (entity.id === this.id) {
          return true
        }
    
        return false
      }

    constructor(properties: ObjectModel) {
        this.id = properties.id ?? new EntityID()
        this.properties = properties
    }

}