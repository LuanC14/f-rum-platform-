import { Answer } from "../../enterprise/entities/Answer";

export interface IAnswerRepository {
    findById(answer: string): Promise<Answer | null>
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>
    create(answer: Answer): Promise<Answer>
    save(answer: Answer): Promise<void>
    delete(answer: Answer): Promise<void>
}