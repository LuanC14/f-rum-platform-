import { BaseEntity, EntityModel } from "src/core/entities/BaseEntity";

interface AttachmentModel extends EntityModel {
    title: string
    link: string
}

export class Attachment extends BaseEntity<AttachmentModel> {

    get title() {
        return this.properties.title
    }

    get link() {
        return this.properties.link
    }
}