import CreateAnswerOnQuestionRequest from "./contracts/CreateAnswerOnQuestionRequest";
import CreateAnswerOnQuestionResponse from "./contracts/CreateAnswerOnQuestionResponse";
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
import { left, Right, right } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../../../../core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../../core/errors/NotAllowedError";
import { AnswerAttachment } from "src/domain/forum/enterprise/entities/AnswerAttachment";
import { AnswerAttachmentList } from "src/domain/forum/enterprise/entities/watched-lists/AnswerAttachmentList";
import { IAnswerRepository } from "../../repositories/interfaces/IAnswerRepository";
import { IAnswerAttachmentsRepository } from "../../repositories/IAnswerAttachmentsRepository";


export class AnswerService {

    constructor(private answersRepository: IAnswerRepository,
        private answerAttachmentsRepository: IAnswerAttachmentsRepository) { }

    public async createAnswerOnQuestion({ instructorId, questionId, content, attachmentsIds }: CreateAnswerOnQuestionRequest): Promise<CreateAnswerOnQuestionResponse> {
        const answer = new Answer({
            content,
            authorId: new EntityID(instructorId),
            questionId: new EntityID(questionId),
            attachments: new AnswerAttachmentList(),
            createdAt: new Date()
        })

        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return new AnswerAttachment({
                attachmentId: new EntityID(attachmentId),
                answerId: answer.Id
            })
        })

        answer.attachments = new AnswerAttachmentList(answerAttachments)

        this.answersRepository.create(answer)

        return new Right({ answer });
    }

    async findById({ answerId }: FindAnswerByIdRequest): Promise<FindAnswerByIdResponse> {
        const answer = await this.answersRepository.findById(answerId)
        return right({ answer })
    }

    async fetchAnswersByQuestionId({ questionId, page, }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })
        return right({ answers })
    }

    async updateAnswer({ authorId, answerId, content, attachmentsIds }: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString) {
            return left(new NotAllowedError())
        }

        const currentAnswerAttachments =
            await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

        const answerAttachmentList = new AnswerAttachmentList(
            currentAnswerAttachments,
        )

        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return new AnswerAttachment({
                attachmentId: new EntityID(attachmentId),
                answerId: answer.Id,
            })
        })

        answerAttachmentList.update(answerAttachments)

        answer.attachments = answerAttachmentList

        answer.content = content

        await this.answersRepository.save(answer)

        return right({ answer })
    }

    async deleteAnswer({ answerId, authorId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString) {
            return left(new NotAllowedError())
        }

        await this.answersRepository.delete(answer)

        return right({})
    }
}