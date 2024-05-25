import { beforeEach, describe, expect, it } from "vitest"
import { AnswerService } from "../services/AnswerService"
import { InMemoryAnswersRepository } from "./in-memory-repositories/inMemoryAnswerRepository"
import { makeAnswer } from "./factories/make-answer"
import { EntityID } from "src/core/entities/EntityID"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerService

describe('Question Service (unit)', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerService(inMemoryAnswersRepository)
    })

    it('should be able to delete a answer', async () => {
        const newAnswer = makeAnswer({
            id: new EntityID('answer-1'),
            authorId: new EntityID('author-1')
        })

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.deleteAnswer({
            answerId: 'answer-1',
            authorId: 'author-1',
        })

        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a answer from another user', async () => {
        const newAnswer = makeAnswer({
            id: new EntityID('answer-1'),
            authorId: new EntityID('author-1')
        })

        await inMemoryAnswersRepository.create(newAnswer)

        expect(() => {
            return sut.deleteAnswer({
                answerId: 'answer-1',
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})