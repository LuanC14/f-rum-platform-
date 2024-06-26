import { Either } from "src/core/utils/either"
import { Answer } from "src/domain/forum/enterprise/entities/Answer"

type CreateAnswerOnQuestionResponse = Either<null,{ answer: Answer }
>

export default CreateAnswerOnQuestionResponse