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

        this.repository.create(question);

        return { question };
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
            throw new Error("Question not found.");
        }

        return { question };
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
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString) {
            throw new Error('Not allowed.')
        }

        question.title = title
        question.content = content

        await this.repository.save(question)

        return {}
    }

    async markBestAnswer({ answerId, authorId }: MarkBestAnswerRequest): Promise<MarkBestAnswerResponse> {
        const { answer } = await this.answersService.findById({ answerId })

        if (!answer) {
            throw new Error('Answer not found.')
        }

        const question = await this.repository.findById(answer.Id.toString)

        if (!question) {
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString) {
            throw new Error('Not allowed.')
        }

        question.bestAnswerId = answer.Id

        await this.repository.save(question)

        return { question }
    }
}
