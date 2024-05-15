import { Question } from "../../enterprise/entities/Question"
import { IQuestionsRepository } from "../interfaces/IQuestionRepository"

export class InMemoryQuestionsRepository implements IQuestionsRepository {
    public items: Question[] = []
  
    async create(question: Question) {
      this.items.push(question)
    }

    async findBySlug(slug: string): Promise<Question | null> {
      const question = this.items.find(item => item.slug.Value == slug)
      return question ?? null
    }
}