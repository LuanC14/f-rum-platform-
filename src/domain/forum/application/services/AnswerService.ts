import { EntityID } from "src/core/entities/EntityID"
import { Answer } from "../../enterprise/entities/Answer"
import { IAnswerRepository } from "../../repositories/interfaces/IAnswerRepository"

interface createAnswerUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}


interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

interface EditAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface EditAnswerUseCaseResponse {
    answer: Answer
}

interface findAnswerByIdRequest {
    answerId: string
}

interface findAnswerByIdResponse {
    answer: Answer
}

interface DeleteAnswerUseCaseResponse { }

export class AnswerService {

    constructor(private answersRepository: IAnswerRepository) { }

    public async createAnswer({ instructorId, questionId, content }: createAnswerUseCaseRequest): Promise<Answer> {
        const answer = new Answer({
            content,
            authorId: new EntityID(instructorId),
            questionId: new EntityID(questionId),
            createdAt: new Date()
        })
        return await this.answersRepository.create(answer);
    }

    async findById({ answerId }: findAnswerByIdRequest): Promise<findAnswerByIdResponse> {
        const answer = await this.answersRepository.findById(answerId)
        if (!answer) throw new Error("Answer not found")
        return { answer }
    }

    async updateResponse({ authorId, answerId, content, }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString) {
            throw new Error('Not allowed.')
        }

        answer.content = content

        await this.answersRepository.save(answer)

        return { answer }
    }

    async deleteAnswer({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString) {
            throw new Error('Not allowed.')
        }

        await this.answersRepository.delete(answer)

        return {}
    }
}