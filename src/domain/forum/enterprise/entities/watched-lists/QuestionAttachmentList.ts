import { WatchedList } from "src/core/entities/WatchedList";
import { QuestionAttachment } from "../QuestionAttachment";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
    compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
        return a.attachmentId === b.attachmentId
    }
}