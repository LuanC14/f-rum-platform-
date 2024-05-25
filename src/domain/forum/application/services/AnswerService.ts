import { Answer } from "../../enterprise/entities/Answer"
import { IAnswerRepository } from "../../repositories/interfaces/IAnswerRepository"

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


interface DeleteAnswerUseCaseResponse { }

export class AnswerService {

    constructor(private answersRepository: IAnswerRepository) { }

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