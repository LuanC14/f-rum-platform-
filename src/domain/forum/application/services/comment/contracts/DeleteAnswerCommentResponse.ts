import { Either } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../errors/NotAllowedError";

type DeleteAnswerCommentResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export default DeleteAnswerCommentResponse