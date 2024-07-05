import { Either } from "src/core/utils/either";
import { Question } from "src/domain/forum/enterprise/entities/Question";
import { ResourceNotFoundError } from "../../../../../../core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../../../core/errors/NotAllowedError";

type MarkBestAnswerResponse = Either<
ResourceNotFoundError | NotAllowedError,
{
  question: Question
}
>
export default MarkBestAnswerResponse