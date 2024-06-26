import CommentOnQuestionRequest from "./contracts/CommentOnQuestionRequest"
import CommentOnQuestionResponse from "./contracts/CommentOnQuestionResponse"
import CommentOnAnswerResponse from "./contracts/CommentOnAnswerResponse"
import DeleteQuestionCommentRequest from "./contracts/DeleteQuestionCommentRequest"
import DeleteQuestionCommentResponse from "./contracts/DeleteQuestionCommentResponse"
import CommentOnAnswerRequest from "./contracts/CommentOnAnswerRequest"
import DeleteAnswerCommentRequest from "./contracts/DeleteAnswerCommentRequest"
import DeleteAnswerCommentResponse from "./contracts/DeleteAnswerCommentResponse"
import FetchQuestionCommentsRequest from "./contracts/FetchQuestionCommentsRequest"
import FetchCommentsResponse from "./contracts/FetchCommentsResponse"
import FetchAnswerCommentsRequest from "./contracts/FetchAnswerCommentsRequest"

import { EntityID } from "src/core/entities/EntityID"
import { QuestionComment } from "src/domain/forum/enterprise/entities/QuestionComment"
import { QuestionService } from "../question/service"
import { ICommentRepository } from "src/domain/forum/repositories/interfaces/ICommentRepository"
import { AnswerService } from "../answer/service"
import { AnswerComment } from "src/domain/forum/enterprise/entities/AnswerComments"
import { left, right } from "src/core/utils/either"
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError"
import { NotAllowedError } from "../../errors/NotAllowedError"

export class CommentService {

    constructor(
        private repository: ICommentRepository,
        private questionService: QuestionService,
        private answerService: AnswerService,
    ) { }

    async createCommentOnQuestion({ authorId, questionId, content, }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
        const question = await this.questionService.findById({ questionId })

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const questionComment = new QuestionComment({
            authorId: new EntityID(authorId),
            questionId: new EntityID(questionId),
            content,
            createdAt: new Date()
        })

        await this.repository.create(questionComment)

        return right({ questionComment })
    }

    async createCommentOnAnswer({ authorId, answerId, content, }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
        const answer = await this.answerService.findById({ answerId })

        if (!answer) {
            return left(new ResourceNotFoundError())
        }


        const answerComment = new AnswerComment({
            authorId: new EntityID(authorId),
            answerId: new EntityID(answerId),
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await this.repository.create(answerComment)

        return right({ answerComment })
    }

    async deleteQuestionComment({ authorId, questionCommentId }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
        const questionComment = await this.repository.findById(questionCommentId)

        if (!questionComment) {
            return left(new ResourceNotFoundError())
        }

        if (questionComment.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        await this.repository.delete(questionComment)

        return right({})
    }

    async deleteAnswerComment({ authorId, answerCommentId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const answerComment = await this.repository.findById(answerCommentId)

        if (!answerComment) {
            return left(new ResourceNotFoundError())
        }

        if (answerComment.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        await this.repository.delete(answerComment)

        return right({})
    }

    async fetchQuestionsComments({ questionId, page }: FetchQuestionCommentsRequest): Promise<FetchCommentsResponse> {
        const questionComments = await this.repository.findManyByFatherCommentId(questionId, { page })
        return right({ comments: questionComments })
    }

    async fetchAnswersComments({ answerId, page }: FetchAnswerCommentsRequest): Promise<FetchCommentsResponse> {
        const answerComments = await this.repository.findManyByFatherCommentId(answerId, { page })
        return right({ comments: answerComments })
    }
}