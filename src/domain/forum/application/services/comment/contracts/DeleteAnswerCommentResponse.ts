import { Either } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../../../core/errors/NotAllowedError";

type DeleteAnswerCommentResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export default DeleteAnswerCommentResponse