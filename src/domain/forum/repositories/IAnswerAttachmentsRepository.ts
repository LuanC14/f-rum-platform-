import { AnswerAttachment } from "../enterprise/entities/AnswerAttachment"

export interface IAnswerAttachmentsRepository {
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
    deleteManyByAnswerId(answerId: string): Promise<void>
  }