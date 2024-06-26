import { Either } from "src/core/utils/either";
import { Question } from "src/domain/forum/enterprise/entities/Question";

type CreateQuestionResponse = Either<null , { question: Question }>

export default CreateQuestionResponse