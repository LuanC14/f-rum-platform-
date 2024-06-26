import { Either } from "src/core/utils/either";
import { Answer } from "src/domain/forum/enterprise/entities/Answer";

type FetchQuestionAnswersResponse = Either<null ,{ answers: Answer[]}>


export default FetchQuestionAnswersResponse