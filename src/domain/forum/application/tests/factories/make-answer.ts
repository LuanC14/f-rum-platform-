import { faker } from "@faker-js/faker"
import { EntityID } from "src/core/entities/EntityID"
import { Answer, AnswerModel } from "src/domain/forum/enterprise/entities/Answer"

export function makeAnswer(override: Partial<AnswerModel> = {}, id?: EntityID) {
    const answer = new Answer(
        {
            id: new EntityID(),
            authorId: new EntityID(),
            questionId: new EntityID(),
            content: faker.lorem.text(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override // caso tenha passado valor, irá sobrepor os definidos anteriormente
        }
    )

    return answer
}