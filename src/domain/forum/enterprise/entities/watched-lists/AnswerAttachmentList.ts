import { WatchedList } from "src/core/entities/WatchedList";
import { AnswerAttachment } from "../AnswerAttachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
    compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
      return a.attachmentId === b.attachmentId
    }
  }