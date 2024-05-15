import { Question } from '../../enterprise/entities/Question'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}