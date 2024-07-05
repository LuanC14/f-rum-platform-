import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment"

export interface IQuestionAttachmentsRepository {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
    deleteManyByQuestionId(questionId: string): Promise<void>
  }