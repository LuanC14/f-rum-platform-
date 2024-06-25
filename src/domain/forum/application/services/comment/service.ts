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

export class CommentService {

    constructor(
        private repository: ICommentRepository,
        private questionService: QuestionService,
        private answerService: AnswerService,
    ) { }

    async createCommentOnQuestion({ authorId, questionId, content, }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
        const question = await this.questionService.findById({ questionId })

        if (!question) throw new Error('Question not found.')

        const questionComment = new QuestionComment({
            authorId: new EntityID(authorId),
            questionId: new EntityID(questionId),
            content,
            createdAt: new Date()
        })

        await this.repository.create(questionComment)

        return { questionComment }
    }

    async createCommentOnAnswer({ authorId, answerId, content, }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
        const answer = await this.answerService.findById({ answerId })

        if (!answer) throw new Error('answer not found.')

        const answerComment = new AnswerComment({
            authorId: new EntityID(authorId),
            answerId: new EntityID(answerId),
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await this.repository.create(answerComment)

        return { answerComment }
    }

    async deleteQuestionComment({ authorId, questionCommentId }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
        const questionComment = await this.repository.findById(questionCommentId)

        if (!questionComment) {
            throw new Error('Question comment not found.')
        }

        if (questionComment.authorId.toString !== authorId) {
            throw new Error('Not allowed')
        }

        await this.repository.delete(questionComment)

        return {}
    }

    async deleteAnswerComment({ authorId, answerCommentId }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
        const answerComment = await this.repository.findById(answerCommentId)

        if (!answerComment) throw new Error('Answer comment not found.')

        if (answerComment.authorId.toString !== authorId) throw new Error('Not allowed')

        await this.repository.delete(answerComment)

        return {}
    }

    async fetchQuestionsComments({ questionId, page }: FetchQuestionCommentsRequest): Promise<FetchCommentsResponse> {
        const questionComments = await this.repository.findManyByFatherCommentId(questionId, { page })
        return { comments: questionComments }
    }

    async fetchAnswersComments({ answerId, page }: FetchAnswerCommentsRequest): Promise<FetchCommentsResponse> {
        const answerComments = await this.repository.findManyByFatherCommentId(answerId, { page })
        return { comments: answerComments }
    }
}