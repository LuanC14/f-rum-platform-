import { Either } from "src/core/utils/either";
import { comment } from "src/domain/forum/repositories/interfaces/ICommentRepository";

type FetchCommentsResponse = Either<null, {comments: comment[]}>

export default FetchCommentsResponse