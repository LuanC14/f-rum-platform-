import { Answer } from "../entities/Answer"
import { AnswerRepository } from "../repositories/AnswerRepository"

interface answerQuestionRequest {
    instructorId: string
    questionId: string
    content: string
}

export class QuestionService {

    constructor(private answerRepository: AnswerRepository) { }

    public async answerQuestion({ instructorId, questionId, content }: answerQuestionRequest): Promise<Answer> {
        const answer = new Answer({ content, authorId: instructorId, questionId })

        return await this.answerRepository.create(answer);
    }
}