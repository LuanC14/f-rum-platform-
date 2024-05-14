import { Answer } from "../../enterprise/entities/Answer";

export interface IAnswerRepository {
    create(answer: Answer): Promise<void> 
}