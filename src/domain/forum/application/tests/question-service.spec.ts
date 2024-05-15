import { InMemoryQuestionsRepository } from "../../repositories/inMemory/inMemoryQuestionRepository"
import { QuestionService } from "../services/QuestionService"
import { describe, beforeEach, it, expect } from 'vitest'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let service: QuestionService

describe('Question Service (unit)', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    service = new QuestionService(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await service.createQuestion({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.Id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].Id).toEqual(question.Id)
  })

})