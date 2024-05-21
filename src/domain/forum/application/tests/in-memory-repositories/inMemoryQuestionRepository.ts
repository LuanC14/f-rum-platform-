import { Question } from "../../../enterprise/entities/Question"
import { IQuestionsRepository } from "../../../repositories/interfaces/IQuestionRepository"

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findById(id: string): Promise<Question | null> {
    const item = this.items.find(i => i.Id.toString == id)
    return item ?? null;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(item => item.slug.Value == slug)
    return question ?? null
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.Id === question.Id)
    this.items.splice(itemIndex, 1)
  }
}