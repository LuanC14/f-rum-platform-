import { AnswerComment } from "../../enterprise/AnswerComments";
import { QuestionComment } from "../../enterprise/QuestionComment";

type createCommentRepositoryProps = QuestionComment | AnswerComment

export interface ICommentRepository {
    create(questionComment: createCommentRepositoryProps): Promise<void>
}