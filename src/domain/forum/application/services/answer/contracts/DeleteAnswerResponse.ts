import { Either } from "src/core/utils/either"
import { NotAllowedError } from "../../../errors/NotAllowedError"
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError"

type DeleteAnswerResponse = Either<NotAllowedError | ResourceNotFoundError, {}>

export default DeleteAnswerResponse