import { Question } from "../../enterprise/entities/Question"
import { IQuestionsRepository } from "../interfaces/IQuestionRepository"

export class InMemoryQuestionsRepository implements IQuestionsRepository {
    public items: Question[] = []
  
    async create(question: Question) {
      this.items.push(question)
    }
}