import { Either } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../errors/NotAllowedError";

type DeleteQuestionCommentResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export default DeleteQuestionCommentResponse
