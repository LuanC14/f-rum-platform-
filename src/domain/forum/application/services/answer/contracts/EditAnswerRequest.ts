export default interface EditAnswerRequest {
    authorId: string
    answerId: string
    content: string
    attachmentsIds: string[]
}