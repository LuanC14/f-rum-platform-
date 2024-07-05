import { Either } from "src/core/utils/either";
import { AnswerComment } from "src/domain/forum/enterprise/entities/AnswerComments";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";

type CommentOnAnswerResponse = Either<ResourceNotFoundError, {answerComment: AnswerComment}>

export default CommentOnAnswerResponse