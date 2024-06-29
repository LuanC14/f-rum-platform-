import CreateQuestionRequest from "./contracts/CreateQuestionRequest";
import CreateQuestionResponse from "./contracts/CreateQuestionResponse";
import GetQuestionBySlugRequest from "./contracts/GetQuestionBySlugRequest";
import GetQuestionBySlugResponse from "./contracts/GetQuestionBySlugResponse";
import MarkBestAnswerResponse from "./contracts/MarkBestAnswerResponse";

import { EntityID } from "src/core/entities/EntityID";
import { Question } from "../../../enterprise/entities/Question";
import { Slug } from "../../../enterprise/entities/value-objects/Slug";
import { IQuestionsRepository } from "../../../repositories/interfaces/IQuestionRepository";
import { AnswerService } from "../answer/service";
import { left, right } from "src/core/utils/either";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError";
import { NotAllowedError } from "../../errors/NotAllowedError";
import EditQuestionUseCaseResponse from "./contracts/EditQuestionResponse";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/QuestionAttachment";

interface FetchRecentQuestionsRequest {
    page: number
}

interface FetchRecentQuestionsResponse {
    questions: Question[]
}

interface FindQuestionByIdRequest {
    questionId: string
}

interface FindQuestionByIdResponse {
    question: Question
}


export class QuestionService {
    constructor(private repository: IQuestionsRepository, private answersService: AnswerService) { }

    public async createQuestion(req: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = new Question({
            authorId: new EntityID(req.authorId),
            title: req.title,
            content: req.content,
            slug: Slug.createFromText(req.title),
            createdAt: new Date(),
        });

        if (req.attachmentsIds) {
            const attachments = req.attachmentsIds.map(id => {
                return new QuestionAttachment({
                    attachmentId: new EntityID(id),
                    questionId: question.Id

                })
            })
            question.attachments = attachments
        }

        this.repository.create(question);

        return right({ question })
    }

    public async findById({ questionId }: FindQuestionByIdRequest): Promise<FindQuestionByIdResponse> {
        const question = await this.repository.findById(questionId)
        if (!question) throw new Error("Question not found")
        return { question }
    }

    public async fetchRecentQuestions({ page }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
        const questions = await this.repository.findManyRecent({ page })
        return { questions };
    }

    async findBySlug({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.repository.findBySlug(slug);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        return right({ question })
    }

    async deleteQuestion({ questionId, authorId }: DeleteQuestionRequest) {
        const question = await this.repository.findById(questionId);

        if (!question) {
            throw new Error("Item não encontrado");
        }

        if (authorId !== question.authorId.toString) {
            throw new Error("Not allowed.");
        }

        await this.repository.delete(question);
    }

    async updateQuestion({ authorId, questionId, title, content, }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.repository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content

        await this.repository.save(question)

        return right({ question })
    }

    async markBestAnswer({ answerId, authorId }: MarkBestAnswerRequest): Promise<MarkBestAnswerResponse> {
        const { value } = await this.answersService.findById({ answerId })

        if (!value?.answer) {
            return left(new ResourceNotFoundError())
        }

        const answer = value.answer

        const question = await this.repository.findById(answer.Id.toString)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString) {
            return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.Id

        await this.repository.save(question)

        return right({ question })
    }
}
