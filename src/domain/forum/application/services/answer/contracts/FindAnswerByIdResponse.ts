import { Either } from "src/core/utils/either";
import { Answer } from "src/domain/forum/enterprise/entities/Answer";

type FindAnswerByIdResponse = Either<null, { answer: Answer | null }>

export default FindAnswerByIdResponse