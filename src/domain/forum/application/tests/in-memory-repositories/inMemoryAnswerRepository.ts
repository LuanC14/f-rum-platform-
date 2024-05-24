import { Answer } from "../../../enterprise/entities/Answer"
import { IAnswerRepository } from "../../../repositories/interfaces/IAnswerRepository"

export class InMemoryAnswersRepository implements IAnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.Id.toString === id)
    return answer ?? null
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.Id === answer.Id)
    this.items.splice(itemIndex, 1)
  }
}