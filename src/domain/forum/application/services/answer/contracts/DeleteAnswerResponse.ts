import { Either } from "src/core/utils/either"
import { NotAllowedError } from "../../../../../../core/errors/NotAllowedError"
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError"

type DeleteAnswerResponse = Either<NotAllowedError | ResourceNotFoundError, {}>

export default DeleteAnswerResponse