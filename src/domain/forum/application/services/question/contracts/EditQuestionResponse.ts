import { Either } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../../../core/errors/NotAllowedError";
import { Question } from "src/domain/forum/enterprise/entities/Question";

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {question : Question}>

export default EditQuestionUseCaseResponse
