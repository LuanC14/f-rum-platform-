import { Either } from "src/core/utils/either";
import { QuestionComment } from "src/domain/forum/enterprise/entities/QuestionComment";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";

type CommentOnQuestionResponse = Either<ResourceNotFoundError, {questionComment: QuestionComment}>

export default CommentOnQuestionResponse