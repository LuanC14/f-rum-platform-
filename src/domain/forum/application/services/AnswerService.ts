import { IAnswerRepository } from "../../repositories/interfaces/IAnswerRepository"

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerUseCaseResponse { }

export class AnswerService {

    constructor(private answersRepository: IAnswerRepository) { }

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