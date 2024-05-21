import { Answer } from "../../../enterprise/entities/Answer"
import { IAnswerRepository } from "../../../repositories/interfaces/IAnswerRepository"

export class InMemoryAnswersRepository implements IAnswerRepository {
    public items: Answer[] = []
  
    async create(answer: Answer) {
      this.items.push(answer)
    }
  }