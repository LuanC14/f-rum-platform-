interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
    attachmentsIds: string[]
}