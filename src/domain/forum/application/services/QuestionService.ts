import { EntityID } from "src/core/entities/EntityID";
import { Question } from "../../enterprise/entities/Question";
import { Slug } from "../../enterprise/entities/value-objects/Slug";
import { title } from "process";
import { IQuestionsRepository } from "../../repositories/interfaces/IQuestionRepository";

interface createQuestionRequest {
    authorId: string;
    title: string;
    content: string;
}

interface CreateQuestionResponse {
    question: Question;
}

interface GetQuestionBySlugRequest {
    slug: string;
}

interface GetQuestionBySlugResponse {
    question: Question;
}

interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse { }

export class QuestionService {
    constructor(private repository: IQuestionsRepository) { }

    public async createQuestion(req: createQuestionRequest): Promise<CreateQuestionResponse> {
        const question = new Question({
            authorId: new EntityID(req.authorId),
            title: req.title,
            content: req.content,
            slug: Slug.createFromText(title),
            createdAt: new Date(),
        });

        this.repository.create(question);

        return { question };
    }

    async findBySlug({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
        const question = await this.repository.findBySlug(slug);

        if (!question) {
            throw new Error("Question not found.");
        }

        return { question };
    }

    async deleteQuestion({ questionId, authorId }: DeleteQuestionUseCaseRequest) {
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



    // public async answerQuestion({ instructorId, questionId, content }: answerQuestionRequest): Promise<Answer> {
    //     const answer = new Answer({ content, authorId: instructorId, questionId })

    //     return await this.answerRepository.create(answer);
    // }
}
