export default interface CreateQuestionRequest {
    authorId: string;
    title: string;
    content: string;
    attachmentsIds?: string[]
}