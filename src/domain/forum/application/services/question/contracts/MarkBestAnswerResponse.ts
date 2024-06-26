import { Either } from "src/core/utils/either";
import { Question } from "src/domain/forum/enterprise/entities/Question";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../errors/NotAllowedError";

type MarkBestAnswerResponse = Either<
ResourceNotFoundError | NotAllowedError,
{
  question: Question
}
>
export default MarkBestAnswerResponse