import { EntityID } from "src/core/entities/EntityID"
import { Question, QuestionModel } from "src/domain/forum/enterprise/entities/Question"
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/Slug"

// O parâmetro override me permite enviar de maneira opcional alguma propriedade do objeto Question
export function makeQuestion(override: Partial<QuestionModel> = {}) {
    const question = new Question({
      authorId: new EntityID(),
      title: 'Example',
      slug: Slug.createFromText('Example Question'),
      content: 'Example content',
      createdAt: new Date(),
      ...override // Caso tenha passado valor, irá sobrepor algum existente
    })
  
    return question
  }