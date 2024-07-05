import { AnswerComment } from "../../enterprise/entities/AnswerComments";
import { QuestionComment } from "../../enterprise/entities/QuestionComment";

export type comment = QuestionComment | AnswerComment

export interface ICommentRepository {
    create(comment: comment): Promise<void>
    findById(id: string): Promise<comment>
    delete(comment: comment): Promise<void>
    findManyByFatherCommentId(fatherId: string, params: PaginationParams): Promise<comment[]>
}