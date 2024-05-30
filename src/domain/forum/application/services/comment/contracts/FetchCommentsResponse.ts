import { comment } from "src/domain/forum/repositories/interfaces/ICommentRepository";

export default interface FetchCommentsResponse {
    comments: comment[]
}