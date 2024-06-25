import CreateAnswerRequest from "./contracts/CreateAnswerRequest";
import FindAnswerByIdRequest from "./contracts/FindAnswerByIdRequest";
import FindAnswerByIdResponse from "./contracts/FindAnswerByIdResponse";
import EditAnswerRequest from "./contracts/EditAnswerRequest";
import EditAnswerResponse from "./contracts/EditAnswerResponse";
import DeleteAnswerRequest from "./contracts/DeleteAnswerRequest";
import DeleteAnswerResponse from "./contracts/DeleteAnswerResponse";
import FetchQuestionAnswersRequest from "./contracts/FetchQuestionAnswersRequest";
import FetchQuestionAnswersResponse from "./contracts/FetchQuestionAnswersResponse";

import { EntityID } from "src/core/entities/EntityID"
import { Answer } from "src/domain/forum/enterprise/entities/Answer";
import { IAnswerRepository } from "src/domain/forum/repositories/interfaces/IAnswerRepository";
import { left, right } from "src/core/utils/either";

export class AnswerService {

    constructor(private answersRepository: IAnswerRepository) { }

    public async createAnswer({ instructorId, questionId, content }: CreateAnswerRequest): Promise<Answer> {
        const answer = new Answer({
            content,
            authorId: new EntityID(instructorId),
            questionId: new EntityID(questionId),
            createdAt: new Date()
        })
        return await this.answersRepository.create(answer);
    }

    async findById({ answerId }: FindAnswerByIdRequest): Promise<FindAnswerByIdResponse> {
        const answer = await this.answersRepository.findById(answerId)
        if (!answer) throw new Error("Answer not found")
        return { answer }
    }

    async fetchAnswersByQuestionId({ questionId, page, }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })
        return { answers }
    }

    async updateResponse({ authorId, answerId, content, }: EditAnswerRequest): Promise<EditAnswerResponse> {
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

    async deleteAnswer({ answerId, authorId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left('Answer not found.')
        }

        if (authorId !== answer.authorId.toString) {
            return left('Not allowed.')
        }

        await this.answersRepository.delete(answer)

        return right({})
    }
}