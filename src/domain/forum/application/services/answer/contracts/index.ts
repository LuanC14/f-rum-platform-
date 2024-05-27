import { Answer } from "src/domain/forum/enterprise/entities/Answer";

interface CreateAnswerRequest {
    instructorId: string
    questionId: string
    content: string
}
interface DeleteAnswerRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerResponse { }

interface EditAnswerRequest {
    authorId: string
    answerId: string
    content: string
}


interface EditAnswerResponse {
    answer: Answer
}

interface FindAnswerByIdRequest {
    answerId: string
}


interface FindAnswerByIdResponse {
    answer: Answer
}