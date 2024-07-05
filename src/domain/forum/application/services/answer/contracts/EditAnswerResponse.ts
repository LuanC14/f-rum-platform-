import { Either } from "src/core/utils/either";
import { Answer } from "src/domain/forum/enterprise/entities/Answer";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../../../core/errors/NotAllowedError";

type EditAnswerResponse = Either<ResourceNotFoundError | NotAllowedError, {answer: Answer}>

export default EditAnswerResponse