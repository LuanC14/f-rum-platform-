import { Either } from "src/core/utils/either";
import { Question } from "src/domain/forum/enterprise/entities/Question";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";


type GetQuestionBySlugResponse = Either<ResourceNotFoundError , {question: Question}>

export default GetQuestionBySlugResponse