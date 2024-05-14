import { Question } from '../../enterprise/entities/Question'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
}