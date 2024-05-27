import { InMemoryQuestionsRepository } from "./in-memory-repositories/inMemoryQuestionRepository"
import { QuestionService } from "../services/question/service"
import { describe, beforeEach, it, expect } from 'vitest'
import { Slug } from "../../enterprise/entities/value-objects/Slug"
import { makeQuestion } from "./factories/make-question"
import { EntityID } from "src/core/entities/EntityID"

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

  it('should be able to find question by id', async () => {
    const newQuestion = makeQuestion({ id: new EntityID('especificId') })
    inMemoryQuestionsRepository.create(newQuestion)

    const question = await inMemoryQuestionsRepository.findById('especificId')

    expect(question?.Id.toString).toEqual('especificId')
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        id: new EntityID('question-1'),
        authorId: new EntityID('author-1')
      }

    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await service.deleteQuestion({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        id: new EntityID('question-1'),
        authorId: new EntityID('author-1')
      }
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return service.deleteQuestion({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })

})