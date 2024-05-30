import { AnswerComment } from "../../enterprise/AnswerComments";
import { QuestionComment } from "../../enterprise/QuestionComment";

type comment = QuestionComment | AnswerComment

export interface ICommentRepository {
    create(comment: comment): Promise<void>
    findById(id: string): Promise<comment>
    delete(comment: comment): Promise<void>
}