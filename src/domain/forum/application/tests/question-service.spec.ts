import { InMemoryQuestionsRepository } from "../../repositories/inMemory/inMemoryQuestionRepository"
import { QuestionService } from "../services/QuestionService"
import { describe, beforeEach, it, expect } from 'vitest'
import { Slug } from "../../enterprise/entities/value-objects/Slug"
import { makeQuestion } from "./factories/make-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let service: QuestionService

describe('Question Service (unit)', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    service = new QuestionService(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    expect(newQuestion.Id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].Id).toEqual(newQuestion.Id)
  })

  it('should de able to get a question by slug', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await service.findBySlug({ slug: newQuestion.slug.Value })

    expect(question.Id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })

})