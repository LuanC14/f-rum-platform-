import { EntityID } from "src/core/entities/EntityID"
import { Question, QuestionModel } from "src/domain/forum/enterprise/entities/Question"
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/Slug"
import {faker} from '@faker-js/faker'

// O parâmetro override me permite enviar de maneira opcional alguma propriedade do objeto Question
export function makeQuestion(override: Partial<QuestionModel> = {}) {
    const question = new Question({
      authorId: new EntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.createFromText(faker.lorem.sentence()),
      content: faker.lorem.text(),
      createdAt: new Date(),
      ...override // Caso tenha passado valor, irá sobrepor algum existente
    })
  
    return question
  }