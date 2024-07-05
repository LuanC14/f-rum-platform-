import { Either } from "src/core/utils/either";
import { Question } from "src/domain/forum/enterprise/entities/Question";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";


type GetQuestionBySlugResponse = Either<ResourceNotFoundError , {question: Question}>

export default GetQuestionBySlugResponse