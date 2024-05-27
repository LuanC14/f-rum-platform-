import { Answer } from "../../enterprise/entities/Answer";

export interface IAnswerRepository {
    findById(answer: string): Promise<Answer | null>
    create(answer: Answer): Promise<Answer>
    save(answer: Answer): Promise<void>
    delete(answer: Answer): Promise<void>
}