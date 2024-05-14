import { EntityID } from "src/core/entities/EntityID"
import { Question } from "../../enterprise/entities/Question"
import { Slug } from "../../enterprise/entities/value-objects/Slug"
import { title } from "process"
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionRepository"

interface createQuestionRequest {
    authorId: string
    title: string
    content: string
}

export class QuestionService {

    constructor(private repository : IQuestionsRepository) { }

    public async createQuestion(req: createQuestionRequest) {
        const question = new Question({
            authorId: new EntityID(req.authorId),
            title: req.title,
            content: req.content,
            slug: Slug.createFromText(title),
            createdAt: new Date()
        })

        this.repository.create(question)
    }

    // public async answerQuestion({ instructorId, questionId, content }: answerQuestionRequest): Promise<Answer> {
    //     const answer = new Answer({ content, authorId: instructorId, questionId })

    //     return await this.answerRepository.create(answer);
    // }
}